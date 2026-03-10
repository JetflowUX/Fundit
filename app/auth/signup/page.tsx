"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Wallet } from "lucide-react";
import { useWallet } from "@/lib/wallet-context";

const walletConfig = [
  { key: "lace", name: "Lace Wallet", color: "#0033AD" },
  { key: "nami", name: "Nami Wallet", color: "#7C3AED" },
  { key: "eternl", name: "Eternl Wallet", color: "#059669" },
];

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const { connected, connecting, connectWallet, availableWallets, error } = useWallet();

  // Redirect to dashboard if wallet is connected
  useEffect(() => {
    if (connected) {
      router.push("/dashboard");
    }
  }, [connected, router]);

  const handleSignup = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  const handleWalletConnect = async (walletKey: string) => {
    try {
      await connectWallet(walletKey);
      setShowWalletModal(false);
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
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: "linear-gradient(135deg, #0033AD, #00C6FF)" }}>
              <span className="text-white font-bold text-xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>F</span>
            </div>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Join Fundit</h1>
            <p className="text-sm mt-1" style={{ color: "#9CA3AF" }}>Start building and funding on Cardano</p>
          </div>

          <div className="space-y-4">
            {[
              { field: "username", label: "Username", type: "text", placeholder: "cardanobuilder" },
              { field: "email", label: "Email", type: "email", placeholder: "you@example.com" },
            ].map((item) => (
              <div key={item.field}>
                <label className="block text-sm font-medium mb-2 text-white">{item.label}</label>
                <input
                  type={item.type}
                  value={form[item.field as keyof typeof form]}
                  onChange={(e) => setForm((p) => ({ ...p, [item.field]: e.target.value }))}
                  placeholder={item.placeholder}
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 border focus:outline-none"
                  style={{ background: "#111827", borderColor: "#374151" }}
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  placeholder="Min. 8 characters"
                  className="w-full px-4 py-3 pr-12 rounded-xl text-white placeholder-gray-500 border focus:outline-none"
                  style={{ background: "#111827", borderColor: "#374151" }}
                />
                <button onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }}>
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90 disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, #0033AD, #00C6FF)" }}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: "#374151" }} />
              <span className="text-xs" style={{ color: "#9CA3AF" }}>or</span>
              <div className="flex-1 h-px" style={{ background: "#374151" }} />
            </div>

            <button
              onClick={() => setShowWalletModal(true)}
              disabled={connecting}
              className="w-full py-3 rounded-xl text-white font-medium border transition-all hover:bg-white/5 flex items-center justify-center gap-2 disabled:opacity-50"
              style={{ borderColor: "#374151" }}
            >
              <Wallet size={18} style={{ color: "#4DA6FF" }} />
              {connecting ? "Connecting..." : "Connect with Cardano Wallet"}
            </button>
          </div>

          <p className="text-center text-sm mt-6" style={{ color: "#9CA3AF" }}>
            Already have an account?{" "}
            <Link href="/auth/login" style={{ color: "#4DA6FF" }} className="font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {/* Wallet Selection Modal */}
        {showWalletModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setShowWalletModal(false)}>
            <div className="relative w-full max-w-md bg-[#1F2937] border border-[#374151] rounded-2xl p-6" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Select Wallet
              </h2>
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
                      Please install Lace, Nami, or Eternl wallet extension
                    </p>
                  </div>
                )}
                {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowWalletModal(false)}
                className="w-full mt-4 py-2 text-sm text-[#9CA3AF] hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
