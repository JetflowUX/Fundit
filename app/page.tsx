"use client";
import Link from "next/link";
import { ArrowRight, Zap, Shield, Users, TrendingUp, Star, ChevronRight } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS, FUNDING_PROGRAMS, COMMUNITY_POSTS, formatADA } from "@/lib/data";

const featuredProjects = PROJECTS.slice(0, 3);
const trendingProjects = PROJECTS.slice(2, 6);
const activePrograms = FUNDING_PROGRAMS.slice(0, 3);
const recentPosts = COMMUNITY_POSTS.slice(0, 3);

const stats = [
  { label: "Projects Funded", value: "2,847" },
  { label: "ADA Raised", value: "45.2M ₳" },
  { label: "Community Members", value: "128K" },
  { label: "Avg. Rating", value: "4.7 ★" },
];

export default function HomePage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0A0F1F 0%, #001E6C 50%, #0A0F1F 100%)" }} />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: "rgba(0,51,173,0.2)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: "rgba(0,198,255,0.1)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-8"
              style={{ background: "rgba(0,51,173,0.2)", borderColor: "rgba(0,51,173,0.3)", color: "#4DA6FF" }}>
              <div className="w-2 h-2 rounded-full" style={{ background: "#22C55E" }} />
              Built on Cardano
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Fund the Future of{" "}
              <span style={{ background: "linear-gradient(135deg, #0033AD, #00C6FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Cardano
              </span>
            </h1>

            <p className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: "#9CA3AF" }}>
              Discover, fund, and build the next generation of Cardano projects. 
              Connect with builders, track milestones, and shape the future of decentralized innovation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/explore"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #0033AD, #00C6FF)" }}
              >
                Explore Projects <ArrowRight size={20} />
              </Link>
              <Link
                href="/create-project"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-lg border transition-all hover:bg-white/5"
                style={{ borderColor: "#374151" }}
              >
                Create Project <ChevronRight size={20} />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</div>
                  <div className="text-sm" style={{ color: "#9CA3AF" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Featured Projects</h2>
            <p style={{ color: "#9CA3AF" }}>Hand-picked projects making an impact in the Cardano ecosystem</p>
          </div>
          <Link href="/explore" className="hidden sm:flex items-center gap-2 text-sm font-medium transition-colors" style={{ color: "#4DA6FF" }}>
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Trending Projects */}
      <section style={{ background: "#111827" }} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <TrendingUp size={28} className="inline-block mr-2 -mt-1" style={{ color: "#00C6FF" }} />
                Trending Now
              </h2>
              <p style={{ color: "#9CA3AF" }}>Projects gaining momentum in the community</p>
            </div>
            <Link href="/explore" className="hidden sm:flex items-center gap-2 text-sm font-medium" style={{ color: "#4DA6FF" }}>
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Active Funding Programs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Active Funding Programs</h2>
            <p style={{ color: "#9CA3AF" }}>Get funded by leading Cardano organizations</p>
          </div>
          <Link href="/programs" className="hidden sm:flex items-center gap-2 text-sm font-medium" style={{ color: "#4DA6FF" }}>
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activePrograms.map((program) => (
            <div key={program.id} className="rounded-2xl p-6 border card-hover" style={{ background: "#1F2937", borderColor: "rgba(55,65,81,0.5)" }}>
              <div className="flex items-start gap-4 mb-4">
                <img src={program.logo} alt={program.organization} className="w-12 h-12 rounded-xl" style={{ background: "#374151" }} />
                <div>
                  <h3 className="text-white font-semibold">{program.name}</h3>
                  <p className="text-sm" style={{ color: "#9CA3AF" }}>{program.organization}</p>
                </div>
              </div>
              <p className="text-sm mb-4 line-clamp-2" style={{ color: "#9CA3AF" }}>{program.description}</p>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs mb-1" style={{ color: "#9CA3AF" }}>Funding Pool</p>
                  <p className="text-white font-semibold">{formatADA(program.fundingPool)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs mb-1" style={{ color: "#9CA3AF" }}>Deadline</p>
                  <p className="text-white font-semibold text-sm">{program.deadline}</p>
                </div>
              </div>
              <Link
                href="/programs"
                className="block w-full text-center px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #0033AD, #00C6FF)" }}
              >
                Apply Now
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Ecosystem Updates */}
      <section style={{ background: "#111827" }} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Ecosystem Updates</h2>
              <p style={{ color: "#9CA3AF" }}>Stay informed with the latest from the Cardano community</p>
            </div>
            <Link href="/community" className="hidden sm:flex items-center gap-2 text-sm font-medium" style={{ color: "#4DA6FF" }}>
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Link key={post.id} href="/community">
                <div className="rounded-2xl overflow-hidden border card-hover group cursor-pointer" style={{ background: "#1F2937", borderColor: "rgba(55,65,81,0.5)" }}>
                  {post.image && (
                    <div className="h-40 overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs px-2 py-1 rounded-full font-medium" style={{
                        background: post.type === "guide" ? "rgba(168,85,247,0.2)" : post.type === "announcement" ? "rgba(59,130,246,0.2)" : post.type === "event" ? "rgba(34,197,94,0.2)" : "rgba(107,114,128,0.2)",
                        color: post.type === "guide" ? "#c084fc" : post.type === "announcement" ? "#60a5fa" : post.type === "event" ? "#4ade80" : "#9ca3af"
                      }}>
                        {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                      </span>
                      <span className="text-xs" style={{ color: "#9CA3AF" }}>{post.readTime}</span>
                    </div>
                    <h3 className="text-white font-semibold mb-2 line-clamp-2" style={{ transition: "color 0.2s" }}>{post.title}</h3>
                    <div className="flex items-center gap-2">
                      <img src={post.avatar} alt={post.author} className="w-6 h-6 rounded-full" style={{ background: "#374151" }} />
                      <span className="text-xs" style={{ color: "#9CA3AF" }}>{post.author}</span>
                      <span className="text-xs" style={{ color: "#374151" }}>•</span>
                      <span className="text-xs" style={{ color: "#9CA3AF" }}>{post.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative rounded-3xl overflow-hidden p-12 text-center" style={{ background: "linear-gradient(135deg, #001E6C 0%, #0033AD 50%, #001E6C 100%)" }}>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl" style={{ background: "rgba(0,198,255,0.1)" }} />
          <div className="relative">
            <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Ready to Build on Cardano?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: "#9CA3AF" }}>
              Join thousands of builders and supporters shaping the future of the Cardano ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/create-project"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white font-semibold text-lg transition-all hover:scale-105"
                style={{ color: "#0033AD" }}
              >
                Create Your Project <ArrowRight size={20} />
              </Link>
              <Link
                href="/explore"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-lg border border-white/30 hover:bg-white/10 transition-all"
              >
                Explore Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ background: "#111827" }} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Why Fundit?</h2>
            <p className="max-w-2xl mx-auto" style={{ color: "#9CA3AF" }}>Built specifically for the Cardano ecosystem with Web3-native features</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Shield size={24} />, title: "Cardano-Native Funding", description: "Fund projects directly with ADA. Secure, transparent, and verifiable on-chain transactions." },
              { icon: <Users size={24} />, title: "Community Governance", description: "Reviews, ratings, and reputation systems that put the community in control of quality." },
              { icon: <TrendingUp size={24} />, title: "Milestone Tracking", description: "Transparent project progress with milestone-based funding and regular updates from builders." },
              { icon: <Zap size={24} />, title: "Wallet Integration", description: "Connect with Lace, Nami, or Eternl wallets for seamless Web3 authentication." },
              { icon: <Star size={24} />, title: "Reputation System", description: "Build credibility through successful projects and community endorsements." },
              { icon: <ArrowRight size={24} />, title: "Funding Programs", description: "Apply to ecosystem grants and accelerator programs from leading Cardano organizations." },
            ].map((feature) => (
              <div key={feature.title} className="rounded-2xl p-6 border" style={{ background: "#1F2937", borderColor: "rgba(55,65,81,0.5)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(0,51,173,0.2)", color: "#4DA6FF" }}>
                  {feature.icon}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
