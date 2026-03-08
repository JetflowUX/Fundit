"use client";
import { useState } from "react";
import Link from "next/link";
import { BookOpen, Megaphone, Calendar, MessageSquare, ArrowRight } from "lucide-react";
import { COMMUNITY_POSTS } from "@/lib/data";

const tabs = [
  { id: "all", label: "All", icon: <BookOpen size={16} /> },
  { id: "guide", label: "Guides", icon: <BookOpen size={16} /> },
  { id: "announcement", label: "Announcements", icon: <Megaphone size={16} /> },
  { id: "event", label: "Events", icon: <Calendar size={16} /> },
  { id: "article", label: "Articles", icon: <MessageSquare size={16} /> },
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filtered = activeTab === "all"
    ? COMMUNITY_POSTS
    : COMMUNITY_POSTS.filter((p) => p.type === activeTab);

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0A0F1F 0%, #001E6C 30%, #0A0F1F 100%)" }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Community Hub
          </h1>
          <p style={{ color: "#9CA3AF" }} className="text-lg mb-8">
            Learn, connect, and stay updated with the Cardano ecosystem
          </p>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: <BookOpen size={20} />, label: "Tutorials", count: "120+" },
              { icon: <Megaphone size={20} />, label: "Announcements", count: "45" },
              { icon: <Calendar size={20} />, label: "Events", count: "12" },
              { icon: <MessageSquare size={20} />, label: "Discussions", count: "890+" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl p-4 border flex items-center gap-3 cursor-pointer hover:bg-white/5 transition-all"
                style={{ background: "rgba(31,41,55,0.5)", borderColor: "rgba(55,65,81,0.3)" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,51,173,0.3)", color: "#4DA6FF" }}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{item.label}</p>
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>{item.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all"
              style={{
                background: activeTab === tab.id ? "linear-gradient(135deg, #0033AD, #00C6FF)" : "#1F2937",
                color: activeTab === tab.id ? "white" : "#9CA3AF",
                border: activeTab === tab.id ? "none" : "1px solid #374151",
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        {filtered[0] && (
          <div className="rounded-2xl overflow-hidden border mb-8 group cursor-pointer card-hover" style={{ background: "#1F2937", borderColor: "rgba(55,65,81,0.5)" }}>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {filtered[0].image && (
                <div className="h-64 lg:h-full overflow-hidden">
                  <img src={filtered[0].image} alt={filtered[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: "rgba(0,51,173,0.3)", color: "#4DA6FF" }}>
                    Featured
                  </span>
                  <span className="text-xs" style={{ color: "#9CA3AF" }}>{filtered[0].readTime}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{filtered[0].title}</h2>
                <p className="mb-4 line-clamp-3" style={{ color: "#9CA3AF" }}>{filtered[0].content}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={filtered[0].avatar} alt={filtered[0].author} className="w-8 h-8 rounded-full" style={{ background: "#374151" }} />
                    <span className="text-sm text-white">{filtered[0].author}</span>
                    <span className="text-xs" style={{ color: "#374151" }}>•</span>
                    <span className="text-sm" style={{ color: "#9CA3AF" }}>{filtered[0].date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm" style={{ color: "#4DA6FF" }}>
                    Read more <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.slice(1).map((post) => (
            <div key={post.id} className="rounded-2xl overflow-hidden border card-hover group cursor-pointer" style={{ background: "#1F2937", borderColor: "rgba(55,65,81,0.5)" }}>
              {post.image && (
                <div className="h-48 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{
                    background: post.type === "guide" ? "rgba(168,85,247,0.2)" : post.type === "announcement" ? "rgba(59,130,246,0.2)" : post.type === "event" ? "rgba(34,197,94,0.2)" : "rgba(107,114,128,0.2)",
                    color: post.type === "guide" ? "#c084fc" : post.type === "announcement" ? "#60a5fa" : post.type === "event" ? "#4ade80" : "#9ca3af"
                  }}>
                    {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                  </span>
                  <span className="text-xs" style={{ color: "#9CA3AF" }}>{post.category}</span>
                  <span className="text-xs ml-auto" style={{ color: "#9CA3AF" }}>{post.readTime}</span>
                </div>
                <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-[#4DA6FF] transition-colors" style={{ fontSize: "0.95rem" }}>{post.title}</h3>
                <p className="text-sm line-clamp-2 mb-4" style={{ color: "#9CA3AF" }}>{post.content}</p>
                <div className="flex items-center gap-2">
                  <img src={post.avatar} alt={post.author} className="w-6 h-6 rounded-full" style={{ background: "#374151" }} />
                  <span className="text-xs" style={{ color: "#9CA3AF" }}>{post.author}</span>
                  <span className="text-xs" style={{ color: "#374151" }}>•</span>
                  <span className="text-xs" style={{ color: "#9CA3AF" }}>{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
