"use client";
import { useState } from "react";
import { Calendar, Users, ArrowRight, CheckCircle } from "lucide-react";
import { FUNDING_PROGRAMS, formatADA } from "@/lib/data";

export default function ProgramsPage() {
  const [applying, setApplying] = useState<string | null>(null);
  const [applied, setApplied] = useState<Set<string>>(new Set());

  const handleApply = (id: string) => {
    setApplying(id);
    setTimeout(() => {
      setApplied((prev) => new Set([...prev, id]));
      setApplying(null);
    }, 1500);
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0A0F1F 0%, #001E6C 30%, #0A0F1F 100%)" }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-6"
            style={{ background: "rgba(0,51,173,0.2)", borderColor: "rgba(0,51,173,0.3)", color: "#4DA6FF" }}>
            💰 Funding Programs
          </div>
          <h1 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Get Your Project Funded
          </h1>
          <p style={{ color: "#9CA3AF" }} className="text-lg max-w-2xl">
            Apply to grants and accelerator programs from leading Cardano organizations. 
            Access funding, mentorship, and resources to bring your vision to life.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
            {[
              { label: "Total Pool", value: "8.5M ₳" },
              { label: "Active Programs", value: "4" },
              { label: "Projects Funded", value: "847+" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl p-4 border" style={{ background: "rgba(31,41,55,0.5)", borderColor: "rgba(55,65,81,0.3)" }}>
                <div className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</div>
                <div className="text-sm" style={{ color: "#9CA3AF" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Programs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {FUNDING_PROGRAMS.map((program) => (
            <div key={program.id} className="rounded-2xl overflow-hidden border" style={{ background: "#1F2937", borderColor: "rgba(55,65,81,0.5)" }}>
              {/* Program Header */}
              <div className="p-6 border-b" style={{ borderColor: "#374151", background: "linear-gradient(135deg, rgba(0,30,108,0.5), rgba(0,51,173,0.3))" }}>
                <div className="flex items-start gap-4">
                  <img src={program.logo} alt={program.organization} className="w-14 h-14 rounded-xl" style={{ background: "#374151" }} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-bold text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{program.name}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{
                        background: program.status === "active" ? "rgba(34,197,94,0.2)" : "rgba(107,114,128,0.2)",
                        color: program.status === "active" ? "#22C55E" : "#9CA3AF"
                      }}>
                        {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
                      </span>
                    </div>
                    <p style={{ color: "#9CA3AF" }} className="text-sm">{program.organization}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{formatADA(program.fundingPool)}</p>
                    <p className="text-xs" style={{ color: "#9CA3AF" }}>Total Pool</p>
                  </div>
                </div>
              </div>

              {/* Program Body */}
              <div className="p-6">
                <p style={{ color: "#9CA3AF" }} className="text-sm mb-6 leading-relaxed">{program.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="rounded-xl p-3 border" style={{ background: "rgba(55,65,81,0.3)", borderColor: "#374151" }}>
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar size={14} style={{ color: "#4DA6FF" }} />
                      <span className="text-xs" style={{ color: "#9CA3AF" }}>Deadline</span>
                    </div>
                    <p className="text-white font-medium text-sm">{program.deadline}</p>
                  </div>
                  <div className="rounded-xl p-3 border" style={{ background: "rgba(55,65,81,0.3)", borderColor: "#374151" }}>
                    <div className="flex items-center gap-2 mb-1">
                      <Users size={14} style={{ color: "#4DA6FF" }} />
                      <span className="text-xs" style={{ color: "#9CA3AF" }}>Applicants</span>
                    </div>
                    <p className="text-white font-medium text-sm">{program.applicants.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-xs font-medium mb-2" style={{ color: "#9CA3AF" }}>ELIGIBILITY</p>
                  <p className="text-sm text-white">{program.eligibility}</p>
                </div>

                <div className="flex gap-3">
                  {applied.has(program.id) ? (
                    <button className="flex-1 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 cursor-default"
                      style={{ background: "rgba(34,197,94,0.2)", color: "#22C55E", border: "1px solid rgba(34,197,94,0.3)" }}>
                      <CheckCircle size={16} /> Applied Successfully
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApply(program.id)}
                      disabled={applying === program.id || program.status !== "active"}
                      className="flex-1 py-3 rounded-xl text-sm font-medium text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-60"
                      style={{ background: "linear-gradient(135deg, #0033AD, #00C6FF)" }}
                    >
                      {applying === program.id ? "Submitting..." : "Apply Now"}
                      {applying !== program.id && <ArrowRight size={16} />}
                    </button>
                  )}
                  <button className="px-4 py-3 rounded-xl text-sm font-medium border transition-all hover:bg-white/5"
                    style={{ borderColor: "#374151", color: "#9CA3AF" }}>
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
