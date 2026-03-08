"use client";
import Link from "next/link";
import { TrendingUp, Star, Users, ArrowRight, Plus, Settings } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS, formatADA, getFundingPercentage } from "@/lib/data";

const userProjects = PROJECTS.slice(0, 2);
const fundedProjects = PROJECTS.slice(2, 4);

const activityFeed = [
  { icon: "💰", text: "You funded CardanoBridge with 500 ₳", date: "2 hours ago" },
  { icon: "⭐", text: "You reviewed ADA NFT Marketplace", date: "1 day ago" },
  { icon: "🚀", text: "CardaSwap DEX reached 50% funding", date: "2 days ago" },
  { icon: "📢", text: "EduChain Academy published a new update", date: "3 days ago" },
];

export default function DashboardPage() {
  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0A0F1F 0%, #001E6C 30%, #0A0F1F 100%)" }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #0033AD, #00C6FF)" }}>
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123" alt="Avatar" className="w-full h-full" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Welcome back, Builder!</h1>
                <p style={{ color: "#9CA3AF" }} className="text-sm">Member since January 2024 • Reputation Score: 847</p>
              </div>
            </div>
            <button className="p-2 rounded-xl border transition-all hover:bg-white/5" style={{ borderColor: "#374151", color: "#9CA3AF" }}>
              <Settings size={20} />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {[
              { label: "Projects Created", value: "2", icon: <Plus size={20} /> },
              { label: "Projects Funded", value: "8", icon: <TrendingUp size={20} /> },
              { label: "Total Contributed", value: "2,450 ₳", icon: <TrendingUp size={20} /> },
              { label: "Reputation Score", value: "847", icon: <Star size={20} /> },
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
                        <span>{formatADA(project.fundingRaised)} raised</span>
                        <span>{getFundingPercentage(project.fundingRaised, project.fundingGoal)}%</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden mb-3" style={{ background: "#374151" }}>
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${getFundingPercentage(project.fundingRaised, project.fundingGoal)}%`, background: "linear-gradient(90deg, #0033AD, #00C6FF)" }}
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
            </section>

            {/* Funded Projects */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Projects I&apos;ve Funded</h2>
                <Link href="/explore" className="flex items-center gap-1 text-sm" style={{ color: "#4DA6FF" }}>
                  Explore more <ArrowRight size={14} />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fundedProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Activity Feed */}
            <div className="rounded-2xl p-6 border" style={{ background: "#1F2937", borderColor: "rgba(55,65,81,0.5)" }}>
              <h3 className="text-white font-semibold mb-4">Recent Activity</h3>
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
            </div>

            {/* Profile Summary */}
            <div className="rounded-2xl p-6 border" style={{ background: "#1F2937", borderColor: "rgba(55,65,81,0.5)" }}>
              <h3 className="text-white font-semibold mb-4">Profile</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#9CA3AF" }}>Wallet</span>
                  <span className="text-white font-mono text-xs">addr1qx8z7...k9p2</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#9CA3AF" }}>Skills</span>
                  <div className="flex gap-1">
                    {["Plutus", "React"].map((s) => (
                      <span key={s} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(0,51,173,0.2)", color: "#4DA6FF" }}>{s}</span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#9CA3AF" }}>Reviews Given</span>
                  <span className="text-white">12</span>
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
