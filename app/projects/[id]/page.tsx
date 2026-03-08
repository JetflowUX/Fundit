"use client";
import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, Users, Github, Globe, Twitter, CheckCircle, Circle, ArrowLeft, ExternalLink, Heart } from "lucide-react";
import { PROJECTS, CATEGORY_COLORS, STATUS_COLORS, formatADA, getFundingPercentage } from "@/lib/data";

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) notFound();

  const fundingPct = getFundingPercentage(project.fundingRaised, project.fundingGoal);

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Image */}
      <div className="relative h-80 overflow-hidden">
        <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 0%, #0A0F1F 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <Link href="/explore" className="inline-flex items-center gap-2 text-sm mb-4 transition-colors" style={{ color: "#9CA3AF" }}>
            <ArrowLeft size={16} /> Back to Explore
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${CATEGORY_COLORS[project.category]}`}>{project.category}</span>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_COLORS[project.status]}`}>{project.status}</span>
          </div>
          <h1 className="text-4xl font-bold text-white mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{project.name}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <section className="rounded-2xl p-6 border" style={{ background: "#1F2937", borderColor: "rgba(55,65,81,0.5)" }}>
              <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Overview</h2>
              <p className="leading-relaxed" style={{ color: "#9CA3AF" }}>{project.fullDescription}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full border" style={{ background: "rgba(55,65,81,0.5)", borderColor: "#374151", color: "#9CA3AF" }}>{tag}</span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4 mt-4">
                {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm transition-colors" style={{ color: "#9CA3AF" }}><Github size={16} /> GitHub</a>}
                {project.website && <a href={project.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm transition-colors" style={{ color: "#9CA3AF" }}><Globe size={16} /> Website</a>}
                {project.twitter && <a href={project.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm transition-colors" style={{ color: "#9CA3AF" }}><Twitter size={16} /> Twitter</a>}
              </div>
            </section>

            {/* Team */}
            <section className="rounded-2xl p-6 border" style={{ background: "#1F2937", borderColor: "rgba(55,65,81,0.5)" }}>
              <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Team</h2>
              <div className="flex flex-wrap gap-4">
                {project.team.map((member) => (
                  <div key={member.name} className="flex items-center gap-3 rounded-xl p-3 border" style={{ background: "rgba(55,65,81,0.3)", borderColor: "#374151" }}>
                    <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full" style={{ background: "#374151" }} />
                    <div>
                      <p className="text-white font-medium text-sm">{member.name}</p>
                      <p className="text-xs" style={{ color: "#9CA3AF" }}>{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Milestones */}
            <section className="rounded-2xl p-6 border" style={{ background: "#1F2937", borderColor: "rgba(55,65,81,0.5)" }}>
              <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Milestones</h2>
              <div className="space-y-4">
                {project.milestones.map((milestone, idx) => (
                  <div key={milestone.id} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      {milestone.completed
                        ? <CheckCircle size={22} style={{ color: "#22C55E" }} />
                        : <Circle size={22} style={{ color: "#374151" }} />}
                      {idx < project.milestones.length - 1 && (
                        <div className="w-0.5 h-8 mt-1" style={{ background: milestone.completed ? "#22C55E" : "#374151" }} />
                      )}
                    </div>
                    <div className="pb-4">
                      <div className="flex items-center gap-2">
                        <h3 className="text-white font-medium">{milestone.title}</h3>
                        {milestone.completed && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(34,197,94,0.2)", color: "#22C55E" }}>Completed</span>}
                      </div>
                      <p className="text-sm mt-1" style={{ color: "#9CA3AF" }}>{milestone.description}</p>
                      <p className="text-xs mt-1" style={{ color: "#374151" }}>Due: {milestone.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Updates */}
            {project.updates.length > 0 && (
              <section className="rounded-2xl p-6 border" style={{ background: "#1F2937", borderColor: "rgba(55,65,81,0.5)" }}>
                <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Updates</h2>
                <div className="space-y-4">
                  {project.updates.map((update) => (
                    <div key={update.id} className="rounded-xl p-4 border-l-4" style={{ background: "rgba(55,65,81,0.3)", borderLeftColor: "#0033AD" }}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{
                          background: update.type === "development" ? "rgba(59,130,246,0.2)" : update.type === "funding" ? "rgba(34,197,94,0.2)" : "rgba(250,204,21,0.2)",
                          color: update.type === "development" ? "#60a5fa" : update.type === "funding" ? "#4ade80" : "#fbbf24"
                        }}>
                          {update.type.charAt(0).toUpperCase() + update.type.slice(1)}
                        </span>
                        <span className="text-xs" style={{ color: "#9CA3AF" }}>{update.date}</span>
                      </div>
                      <h3 className="text-white font-medium mb-1">{update.title}</h3>
                      <p className="text-sm" style={{ color: "#9CA3AF" }}>{update.content}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Reviews */}
            <section className="rounded-2xl p-6 border" style={{ background: "#1F2937", borderColor: "rgba(55,65,81,0.5)" }}>
              <h2 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Community Reviews</h2>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl font-bold text-white">{project.rating.toFixed(1)}</div>
                <div>
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} size={20} fill={s <= Math.round(project.rating) ? "#FACC15" : "none"} style={{ color: "#FACC15" }} />
                    ))}
                  </div>
                  <p className="text-sm" style={{ color: "#9CA3AF" }}>{project.reviewCount} reviews</p>
                </div>
              </div>
              {project.reviews.length > 0 ? (
                <div className="space-y-4">
                  {project.reviews.map((review) => (
                    <div key={review.id} className="rounded-xl p-4 border" style={{ background: "rgba(55,65,81,0.3)", borderColor: "#374151" }}>
                      <div className="flex items-center gap-3 mb-2">
                        <img src={review.avatar} alt={review.author} className="w-8 h-8 rounded-full" style={{ background: "#374151" }} />
                        <span className="text-white font-medium text-sm">{review.author}</span>
                        <div className="flex gap-0.5 ml-auto">
                          {[1,2,3,4,5].map((s) => (
                            <Star key={s} size={14} fill={s <= review.rating ? "#FACC15" : "none"} style={{ color: "#FACC15" }} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm" style={{ color: "#9CA3AF" }}>{review.comment}</p>
                      <p className="text-xs mt-2" style={{ color: "#374151" }}>{review.date}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: "#9CA3AF" }} className="text-sm">No reviews yet. Be the first to review!</p>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Fund Card */}
            <div className="rounded-2xl p-6 border sticky top-24" style={{ background: "#1F2937", borderColor: "rgba(55,65,81,0.5)" }}>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-2xl font-bold text-white">{formatADA(project.fundingRaised)}</span>
                  <span style={{ color: "#9CA3AF" }}>{fundingPct}%</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden mb-2" style={{ background: "#374151" }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${fundingPct}%`, background: "linear-gradient(90deg, #0033AD, #00C6FF)" }}
                  />
                </div>
                <div className="flex justify-between text-sm" style={{ color: "#9CA3AF" }}>
                  <span>Goal: {formatADA(project.fundingGoal)}</span>
                  <span className="flex items-center gap-1"><Users size={14} /> {project.supportersCount.toLocaleString()}</span>
                </div>
              </div>

              <button
                className="w-full py-4 rounded-xl text-white font-semibold text-lg mb-3 transition-all hover:opacity-90 hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #0033AD, #00C6FF)" }}
              >
                Fund This Project ₳
              </button>
              <button className="w-full py-3 rounded-xl text-sm font-medium border transition-all hover:bg-white/5 flex items-center justify-center gap-2"
                style={{ borderColor: "#374151", color: "#9CA3AF" }}>
                <Heart size={16} /> Save to Watchlist
              </button>

              {/* Progress info */}
              <div className="mt-4 pt-4 border-t" style={{ borderColor: "#374151" }}>
                <div className="flex justify-between text-sm mb-2">
                  <span style={{ color: "#9CA3AF" }}>Completion</span>
                  <span className="text-white">{project.completionPercentage}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#374151" }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${project.completionPercentage}%`, background: "#22C55E" }}
                  />
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="rounded-2xl p-6 border" style={{ background: "#1F2937", borderColor: "rgba(55,65,81,0.5)" }}>
              <h3 className="text-white font-semibold mb-4">Project Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: "#9CA3AF" }}>Status</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${STATUS_COLORS[project.status]}`}>{project.status}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#9CA3AF" }}>Category</span>
                  <span className="text-white">{project.category}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#9CA3AF" }}>Created</span>
                  <span className="text-white">{project.createdAt}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#9CA3AF" }}>Rating</span>
                  <span className="text-white flex items-center gap-1"><Star size={14} style={{ color: "#FACC15" }} fill="#FACC15" /> {project.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
