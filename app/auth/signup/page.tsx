"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Wallet } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1500);
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
              onClick={handleSignup}
              className="w-full py-3 rounded-xl text-white font-medium border transition-all hover:bg-white/5 flex items-center justify-center gap-2"
              style={{ borderColor: "#374151" }}
            >
              <Wallet size={18} style={{ color: "#4DA6FF" }} />
              Connect with Cardano Wallet
            </button>
          </div>

          <p className="text-center text-sm mt-6" style={{ color: "#9CA3AF" }}>
            Already have an account?{" "}
            <Link href="/auth/login" style={{ color: "#4DA6FF" }} className="font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
