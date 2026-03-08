"use client";
import { useState } from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS, ProjectCategory, ProjectStatus } from "@/lib/data";

const categories: (ProjectCategory | "All")[] = ["All", "DeFi", "Education", "Infrastructure", "NFT", "Community", "Governance"];
const statuses: (ProjectStatus | "All")[] = ["All", "Idea", "Building", "Live", "Completed"];
const sortOptions = ["Trending", "Recently Launched", "Highest Rated", "Most Funded", "Most Supporters"];

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [status, setStatus] = useState<string>("All");
  const [sort, setSort] = useState("Trending");

  const filtered = PROJECTS.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || p.category === category;
    const matchStatus = status === "All" || p.status === status;
    return matchSearch && matchCategory && matchStatus;
  }).sort((a, b) => {
    if (sort === "Highest Rated") return b.rating - a.rating;
    if (sort === "Most Funded") return b.fundingRaised - a.fundingRaised;
    if (sort === "Most Supporters") return b.supportersCount - a.supportersCount;
    return 0;
  });

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0A0F1F 0%, #001E6C 30%, #0A0F1F 100%)" }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Explore Projects
          </h1>
          <p style={{ color: "#9CA3AF" }} className="text-lg mb-8">
            Discover and support innovative projects building the Cardano ecosystem
          </p>

          {/* Search */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2" size={20} style={{ color: "#9CA3AF" }} />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl text-white placeholder-gray-500 border focus:outline-none focus:border-blue-500"
              style={{ background: "rgba(31,41,55,0.8)", borderColor: "#374151" }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Category Filter */}
          <div className="flex-1">
            <p className="text-sm font-medium mb-3" style={{ color: "#9CA3AF" }}>Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: category === cat ? "linear-gradient(135deg, #0033AD, #00C6FF)" : "rgba(31,41,55,1)",
                    color: category === cat ? "white" : "#9CA3AF",
                    border: category === cat ? "none" : "1px solid #374151",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <p className="text-sm font-medium mb-3" style={{ color: "#9CA3AF" }}>Status</p>
            <div className="flex flex-wrap gap-2">
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: status === s ? "rgba(0,51,173,0.3)" : "rgba(31,41,55,1)",
                    color: status === s ? "#4DA6FF" : "#9CA3AF",
                    border: status === s ? "1px solid rgba(0,51,173,0.5)" : "1px solid #374151",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <p className="text-sm font-medium mb-3" style={{ color: "#9CA3AF" }}>Sort by</p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 rounded-lg text-sm text-white border focus:outline-none"
              style={{ background: "#1F2937", borderColor: "#374151" }}
            >
              {sortOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p style={{ color: "#9CA3AF" }} className="text-sm">
            Showing <span className="text-white font-medium">{filtered.length}</span> projects
          </p>
          <div className="flex items-center gap-2" style={{ color: "#9CA3AF" }}>
            <SlidersHorizontal size={16} />
            <span className="text-sm">Filters applied</span>
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Filter size={48} style={{ color: "#374151" }} className="mx-auto mb-4" />
            <h3 className="text-white font-semibold text-xl mb-2">No projects found</h3>
            <p style={{ color: "#9CA3AF" }}>Try adjusting your filters or search term</p>
          </div>
        )}
      </div>
    </div>
  );
}
