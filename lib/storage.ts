/**
 * Local Storage Utilities
 * Manages user data, projects, and transactions
 */

export interface UserProfile {
  walletAddress: string;
  username?: string;
  bio?: string;
  avatar?: string;
  joinedDate: string;
  projectsCreated: string[];
  projectsFunded: string[];
  totalContributed: number;
  reputation: number;
}

export interface ProjectTransaction {
  id: string;
  projectId: string;
  from: string;
  amount: number;
  txHash: string;
  timestamp: string;
}

export interface ProjectReview {
  id: string;
  projectId: string;
  author: string;
  authorAddress: string;
  rating: number;
  comment: string;
  timestamp: string;
}

const STORAGE_KEYS = {
  USER_PROFILE: "fundit_user_profile",
  TRANSACTIONS: "fundit_transactions",
  REVIEWS: "fundit_reviews",
  CREATED_PROJECTS: "fundit_created_projects",
};

// User Profile Management
export function getUserProfile(walletAddress: string): UserProfile | null {
  if (typeof window === "undefined") return null;
  
  const profiles = JSON.parse(
    localStorage.getItem(STORAGE_KEYS.USER_PROFILE) || "{}"
  );
  
  return profiles[walletAddress] || null;
}

export function saveUserProfile(profile: UserProfile): void {
  if (typeof window === "undefined") return;
  
  const profiles = JSON.parse(
    localStorage.getItem(STORAGE_KEYS.USER_PROFILE) || "{}"
  );
  
  profiles[profile.walletAddress] = profile;
  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profiles));
}

export function createUserProfile(walletAddress: string): UserProfile {
  const profile: UserProfile = {
    walletAddress,
    joinedDate: new Date().toISOString(),
    projectsCreated: [],
    projectsFunded: [],
    totalContributed: 0,
    reputation: 0,
  };
  
  saveUserProfile(profile);
  return profile;
}

export function getOrCreateUserProfile(walletAddress: string): UserProfile {
  return getUserProfile(walletAddress) || createUserProfile(walletAddress);
}

// Transaction Management
export function saveTransaction(transaction: ProjectTransaction): void {
  if (typeof window === "undefined") return;
  
  const transactions = getAllTransactions();
  transactions.push(transaction);
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
}

export function getAllTransactions(): ProjectTransaction[] {
  if (typeof window === "undefined") return [];
  
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.TRANSACTIONS) || "[]");
}

export function getTransactionsByProject(projectId: string): ProjectTransaction[] {
  return getAllTransactions().filter((tx) => tx.projectId === projectId);
}

export function getTransactionsByUser(walletAddress: string): ProjectTransaction[] {
  return getAllTransactions().filter((tx) => tx.from === walletAddress);
}

// Review Management
export function saveReview(review: ProjectReview): void {
  if (typeof window === "undefined") return;
  
  const reviews = getAllReviews();
  reviews.push(review);
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
}

export function getAllReviews(): ProjectReview[] {
  if (typeof window === "undefined") return [];
  
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS) || "[]");
}

export function getReviewsByProject(projectId: string): ProjectReview[] {
  return getAllReviews().filter((review) => review.projectId === projectId);
}

export function getUserReviewForProject(
  projectId: string,
  walletAddress: string
): ProjectReview | null {
  const reviews = getReviewsByProject(projectId);
  return reviews.find((r) => r.authorAddress === walletAddress) || null;
}

// Project Management
export function saveCreatedProject(projectData: any): string {
  if (typeof window === "undefined") return "";
  
  const projects = JSON.parse(
    localStorage.getItem(STORAGE_KEYS.CREATED_PROJECTS) || "[]"
  );
  
  const projectId = `project_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const project = {
    ...projectData,
    id: projectId,
    createdAt: new Date().toISOString(),
    currentFunding: 0,
    supportersCount: 0,
  };
  
  projects.push(project);
  localStorage.setItem(STORAGE_KEYS.CREATED_PROJECTS, JSON.stringify(projects));
  
  return projectId;
}

export function getAllCreatedProjects(): any[] {
  if (typeof window === "undefined") return [];
  
  return JSON.parse(
    localStorage.getItem(STORAGE_KEYS.CREATED_PROJECTS) || "[]"
  );
}

export function getProjectById(projectId: string): any | null {
  const projects = getAllCreatedProjects();
  return projects.find((p) => p.id === projectId) || null;
}

export function updateProjectFunding(
  projectId: string,
  additionalAmount: number
): void {
  if (typeof window === "undefined") return;
  
  const projects = getAllCreatedProjects();
  const projectIndex = projects.findIndex((p) => p.id === projectId);
  
  if (projectIndex !== -1) {
    projects[projectIndex].currentFunding =
      (projects[projectIndex].currentFunding || 0) + additionalAmount;
    projects[projectIndex].supportersCount =
      (projects[projectIndex].supportersCount || 0) + 1;
      
    localStorage.setItem(
      STORAGE_KEYS.CREATED_PROJECTS,
      JSON.stringify(projects)
    );
  }
}

// Statistics
export function getProjectStats(projectId: string) {
  const transactions = getTransactionsByProject(projectId);
  const reviews = getReviewsByProject(projectId);
  
  const totalRaised = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const supporters = new Set(transactions.map((tx) => tx.from)).size;
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;
  
  return {
    totalRaised,
    supporters,
    averageRating,
    reviewCount: reviews.length,
  };
}
