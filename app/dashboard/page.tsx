"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { TrendingUp, Star, Plus, Settings, Wallet as WalletIcon, AlertCircle, ArrowRight } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS, formatADA, getFundingPercentage } from "@/lib/data";
import { useWallet } from "@/lib/wallet-context";
import {
  getOrCreateUserProfile,
  getAllCreatedProjects,
  getTransactionsByUser,
  type UserProfile,
  type ProjectTransaction,
} from "@/lib/storage";

export default function DashboardPage() {
  const { connected, walletAddress, walletBalance } = useWallet();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userProjects, setUserProjects] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<ProjectTransaction[]>([]);
  const [activityFeed, setActivityFeed] = useState<any[]>([]);

  const [fundedProjects, setFundedProjects] = useState<any[]>([]);

  useEffect(() => {
    if (connected && walletAddress) {
      const profile = getOrCreateUserProfile(walletAddress);
      setUserProfile(profile);

      const allProjects = getAllCreatedProjects();
      const myProjects = allProjects.filter((p) => 
        profile.projectsCreated.includes(p.id)
      );
      setUserProjects(myProjects);

      const userTxs = getTransactionsByUser(walletAddress);
      setTransactions(userTxs);

      // Get funded projects
      const fundedProjectIds = new Set(userTxs.map((tx) => tx.projectId));
      const funded = [...PROJECTS, ...allProjects].filter((p) => 
        fundedProjectIds.has(p.id)
      );
      setFundedProjects(funded.slice(0, 4)); // Limit to 4

      // Build activity feed from transactions
      const activities = userTxs.slice(0, 4).map((tx) => {
        const project = PROJECTS.find((p) => p.id === tx.projectId) || 
          allProjects.find((p) => p.id === tx.projectId);
        return {
          icon: "💰",
          text: `You funded ${project?.name || "a project"} with ${tx.amount} ₳`,
          date: new Date(tx.timestamp).toLocaleDateString(),
        };
      });
      setActivityFeed(activities);
    }
  }, [connected, walletAddress]);

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
            Please connect your Cardano wallet to access your dashboard and track your projects.
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

  const totalContributed = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const projectsFunded = new Set(transactions.map((tx) => tx.projectId)).size;
  const reputation = Math.floor(totalContributed * 10 + projectsFunded * 50 + userProjects.length * 100);
  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0A0F1F 0%, #001E6C 30%, #0A0F1F 100%)" }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white overflow-hidden" style={{ background: "linear-gradient(135deg, #0033AD, #00C6FF)" }}>
                {walletAddress?.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Welcome back, Builder!
                </h1>
                <p style={{ color: "#9CA3AF" }} className="text-sm font-mono">
                  {walletAddress} • {walletBalance} ₳
                </p>
              </div>
            </div>
            <button className="p-2 rounded-xl border transition-all hover:bg-white/5" style={{ borderColor: "#374151", color: "#9CA3AF" }}>
              <Settings size={20} />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {[
              { label: "Projects Created", value: userProjects.length.toString(), icon: <Plus size={20} /> },
              { label: "Projects Funded", value: projectsFunded.toString(), icon: <TrendingUp size={20} /> },
              { label: "Total Contributed", value: `${totalContributed.toFixed(2)} ₳`, icon: <TrendingUp size={20} /> },
              { label: "Reputation Score", value: reputation.toString(), icon: <Star size={20} /> },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl p-4 border" style={{ background: "rgba(31,41,55,0.5)", borderColor: "rgba(55,65,81,0.3)" }}>
                <div className="flex items-center gap-2 mb-2" style={{ color: "#4DA6FF" }}>
                  {stat.icon}
                  <span className="text-xs" style={{ color: "#9CA3AF" }}>{stat.label}</span>
                </div>
                <div className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* My Projects */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>My Projects</h2>
                <Link href="/create-project" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #0033AD, #00C6FF)" }}>
                  <Plus size={16} /> New Project
                </Link>
              </div>
              {userProjects.length === 0 ? (
                <div className="text-center py-12 rounded-2xl border" style={{ background: "rgba(31,41,55,0.5)", borderColor: "rgba(55,65,81,0.3)" }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(0,51,173,0.1)" }}>
                    <Plus size={32} style={{ color: "#4DA6FF" }} />
                  </div>
                  <p className="text-[#9CA3AF] mb-4">You haven&apos;t created any projects yet.</p>
                  <Link href="/create-project" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #0033AD, #00C6FF)" }}>
                    <Plus size={20} /> Create Your First Project
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userProjects.map((project) => (
                    <div key={project.id} className="rounded-2xl overflow-hidden border" style={{ background: "#1F2937", borderColor: "rgba(55,65,81,0.5)" }}>
                      <div className="relative h-32 overflow-hidden">
                        <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent, #1F2937)" }} />
                      </div>
                      <div className="p-4">
                        <h3 className="text-white font-semibold mb-2">{project.name}</h3>
                        <div className="flex justify-between text-xs mb-2" style={{ color: "#9CA3AF" }}>
                          <span>{formatADA(project.fundingRaised || 0)} raised</span>
                          <span>{getFundingPercentage(project.fundingRaised || 0, project.fundingGoal || 1)}%</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden mb-3" style={{ background: "#374151" }}>
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${getFundingPercentage(project.fundingRaised || 0, project.fundingGoal || 1)}%`, background: "linear-gradient(90deg, #0033AD, #00C6FF)" }}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/projects/${project.id}`} className="flex-1 text-center py-2 rounded-lg text-xs font-medium border transition-all hover:bg-white/5"
                            style={{ borderColor: "#374151", color: "#9CA3AF" }}>
                            View
                          </Link>
                          <button className="flex-1 py-2 rounded-lg text-xs font-medium text-white transition-all hover:opacity-90"
                            style={{ background: "rgba(0,51,173,0.4)" }}>
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Funded Projects */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Projects I&apos;ve Funded</h2>
                <Link href="/explore" className="flex items-center gap-1 text-sm" style={{ color: "#4DA6FF" }}>
                  Explore more <ArrowRight size={14} />
                </Link>
              </div>
              {fundedProjects.length === 0 ? (
                <div className="text-center py-12 rounded-2xl border" style={{ background: "rgba(31,41,55,0.5)", borderColor: "rgba(55,65,81,0.3)" }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(0,51,173,0.1)" }}>
                    <TrendingUp size={32} style={{ color: "#4DA6FF" }} />
                  </div>
                  <p className="text-[#9CA3AF] mb-4">You haven&apos;t funded any projects yet.</p>
                  <Link href="/explore" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #0033AD, #00C6FF)" }}>
                    Explore Projects
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {fundedProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Activity Feed */}
            <div className="rounded-2xl p-6 border" style={{ background: "#1F2937", borderColor: "rgba(55,65,81,0.5)" }}>
              <h3 className="text-white font-semibold mb-4">Recent Activity</h3>
              {activityFeed.length === 0 ? (
                <div className="text-center py-6">
                  <AlertCircle size={32} className="mx-auto mb-2" style={{ color: "#4DA6FF" }} />
                  <p className="text-sm text-[#9CA3AF]">No recent activity yet. <br />Start by funding a project!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activityFeed.map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <span className="text-lg">{item.icon}</span>
                      <div>
                        <p className="text-sm text-white">{item.text}</p>
                        <p className="text-xs mt-1" style={{ color: "#9CA3AF" }}>{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Summary */}
            <div className="rounded-2xl p-6 border" style={{ background: "#1F2937", borderColor: "rgba(55,65,81,0.5)" }}>
              <h3 className="text-white font-semibold mb-4">Profile</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#9CA3AF" }}>Wallet</span>
                  <span className="text-white font-mono text-xs">
                    {walletAddress?.substring(0, 8)}...{walletAddress?.substring(walletAddress.length - 4)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#9CA3AF" }}>Balance</span>
                  <span className="text-white font-semibold">{walletBalance} ₳</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#9CA3AF" }}>Member Since</span>
                  <span className="text-white text-xs">
                    {userProfile ? new Date(userProfile.createdAt).toLocaleDateString() : "Today"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#9CA3AF" }}>Reviews Given</span>
                  <span className="text-white">{userProfile?.reviewsGiven.length || 0}</span>
                </div>
              </div>
              <button className="w-full mt-4 py-2 rounded-lg text-sm font-medium border transition-all hover:bg-white/5"
                style={{ borderColor: "#374151", color: "#9CA3AF" }}>
                Edit Profile
              </button>
            </div>

            {/* Quick Links */}
            <div className="rounded-2xl p-6 border" style={{ background: "#1F2937", borderColor: "rgba(55,65,81,0.5)" }}>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                {[
                  { label: "Explore Projects", href: "/explore" },
                  { label: "Browse Programs", href: "/programs" },
                  { label: "Community Hub", href: "/community" },
                  { label: "Create Project", href: "/create-project" },
                ].map((link) => (
                  <Link key={link.href} href={link.href}
                    className="flex items-center justify-between p-3 rounded-lg transition-all hover:bg-white/5"
                    style={{ color: "#9CA3AF" }}>
                    <span className="text-sm">{link.label}</span>
                    <ArrowRight size={14} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
