"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Wallet, Mail } from "lucide-react";
import { useWallet } from "@/lib/wallet-context";

const walletConfig = [
  { key: "lace", name: "Lace Wallet", color: "#0033AD" },
  { key: "nami", name: "Nami Wallet", color: "#7C3AED" },
  { key: "eternl", name: "Eternl Wallet", color: "#059669" },
];

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"email" | "wallet">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { connected, connecting, connectWallet, availableWallets, error } = useWallet();

  // Redirect to dashboard if wallet is connected
  useEffect(() => {
    if (connected) {
      router.push("/dashboard");
    }
  }, [connected, router]);

  const handleEmailLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  const handleWalletConnect = async (walletKey: string) => {
    try {
      await connectWallet(walletKey);
      // Router push will be handled by useEffect when connected becomes true
    } catch (err) {
      console.error("Failed to connect:", err);
    }
  };

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center py-12">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,51,173,0.15) 0%, transparent 70%)" }} />
      <div className="relative w-full max-w-md px-4">
        <div className="rounded-2xl p-8 border" style={{ background: "#1F2937", borderColor: "rgba(55,65,81,0.5)" }}>
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: "linear-gradient(135deg, #0033AD, #00C6FF)" }}>
              <span className="text-white font-bold text-xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>F</span>
            </div>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Welcome back</h1>
            <p className="text-sm mt-1" style={{ color: "#9CA3AF" }}>Sign in to your Fundit account</p>
          </div>

          {/* Mode Toggle */}
          <div className="flex gap-2 mb-6 p-1 rounded-xl" style={{ background: "#111827" }}>
            {[
              { id: "email", label: "Email", icon: <Mail size={16} /> },
              { id: "wallet", label: "Wallet", icon: <Wallet size={16} /> },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id as "email" | "wallet")}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: mode === m.id ? "linear-gradient(135deg, #0033AD, #00C6FF)" : "transparent",
                  color: mode === m.id ? "white" : "#9CA3AF",
                }}
              >
                {m.icon} {m.label}
              </button>
            ))}
          </div>

          {mode === "email" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 border focus:outline-none"
                  style={{ background: "#111827", borderColor: "#374151" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Password</label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-12 rounded-xl text-white placeholder-gray-500 border focus:outline-none"
                    style={{ background: "#111827", borderColor: "#374151" }}
                  />
                  <button onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }}>
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <button
                onClick={handleEmailLogin}
                disabled={loading}
                className="w-full py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90 disabled:opacity-60"
                style={{ background: "linear-gradient(135deg, #0033AD, #00C6FF)" }}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          )}

          {mode === "wallet" && (
            <div className="space-y-3">
              {availableWallets.length > 0 ? (
                <>
                  {availableWallets.map((wallet) => {
                    const config = walletConfig.find(w => w.key === wallet.key) || { key: wallet.key, name: wallet.name, color: "#0033AD" };
                    return (
                      <button
                        key={wallet.key}
                        onClick={() => handleWalletConnect(wallet.key)}
                        disabled={connecting}
                        className="w-full flex items-center gap-4 px-4 py-4 rounded-xl border transition-all hover:bg-white/5 disabled:opacity-50"
                        style={{ borderColor: "#374151" }}
                      >
                        <div className="w-10 h-10 rounded-xl" style={{ background: config.color + "33" }}>
                          <div className="w-full h-full rounded-xl flex items-center justify-center">
                            <Wallet size={20} style={{ color: config.color }} />
                          </div>
                        </div>
                        <div className="text-left">
                          <p className="text-white font-medium text-sm">{config.name}</p>
                          <p className="text-xs" style={{ color: "#9CA3AF" }}>Connect via CIP-30</p>
                        </div>
                        <div className="ml-auto" style={{ color: "#374151" }}>→</div>
                      </button>
                    );
                  })}
                </>
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm text-[#9CA3AF] mb-2">No Cardano wallets detected</p>
                  <p className="text-xs text-[#6B7280]">
                    Please install Lace, Nami, or Eternl wallet extension to continue
                  </p>
                </div>
              )}
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}
            </div>
          )}

          <p className="text-center text-sm mt-6" style={{ color: "#9CA3AF" }}>
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" style={{ color: "#4DA6FF" }} className="font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
