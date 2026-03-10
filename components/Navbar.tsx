"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Wallet, ChevronDown, Search, LogOut, Check } from "lucide-react";
import { useWallet } from "@/lib/wallet-context";

const navLinks = [
  { label: "Explore", href: "/explore" },
  { label: "Programs", href: "/programs" },
  { label: "Community", href: "/community" },
];

const walletConfig = [
  { key: "lace", name: "Lace Wallet", color: "#0033AD" },
  { key: "nami", name: "Nami Wallet", color: "#7C3AED" },
  { key: "eternl", name: "Eternl Wallet", color: "#059669" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const { 
    connected, 
    connecting, 
    walletName, 
    walletAddress, 
    walletBalance,
    availableWallets,
    connectWallet, 
    disconnectWallet,
    error 
  } = useWallet();

  const handleWalletConnect = async (walletKey: string) => {
    try {
      await connectWallet(walletKey);
      setIsWalletOpen(false);
    } catch (err) {
      console.error("Failed to connect:", err);
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setIsWalletOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0F1F]/80 backdrop-blur-xl border-b border-[#374151]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0033AD] to-[#00C6FF] flex items-center justify-center">
              <span className="text-white font-bold text-sm font-display">F</span>
            </div>
            <span className="text-white font-bold text-xl font-display">
              Fun<span className="text-[#00C6FF]">dit</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-[#9CA3AF] hover:text-white rounded-lg hover:bg-white/5 transition-all text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/explore" className="p-2 text-[#9CA3AF] hover:text-white transition-colors">
              <Search size={18} />
            </Link>
            <Link
              href="/dashboard"
              className="px-3 py-2 text-[#9CA3AF] hover:text-white text-sm font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/create-project"
              className="px-4 py-2 text-sm font-medium text-white border border-[#374151] rounded-lg hover:border-[#0033AD] hover:bg-[#0033AD]/10 transition-all"
            >
              Create Project
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsWalletOpen(!isWalletOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all"
                style={{ background: connected ? "linear-gradient(135deg, #059669, #10B981)" : "linear-gradient(135deg, #0033AD, #00C6FF)" }}
              >
                <Wallet size={16} />
                {connected ? (
                  <>
                    {walletAddress}
                    <ChevronDown size={14} className={`transition-transform ${isWalletOpen ? "rotate-180" : ""}`} />
                  </>
                ) : (
                  <>
                    {connecting ? "Connecting..." : "Connect Wallet"}
                    <ChevronDown size={14} className={`transition-transform ${isWalletOpen ? "rotate-180" : ""}`} />
                  </>
                )}
              </button>
              {isWalletOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-[#1F2937] border border-[#374151] rounded-xl shadow-xl overflow-hidden z-50">
                  {connected ? (
                    // Connected state - show wallet info and disconnect
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-3 pb-3 border-b border-[#374151]">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#059669] to-[#10B981] flex items-center justify-center">
                          <Check size={16} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium text-sm">{walletName}</p>
                          <p className="text-xs text-[#9CA3AF]">Connected</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-[#9CA3AF]">Address:</span>
                          <span className="text-white font-mono text-xs">{walletAddress}</span>
                        </div>
                        {walletBalance && (
                          <div className="flex justify-between text-sm">
                            <span className="text-[#9CA3AF]">Balance:</span>
                            <span className="text-white font-semibold">{walletBalance} ₳</span>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={handleDisconnect}
                        className="w-full px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 transition-all flex items-center justify-center gap-2"
                      >
                        <LogOut size={16} />
                        Disconnect
                      </button>
                    </div>
                  ) : (
                    // Not connected - show available wallets
                    <>
                      {availableWallets.length > 0 ? (
                        <>
                          {availableWallets.map((wallet) => {
                            const config = walletConfig.find(w => w.key === wallet.key) || { key: wallet.key, name: wallet.name, color: "#0033AD" };
                            return (
                              <button
                                key={wallet.key}
                                className="w-full px-4 py-3 text-left text-sm text-[#9CA3AF] hover:text-white hover:bg-[#374151]/50 transition-colors flex items-center gap-3 disabled:opacity-50"
                                onClick={() => handleWalletConnect(wallet.key)}
                                disabled={connecting}
                              >
                                <div className="w-6 h-6 rounded-full" style={{ background: `linear-gradient(135deg, ${config.color}, ${config.color}dd)` }} />
                                {config.name}
                              </button>
                            );
                          })}
                        </>
                      ) : (
                        <div className="p-4 text-center">
                          <p className="text-sm text-[#9CA3AF] mb-2">No Cardano wallets detected</p>
                          <p className="text-xs text-[#6B7280]">
                            Please install Lace, Nami, or Eternl wallet extension
                          </p>
                        </div>
                      )}
                      {error && (
                        <div className="px-4 py-2 bg-red-500/10 border-t border-red-500/20">
                          <p className="text-xs text-red-400">{error}</p>
                        </div>
                      )}
                      <div className="border-t border-[#374151] p-2">
                        <Link
                          href="/auth/login"
                          className="block w-full px-4 py-2 text-center text-sm text-[#9CA3AF] hover:text-white transition-colors rounded-lg hover:bg-[#374151]/50"
                          onClick={() => setIsWalletOpen(false)}
                        >
                          Sign in with Email
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-[#9CA3AF] hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#111827] border-t border-[#374151]">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-[#9CA3AF] hover:text-white hover:bg-white/5 rounded-lg transition-all text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              className="block px-4 py-3 text-[#9CA3AF] hover:text-white hover:bg-white/5 rounded-lg transition-all text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/create-project"
              className="block px-4 py-3 text-center text-sm font-medium text-white border border-[#374151] rounded-lg hover:border-[#0033AD] transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Create Project
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-full px-4 py-3 rounded-lg text-sm font-medium text-white"
              style={{ background: connected ? "linear-gradient(135deg, #059669, #10B981)" : "linear-gradient(135deg, #0033AD, #00C6FF)" }}
            >
              {connected ? (
                <div className="flex items-center justify-between">
                  <span>{walletAddress}</span>
                  <button onClick={(e) => { e.stopPropagation(); handleDisconnect(); }} className="p-1" aria-label="Disconnect wallet">
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                connecting ? "Connecting..." : "Connect Wallet"
              )}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
