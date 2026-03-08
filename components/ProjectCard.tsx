import Link from "next/link";
import { Star, Users, TrendingUp } from "lucide-react";
import { Project, CATEGORY_COLORS, STATUS_COLORS, formatADA, getFundingPercentage } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const fundingPct = getFundingPercentage(project.fundingRaised, project.fundingGoal);

  return (
    <Link href={`/projects/${project.id}`}>
      <div className="bg-[#1F2937] rounded-[16px] overflow-hidden border border-[#374151]/50 card-hover cursor-pointer group">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937] via-transparent to-transparent" />
          <div className="absolute top-3 left-3">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${CATEGORY_COLORS[project.category] || "bg-gray-500/20 text-gray-400"}`}>
              {project.category}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_COLORS[project.status]}`}>
              {project.status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-[#4DA6FF] transition-colors line-clamp-1">
            {project.name}
          </h3>
          <p className="text-[#9CA3AF] text-sm mb-4 line-clamp-2">{project.shortDescription}</p>

          {/* Funding Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white font-medium">{formatADA(project.fundingRaised)}</span>
              <span className="text-[#9CA3AF]">{fundingPct}% of {formatADA(project.fundingGoal)}</span>
            </div>
            <div className="h-2 bg-[#374151] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${fundingPct}%`,
                  background: "linear-gradient(90deg, #0033AD, #00C6FF)",
                }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between pt-4 border-t border-[#374151]/50">
            <div className="flex items-center gap-1 text-[#9CA3AF] text-sm">
              <Users size={14} />
              <span>{project.supportersCount.toLocaleString()} supporters</span>
            </div>
            <div className="flex items-center gap-1 text-[#FACC15] text-sm">
              <Star size={14} fill="currentColor" />
              <span>{project.rating.toFixed(1)}</span>
              <span className="text-[#9CA3AF]">({project.reviewCount})</span>
            </div>
            {fundingPct >= 100 && (
              <div className="flex items-center gap-1 text-[#22C55E] text-sm">
                <TrendingUp size={14} />
                <span>Funded!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
