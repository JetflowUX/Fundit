"use client";
import { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, Users, Github, Globe, Twitter, CheckCircle, Circle, ArrowLeft, Heart, X, Loader2 } from "lucide-react";
import { PROJECTS, CATEGORY_COLORS, STATUS_COLORS, formatADA, getFundingPercentage } from "@/lib/data";
import { useWallet } from "@/lib/wallet-context";
import { sendADA } from "@/lib/transactions";
import {
  saveTransaction,
  saveReview,
  getProjectStats,
  getReviewsByProject,
  getUserReviewForProject,
  updateProjectFunding,
  type ProjectReview,
} from "@/lib/storage";

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = PROJECTS.find((p) => p.id === id);
  const { connected, walletAddress, walletApi, refreshBalance } = useWallet();
  
  const [showFundModal, setShowFundModal] = useState(false);
  const [fundAmount, setFundAmount] = useState("");
  const [funding, setFunding] = useState(false);
  const [fundSuccess, setFundSuccess] = useState(false);
  
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  
  const [projectReviews, setProjectReviews] = useState<ProjectReview[]>([]);
  const [userReview, setUserReview] = useState<ProjectReview | null>(null);
  const [stats, setStats] = useState({ totalRaised: 0, supporters: 0, averageRating: 0, reviewCount: 0 });

  if (!project) notFound();

  useEffect(() => {
    // Load project stats and reviews
    const loadedStats = getProjectStats(id);
    setStats(loadedStats);
    
    const reviews = getReviewsByProject(id);
    setProjectReviews(reviews);
    
    if (walletAddress) {
      const review = getUserReviewForProject(id, walletAddress);
      setUserReview(review);
    }
  }, [id, walletAddress]);

  const handleFund = async () => {
    if (!connected || !walletApi || !walletAddress) {
      alert("Please connect your wallet first");
      return;
    }

    const amount = parseFloat(fundAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setFunding(true);

    try {
      const result = await sendADA(walletApi, project.walletAddress, amount);
      
      if (result.success && result.txHash) {
        // Save transaction
        saveTransaction({
          id: result.txHash,
          projectId: id,
          from: walletAddress,
          amount,
          txHash: result.txHash,
          timestamp: new Date().toISOString(),
        });

        // Update project funding
        updateProjectFunding(id, amount);
        
        // Refresh stats
        const newStats = getProjectStats(id);
        setStats(newStats);
        
        // Refresh wallet balance
        await refreshBalance();
        
        setFundSuccess(true);
        setTimeout(() => {
          setShowFundModal(false);
          setFundSuccess(false);
          setFundAmount("");
        }, 2000);
      } else {
        alert(result.error || "Transaction failed");
      }
    } catch (error) {
      alert("Transaction failed. Please try again.");
    } finally {
      setFunding(false);
    }
  };

  const handleSubmitReview = () => {
    if (!connected || !walletAddress) {
      alert("Please connect your wallet first");
      return;
    }

    if (reviewComment.trim().length < 10) {
      alert("Please write a review with at least 10 characters");
      return;
    }

    setSubmittingReview(true);

    const review: ProjectReview = {
      id: `review_${Date.now()}`,
      projectId: id,
      author: walletAddress.substring(0, 16) + "...",
      authorAddress: walletAddress,
      rating: reviewRating,
      comment: reviewComment,
      timestamp: new Date().toISOString(),
    };

    saveReview(review);
    setProjectReviews([review, ...projectReviews]);
    setUserReview(review);
    
    // Update stats
    const newStats = getProjectStats(id);
    setStats(newStats);

    setSubmittingReview(false);
    setShowReviewModal(false);
    setReviewComment("");
    setReviewRating(5);
  };

  const fundingPct = getFundingPercentage(project.fundingRaised + stats.totalRaised, project.fundingGoal);
  const totalRaised = project.fundingRaised + stats.totalRaised;
  const totalSupporters = project.supportersCount + stats.supporters;
  const displayRating = stats.reviewCount > 0 ? stats.averageRating : project.rating;

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
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Community Reviews</h2>
                {connected && !userReview && (
                  <button
                    onClick={() => setShowReviewModal(true)}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #0033AD, #00C6FF)" }}
                  >
                    Write Review
                  </button>
                )}
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl font-bold text-white">{displayRating.toFixed(1)}</div>
                <div>
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} size={20} fill={s <= Math.round(displayRating) ? "#FACC15" : "none"} style={{ color: "#FACC15" }} />
                    ))}
                  </div>
                  <p className="text-sm" style={{ color: "#9CA3AF" }}>{stats.reviewCount + project.reviewCount} reviews</p>
                </div>
              </div>
              
              {userReview && (
                <div className="mb-4 rounded-xl p-4 border-2" style={{ background: "rgba(0,51,173,0.1)", borderColor: "#0033AD" }}>
                  <p className="text-xs font-medium mb-2" style={{ color: "#4DA6FF" }}>Your Review</p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} size={14} fill={s <= userReview.rating ? "#FACC15" : "none"} style={{ color: "#FACC15" }} />
                      ))}
                    </div>
                    <span className="text-xs" style={{ color: "#9CA3AF" }}>{new Date(userReview.timestamp).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-white">{userReview.comment}</p>
                </div>
              )}
              
              {projectReviews.length > 0 ? (
                <div className="space-y-4">
                  {projectReviews.map((review) => (
                    <div key={review.id} className="rounded-xl p-4 border" style={{ background: "rgba(55,65,81,0.3)", borderColor: "#374151" }}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #0033AD, #00C6FF)" }}>
                          {review.author.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="text-white font-medium text-sm font-mono">{review.author}</span>
                        <div className="flex gap-0.5 ml-auto">
                          {[1,2,3,4,5].map((s) => (
                            <Star key={s} size={14} fill={s <= review.rating ? "#FACC15" : "none"} style={{ color: "#FACC15" }} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm" style={{ color: "#9CA3AF" }}>{review.comment}</p>
                      <p className="text-xs mt-2" style={{ color: "#374151" }}>{new Date(review.timestamp).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              ) : null}
              
              {project.reviews.length > 0 && (
                <div className="space-y-4 mt-4">
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
              )}
              
              {projectReviews.length === 0 && project.reviews.length === 0 && (
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
                  <span className="text-2xl font-bold text-white">{formatADA(totalRaised)}</span>
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
                  <span className="flex items-center gap-1"><Users size={14} /> {totalSupporters.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => connected ? setShowFundModal(true) : alert("Please connect your wallet first")}
                className="w-full py-4 rounded-xl text-white font-semibold text-lg mb-3 transition-all hover:opacity-90 hover:scale-[1.02]"
                style={{ background: connected ? "linear-gradient(135deg, #0033AD, #00C6FF)" : "#374151" }}
              >
                {connected ? "Fund This Project ₳" : "Connect Wallet to Fund"}
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

      {/* Fund Modal */}
      {showFundModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => !funding && setShowFundModal(false)}>
          <div className="relative w-full max-w-md bg-[#1F2937] border border-[#374151] rounded-2xl p-6" onClick={(e) => e.stopPropagation()}>
            {!fundSuccess ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Fund {project.name}
                  </h2>
                  <button onClick={() => setShowFundModal(false)} className="p-1 hover:bg-white/10 rounded-lg transition-colors" disabled={funding}>
                    <X size={20} className="text-[#9CA3AF]" />
                  </button>
                </div>
                
                <div className="mb-4 p-4 rounded-xl" style={{ background: "rgba(0,51,173,0.1)", borderColor: "#0033AD" }}>
                  <p className="text-sm text-[#9CA3AF] mb-2">Recipient Address:</p>
                  <p className="text-xs font-mono text-white break-all">{project.walletAddress}</p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-white mb-2">Amount (₳)</label>
                  <input
                    type="number"
                    value={fundAmount}
                    onChange={(e) => setFundAmount(e.target.value)}
                    placeholder="Enter amount in ADA"
                    min="1"
                    step="1"
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 border focus:outline-none"
                    style={{ background: "#111827", borderColor: "#374151" }}
                    disabled={funding}
                  />
                  <p className="text-xs mt-2 text-[#9CA3AF]">Minimum: 1 ₳</p>
                </div>

                <button
                  onClick={handleFund}
                  disabled={funding || !fundAmount}
                  className="w-full py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg, #0033AD, #00C6FF)" }}
                >
                  {funding ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Fund ${fundAmount ? fundAmount + " ₳" : "Project"}`
                  )}
                </button>

                <p className="text-xs text-center mt-4 text-[#9CA3AF]">
                  ⚠️ This is a demo. No actual transaction will occur on the blockchain.
                </p>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(34,197,94,0.2)" }}>
                  <CheckCircle size={32} style={{ color: "#22C55E" }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Transaction Successful!</h3>
                <p className="text-sm text-[#9CA3AF]">Your contribution of {fundAmount} ₳ has been recorded.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => !submittingReview && setShowReviewModal(false)}>
          <div className="relative w-full max-w-md bg-[#1F2937] border border-[#374151] rounded-2xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Write a Review
              </h2>
              <button onClick={() => setShowReviewModal(false)} className="p-1 hover:bg-white/10 rounded-lg transition-colors" disabled={submittingReview}>
                <X size={20} className="text-[#9CA3AF]" />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setReviewRating(star)}
                    disabled={submittingReview}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      size={32}
                      fill={star <= reviewRating ? "#FACC15" : "none"}
                      style={{ color: "#FACC15" }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">Your Review</label>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Share your thoughts about this project..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 border focus:outline-none resize-none"
                style={{ background: "#111827", borderColor: "#374151" }}
                disabled={submittingReview}
              />
              <p className="text-xs mt-2 text-[#9CA3AF]">Minimum 10 characters</p>
            </div>

            <button
              onClick={handleSubmitReview}
              disabled={submittingReview || reviewComment.trim().length < 10}
              className="w-full py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #0033AD, #00C6FF)" }}
            >
              {submittingReview ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
