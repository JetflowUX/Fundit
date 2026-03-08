"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Wallet, ChevronDown, Search } from "lucide-react";

const navLinks = [
  { label: "Explore", href: "/explore" },
  { label: "Programs", href: "/programs" },
  { label: "Community", href: "/community" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);

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
                style={{ background: "linear-gradient(135deg, #0033AD, #00C6FF)" }}
              >
                <Wallet size={16} />
                Connect Wallet
                <ChevronDown size={14} className={`transition-transform ${isWalletOpen ? "rotate-180" : ""}`} />
              </button>
              {isWalletOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-[#1F2937] border border-[#374151] rounded-xl shadow-xl overflow-hidden z-50">
                  {["Lace Wallet", "Nami Wallet", "Eternl Wallet"].map((wallet) => (
                    <button
                      key={wallet}
                      className="w-full px-4 py-3 text-left text-sm text-[#9CA3AF] hover:text-white hover:bg-[#374151]/50 transition-colors flex items-center gap-3"
                      onClick={() => setIsWalletOpen(false)}
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#0033AD] to-[#00C6FF]" />
                      {wallet}
                    </button>
                  ))}
                  <div className="border-t border-[#374151] p-2">
                    <Link
                      href="/auth/login"
                      className="block w-full px-4 py-2 text-center text-sm text-[#9CA3AF] hover:text-white transition-colors rounded-lg hover:bg-[#374151]/50"
                      onClick={() => setIsWalletOpen(false)}
                    >
                      Sign in with Email
                    </Link>
                  </div>
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
              className="w-full px-4 py-3 rounded-lg text-sm font-medium text-white"
              style={{ background: "linear-gradient(135deg, #0033AD, #00C6FF)" }}
            >
              Connect Wallet
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
