"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Plus, X, CheckCircle, Wallet as WalletIcon } from "lucide-react";
import { useWallet } from "@/lib/wallet-context";
import { saveCreatedProject, getOrCreateUserProfile } from "@/lib/storage";
import Link from "next/link";

const categories = ["DeFi", "Education", "Infrastructure", "NFT", "Community", "Gaming", "Governance"];
const statuses = ["Idea", "Building", "Live", "Completed"];

export default function CreateProjectPage() {
  const router = useRouter();
  const { connected, walletAddress } = useWallet();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    shortDescription: "",
    fullDescription: "",
    category: "DeFi",
    status: "Idea",
    fundingGoal: "",
    walletAddress: "",
    github: "",
    website: "",
    twitter: "",
    milestones: [{ title: "", description: "", dueDate: "" }],
    teamMembers: [{ name: "", role: "" }],
  });

  useEffect(() => {
    if (connected && walletAddress) {
      setForm((prev) => ({ ...prev, walletAddress }));
    }
  }, [connected, walletAddress]);

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = () => {
    if (!walletAddress) {
      alert("Please connect your wallet first");
      return;
    }

    setSaving(true);

    // Create project object
    const newProject = {
      id: Date.now().toString(),
      name: form.name,
      shortDescription: form.shortDescription,
      longDescription: form.fullDescription,
      category: form.category as any,
      status: form.status as any,
      fundingGoal: parseFloat(form.fundingGoal) || 0,
      fundingRaised: 0,
      supportersCount: 0,
      rating: 0,
      image: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?w=400&auto=format",
      creator: walletAddress,
      createdAt: Date.now(),
      links: {
        github: form.github,
        website: form.website,
        twitter: form.twitter,
      },
      team: form.teamMembers.filter((m) => m.name),
      milestones: form.milestones.filter((m) => m.title),
    };

    // Save to localStorage
    saveCreatedProject(newProject, walletAddress);

    setTimeout(() => {
      setSaving(false);
      setSubmitted(true);
    }, 1000);
  };

  if (!connected || !walletAddress) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(0,51,173,0.1)" }}>
            <WalletIcon size={32} style={{ color: "#4DA6FF" }} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Connect Your Wallet
          </h2>
          <p className="text-[#9CA3AF] mb-6">
            Please connect your Cardano wallet to create a project. Your wallet address will be used as the project creator and funding recipient.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #0033AD, #00C6FF)" }}
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(34,197,94,0.2)" }}>
            <CheckCircle size={40} style={{ color: "#22C55E" }} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Project Created!</h2>
          <p style={{ color: "#9CA3AF" }} className="mb-8">Your project has been submitted for review and will be live shortly.</p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => router.push("/dashboard")}
              className="px-6 py-3 rounded-xl text-white font-medium transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #0033AD, #00C6FF)" }}>
              Go to Dashboard
            </button>
            <button onClick={() => router.push("/explore")}
              className="px-6 py-3 rounded-xl font-medium border transition-all hover:bg-white/5"
              style={{ borderColor: "#374151", color: "#9CA3AF" }}>
              Explore Projects
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen">
      <div style={{ background: "linear-gradient(135deg, #0A0F1F 0%, #001E6C 30%, #0A0F1F 100%)" }} className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Create a Project</h1>
          <p style={{ color: "#9CA3AF" }}>Share your vision with the Cardano community</p>

          {/* Progress Steps */}
          <div className="flex items-center gap-4 mt-8">
            {[
              { n: 1, label: "Basic Info" },
              { n: 2, label: "Funding" },
              { n: 3, label: "Team & Milestones" },
              { n: 4, label: "Links" },
            ].map((s, idx) => (
              <div key={s.n} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all`}
                  style={{
                    background: step >= s.n ? "linear-gradient(135deg, #0033AD, #00C6FF)" : "#374151",
                    color: "white",
                  }}>
                  {step > s.n ? "✓" : s.n}
                </div>
                <span className="text-xs hidden sm:block" style={{ color: step === s.n ? "white" : "#9CA3AF" }}>{s.label}</span>
                {idx < 3 && <div className="w-8 h-0.5 hidden sm:block" style={{ background: step > s.n ? "#0033AD" : "#374151" }} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-2xl p-8 border" style={{ background: "#1F2937", borderColor: "rgba(55,65,81,0.5)" }}>
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Basic Information</h2>
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Project Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="e.g. CardaSwap DEX"
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 border focus:outline-none transition-colors"
                  style={{ background: "#111827", borderColor: "#374151" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Short Description *</label>
                <input
                  type="text"
                  value={form.shortDescription}
                  onChange={(e) => update("shortDescription", e.target.value)}
                  placeholder="One line description (max 120 chars)"
                  maxLength={120}
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 border focus:outline-none transition-colors"
                  style={{ background: "#111827", borderColor: "#374151" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Full Description *</label>
                <textarea
                  value={form.fullDescription}
                  onChange={(e) => update("fullDescription", e.target.value)}
                  placeholder="Describe your project in detail..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 border focus:outline-none transition-colors resize-none"
                  style={{ background: "#111827", borderColor: "#374151" }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Category</label>
                  <select value={form.category} onChange={(e) => update("category", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-white border focus:outline-none"
                    style={{ background: "#111827", borderColor: "#374151" }}>
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Status</label>
                  <select value={form.status} onChange={(e) => update("status", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-white border focus:outline-none"
                    style={{ background: "#111827", borderColor: "#374151" }}>
                    {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Funding */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Funding Details</h2>
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Funding Goal (ADA) *</label>
                <div className="relative">
                  <input
                    type="number"
                    value={form.fundingGoal}
                    onChange={(e) => update("fundingGoal", e.target.value)}
                    placeholder="100000"
                    className="w-full pl-4 pr-12 py-3 rounded-xl text-white placeholder-gray-500 border focus:outline-none"
                    style={{ background: "#111827", borderColor: "#374151" }}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }}>₳</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Funding Wallet Address *</label>
                <input
                  type="text"
                  value={form.walletAddress}
                  onChange={(e) => update("walletAddress", e.target.value)}
                  placeholder="addr1q..."
                  readOnly
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 border focus:outline-none font-mono text-sm bg-gray-800 cursor-not-allowed"
                  style={{ borderColor: "#374151" }}
                />
                <p className="text-xs mt-2" style={{ color: "#9CA3AF" }}>This is your connected wallet address. All funding contributions will be sent here.</p>
              </div>
              <div className="rounded-xl p-4 border" style={{ background: "rgba(0,51,173,0.1)", borderColor: "rgba(0,51,173,0.3)" }}>
                <p className="text-sm" style={{ color: "#4DA6FF" }}>
                  💡 Tip: All funding transactions will be publicly verifiable on the Cardano blockchain.
                  We recommend using a dedicated project wallet.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Team & Milestones */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Team & Milestones</h2>
              
              <div>
                <label className="block text-sm font-medium mb-3 text-white">Team Members</label>
                {form.teamMembers.map((member, idx) => (
                  <div key={idx} className="flex gap-3 mb-3">
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => {
                        const updated = [...form.teamMembers];
                        updated[idx] = { ...updated[idx], name: e.target.value };
                        setForm((prev) => ({ ...prev, teamMembers: updated }));
                      }}
                      placeholder="Name"
                      className="flex-1 px-4 py-3 rounded-xl text-white placeholder-gray-500 border focus:outline-none"
                      style={{ background: "#111827", borderColor: "#374151" }}
                    />
                    <input
                      type="text"
                      value={member.role}
                      onChange={(e) => {
                        const updated = [...form.teamMembers];
                        updated[idx] = { ...updated[idx], role: e.target.value };
                        setForm((prev) => ({ ...prev, teamMembers: updated }));
                      }}
                      placeholder="Role"
                      className="flex-1 px-4 py-3 rounded-xl text-white placeholder-gray-500 border focus:outline-none"
                      style={{ background: "#111827", borderColor: "#374151" }}
                    />
                    {idx > 0 && (
                      <button
                        onClick={() => setForm((prev) => ({ ...prev, teamMembers: prev.teamMembers.filter((_, i) => i !== idx) }))}
                        className="p-3 rounded-xl transition-all hover:bg-red-500/20"
                        style={{ color: "#EF4444" }}>
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => setForm((prev) => ({ ...prev, teamMembers: [...prev.teamMembers, { name: "", role: "" }] }))}
                  className="flex items-center gap-2 text-sm transition-colors mt-2"
                  style={{ color: "#4DA6FF" }}>
                  <Plus size={16} /> Add Team Member
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3 text-white">Milestones</label>
                {form.milestones.map((milestone, idx) => (
                  <div key={idx} className="rounded-xl p-4 border mb-3" style={{ background: "#111827", borderColor: "#374151" }}>
                    <div className="flex gap-3 mb-3">
                      <input
                        type="text"
                        value={milestone.title}
                        onChange={(e) => {
                          const updated = [...form.milestones];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setForm((prev) => ({ ...prev, milestones: updated }));
                        }}
                        placeholder="Milestone title"
                        className="flex-1 px-4 py-2.5 rounded-lg text-white placeholder-gray-500 border focus:outline-none text-sm"
                        style={{ background: "#1F2937", borderColor: "#374151" }}
                      />
                      <input
                        type="date"
                        value={milestone.dueDate}
                        onChange={(e) => {
                          const updated = [...form.milestones];
                          updated[idx] = { ...updated[idx], dueDate: e.target.value };
                          setForm((prev) => ({ ...prev, milestones: updated }));
                        }}
                        className="px-4 py-2.5 rounded-lg text-white border focus:outline-none text-sm"
                        style={{ background: "#1F2937", borderColor: "#374151" }}
                      />
                      {idx > 0 && (
                        <button
                          onClick={() => setForm((prev) => ({ ...prev, milestones: prev.milestones.filter((_, i) => i !== idx) }))}
                          className="p-2 rounded-lg transition-all hover:bg-red-500/20"
                          style={{ color: "#EF4444" }}>
                          <X size={14} />
                        </button>
                      )}
                    </div>
                    <textarea
                      value={milestone.description}
                      onChange={(e) => {
                        const updated = [...form.milestones];
                        updated[idx] = { ...updated[idx], description: e.target.value };
                        setForm((prev) => ({ ...prev, milestones: updated }));
                      }}
                      placeholder="Describe this milestone..."
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-lg text-white placeholder-gray-500 border focus:outline-none text-sm resize-none"
                      style={{ background: "#1F2937", borderColor: "#374151" }}
                    />
                  </div>
                ))}
                <button
                  onClick={() => setForm((prev) => ({ ...prev, milestones: [...prev.milestones, { title: "", description: "", dueDate: "" }] }))}
                  className="flex items-center gap-2 text-sm transition-colors"
                  style={{ color: "#4DA6FF" }}>
                  <Plus size={16} /> Add Milestone
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Links */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Links & Social</h2>
              {[
                { field: "github", label: "GitHub URL", placeholder: "https://github.com/yourproject" },
                { field: "website", label: "Website URL", placeholder: "https://yourproject.io" },
                { field: "twitter", label: "Twitter/X URL", placeholder: "https://twitter.com/yourproject" },
              ].map((item) => (
                <div key={item.field}>
                  <label className="block text-sm font-medium mb-2 text-white">{item.label}</label>
                  <input
                    type="url"
                    value={form[item.field as keyof typeof form] as string}
                    onChange={(e) => update(item.field, e.target.value)}
                    placeholder={item.placeholder}
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 border focus:outline-none"
                    style={{ background: "#111827", borderColor: "#374151" }}
                  />
                </div>
              ))}

              {/* Review Summary */}
              <div className="rounded-xl p-4 border mt-6" style={{ background: "rgba(0,51,173,0.1)", borderColor: "rgba(0,51,173,0.3)" }}>
                <h3 className="text-white font-medium mb-3">Project Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span style={{ color: "#9CA3AF" }}>Name</span>
                    <span className="text-white">{form.name || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "#9CA3AF" }}>Category</span>
                    <span className="text-white">{form.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "#9CA3AF" }}>Funding Goal</span>
                    <span className="text-white">{form.fundingGoal ? `${parseInt(form.fundingGoal).toLocaleString()} ₳` : "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "#9CA3AF" }}>Team Members</span>
                    <span className="text-white">{form.teamMembers.filter(m => m.name).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "#9CA3AF" }}>Milestones</span>
                    <span className="text-white">{form.milestones.filter(m => m.title).length}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t" style={{ borderColor: "#374151" }}>
            <button
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium border transition-all hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ borderColor: "#374151", color: "#9CA3AF" }}>
              <ArrowLeft size={16} /> Previous
            </button>
            {step < 4 ? (
              <button
                onClick={() => setStep((s) => Math.min(4, s + 1))}
                disabled={step === 1 && (!form.name || !form.shortDescription)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-40"
                style={{ background: "linear-gradient(135deg, #0033AD, #00C6FF)" }}>
                Next <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={saving || !form.name || !form.fundingGoal}
                className="flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #0033AD, #00C6FF)" }}>
                {saving ? "Creating..." : "Launch Project 🚀"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
