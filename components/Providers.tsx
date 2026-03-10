"use client";
import { WalletProvider } from "@/lib/wallet-context";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <WalletProvider>
      {children}
    </WalletProvider>
  );
}
