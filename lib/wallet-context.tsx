"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

/**
 * Cardano Wallet Integration using CIP-30 standard
 * 
 * Supports: Lace, Nami, Eternl, Flint, Typhon, Gero wallets
 * 
 * Note: You may see benign console warnings from wallet extensions (especially Eternl)
 * like "dom:receive no data domId". These are internal to the browser extension and
 * do not affect functionality. They occur during the extension's initialization phase.
 * 
 * This implementation includes:
 * - Delayed wallet detection to allow extensions to fully initialize
 * - Comprehensive error handling and validation
 * - Auto-reconnection support via localStorage
 * - Connection timeout protection (60s)
 */

// Type definitions for CIP-30 Cardano wallet API
interface CardanoAPI {
  enable(): Promise<{
    getNetworkId(): Promise<number>;
    getUtxos(): Promise<string[] | undefined>;
    getBalance(): Promise<string>;
    getUsedAddresses(): Promise<string[]>;
    getUnusedAddresses(): Promise<string[]>;
    getChangeAddress(): Promise<string>;
    getRewardAddresses(): Promise<string[]>;
    signTx(tx: string, partialSign: boolean): Promise<string>;
    signData(address: string, payload: string): Promise<{ signature: string; key: string }>;
    submitTx(tx: string): Promise<string>;
  }>;
  isEnabled(): Promise<boolean>;
  name: string;
  icon: string;
  apiVersion: string;
}

interface WalletInfo {
  name: string;
  icon: string;
  apiVersion: string;
  key: string;
}

interface WalletContextType {
  connected: boolean;
  connecting: boolean;
  walletName: string | null;
  walletAddress: string | null;
  walletBalance: string | null;
  availableWallets: WalletInfo[];
  connectWallet: (walletKey: string) => Promise<void>;
  disconnectWallet: () => void;
  error: string | null;
  walletApi: Awaited<ReturnType<CardanoAPI["enable"]>> | null;
  refreshBalance: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [walletName, setWalletName] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [availableWallets, setAvailableWallets] = useState<WalletInfo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [walletApi, setWalletApi] = useState<Awaited<ReturnType<CardanoAPI["enable"]>> | null>(null);

  // Detect available wallets on mount
  useEffect(() => {
    const detectWallets = () => {
      if (typeof window === "undefined" || !window.cardano) return;

      const wallets: WalletInfo[] = [];
      const cardano = window.cardano as Record<string, CardanoAPI>;

      // Check for common Cardano wallets
      const walletKeys = ["lace", "nami", "eternl", "flint", "typhon", "gerowallet"];
      
      walletKeys.forEach((key) => {
        try {
          const wallet = cardano[key];
          // Verify wallet object is valid and has required properties
          if (wallet && typeof wallet === "object" && wallet.name && wallet.apiVersion) {
            wallets.push({
              name: wallet.name,
              icon: wallet.icon,
              apiVersion: wallet.apiVersion,
              key: key,
            });
          }
        } catch (err) {
          // Silently ignore wallet detection errors (extension may still be loading)
          console.debug(`Skipping wallet ${key}:`, err);
        }
      });

      setAvailableWallets(wallets);
    };

    // Initial detection with small delay to let extensions initialize
    const initialTimer = setTimeout(detectWallets, 100);

    // Re-check after wallets have more time to load
    const retryTimer = setTimeout(detectWallets, 1500);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(retryTimer);
    };
  }, []);

  // Load saved wallet connection from localStorage
  useEffect(() => {
    // Delay auto-reconnection to give extensions time to initialize
    const reconnectTimer = setTimeout(() => {
      const savedWallet = localStorage.getItem("connectedWallet");
      if (savedWallet && availableWallets.length > 0) {
        // Only attempt if wallet is detected
        const walletExists = availableWallets.some(w => w.key === savedWallet);
        if (walletExists) {
          connectWallet(savedWallet).catch((err) => {
            console.debug("Auto-reconnect failed:", err);
            localStorage.removeItem("connectedWallet");
          });
        }
      }
    }, 2000);

    return () => clearTimeout(reconnectTimer);
  }, [availableWallets]); // Depend on availableWallets so it runs after detection

  const connectWallet = async (walletKey: string) => {
    setConnecting(true);
    setError(null);

    try {
      if (typeof window === "undefined" || !window.cardano) {
        throw new Error("Cardano wallets not detected. Please install a Cardano wallet extension.");
      }

      const cardano = window.cardano as Record<string, CardanoAPI>;
      const walletAPI = cardano[walletKey];

      if (!walletAPI || typeof walletAPI !== "object") {
        throw new Error(`${walletKey} wallet not found. Please install it first.`);
      }

      // Verify wallet has required methods
      if (typeof walletAPI.enable !== "function") {
        throw new Error(`${walletKey} wallet is not properly initialized. Please refresh the page.`);
      }

      // Request wallet connection with timeout
      const enablePromise = walletAPI.enable();
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Connection timeout - please try again")), 60000)
      );

      const enabledAPI = await Promise.race([enablePromise, timeoutPromise]) as Awaited<ReturnType<CardanoAPI["enable"]>>;

      // Get wallet address
      const usedAddresses = await enabledAPI.getUsedAddresses();
      const changeAddress = await enabledAPI.getChangeAddress();
      const address = usedAddresses[0] || changeAddress;

      // Decode the address to display format (first 12 and last 4 chars)
      const displayAddress = address ? 
        `${address.substring(0, 12)}...${address.substring(address.length - 4)}` : 
        "Unknown";

      // Get balance
      let balance = "0";
      try {
        const balanceHex = await enabledAPI.getBalance();
        // Convert from hex lovelace to ADA (1 ADA = 1,000,000 lovelace)
        const balanceLovelace = parseInt(balanceHex, 16);
        balance = (balanceLovelace / 1_000_000).toFixed(2);
      } catch (e) {
        console.error("Error fetching balance:", e);
      }

      setConnected(true);
      setWalletName(walletAPI.name);
      setWalletAddress(displayAddress);
      setWalletBalance(balance);
      setWalletApi(enabledAPI);
      
      // Save to localStorage for auto-reconnect
      localStorage.setItem("connectedWallet", walletKey);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to connect wallet";
      setError(errorMessage);
      console.error("Wallet connection error:", err);
      throw err;
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setConnected(false);
    setWalletName(null);
    setWalletAddress(null);
    setWalletBalance(null);
    setWalletApi(null);
    setError(null);
    localStorage.removeItem("connectedWallet");
  };

  const refreshBalance = async () => {
    if (!walletApi) return;
    
    try {
      const balanceHex = await walletApi.getBalance();
      const balanceLovelace = parseInt(balanceHex, 16);
      const balance = (balanceLovelace / 1_000_000).toFixed(2);
      setWalletBalance(balance);
    } catch (e) {
      console.error("Error refreshing balance:", e);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        connected,
        connecting,
        walletName,
        walletAddress,
        walletBalance,
        availableWallets,
        connectWallet,
        disconnectWallet,
        error,
        walletApi,
        refreshBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    cardano?: Record<string, CardanoAPI>;
  }
}
