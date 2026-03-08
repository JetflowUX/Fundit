export type ProjectStatus = "Idea" | "Building" | "Live" | "Completed";
export type ProjectCategory = "DeFi" | "Education" | "Infrastructure" | "NFT" | "Community" | "Gaming" | "Governance";

export interface Milestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Update {
  id: string;
  title: string;
  content: string;
  date: string;
  type: "development" | "funding" | "announcement";
}

export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: ProjectCategory;
  status: ProjectStatus;
  fundingGoal: number;
  fundingRaised: number;
  supportersCount: number;
  createdAt: string;
  image: string;
  team: TeamMember[];
  milestones: Milestone[];
  reviews: Review[];
  updates: Update[];
  tags: string[];
  github?: string;
  website?: string;
  twitter?: string;
  walletAddress: string;
  rating: number;
  reviewCount: number;
  completionPercentage: number;
}

export interface FundingProgram {
  id: string;
  name: string;
  organization: string;
  description: string;
  fundingPool: number;
  deadline: string;
  eligibility: string;
  category: string;
  status: "active" | "closed" | "upcoming";
  applicants: number;
  logo: string;
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: string;
  avatar: string;
  date: string;
  type: "article" | "guide" | "announcement" | "event";
  category: string;
  readTime: string;
  image?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "1",
    name: "CardaSwap DEX",
    shortDescription: "A decentralized exchange built natively on Cardano with MEV protection and optimal liquidity routing.",
    fullDescription: "CardaSwap is a next-generation decentralized exchange built entirely on Cardano's eUTxO model. It features MEV protection, advanced liquidity routing, concentrated liquidity positions, and seamless integration with major Cardano wallets. Our protocol leverages Plutus smart contracts for secure, trustless trading.",
    category: "DeFi",
    status: "Building",
    fundingGoal: 150000,
    fundingRaised: 87500,
    supportersCount: 342,
    createdAt: "2024-01-15",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    team: [
      { name: "Alex Chen", role: "Lead Developer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex" },
      { name: "Maria Santos", role: "Smart Contract Engineer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria" },
      { name: "James Wilson", role: "Frontend Dev", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james" },
    ],
    milestones: [
      { id: "m1", title: "Smart Contract Development", description: "Complete core DEX smart contracts", completed: true, dueDate: "2024-03-01" },
      { id: "m2", title: "Security Audit", description: "Third-party security audit", completed: true, dueDate: "2024-04-15" },
      { id: "m3", title: "Testnet Launch", description: "Launch on Cardano testnet", completed: false, dueDate: "2024-06-01" },
      { id: "m4", title: "Mainnet Launch", description: "Full mainnet deployment", completed: false, dueDate: "2024-09-01" },
    ],
    reviews: [
      { id: "r1", author: "CryptoBuilder", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=crypto", rating: 5, comment: "Incredible team and vision. The MEV protection alone makes this worth backing.", date: "2024-02-10" },
      { id: "r2", author: "ADAInvestor", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ada", rating: 4, comment: "Strong technical approach. Looking forward to the testnet launch.", date: "2024-02-15" },
    ],
    updates: [
      { id: "u1", title: "Smart Contracts Complete", content: "We have successfully completed all core smart contracts and are now preparing for the security audit.", date: "2024-02-20", type: "development" },
      { id: "u2", title: "Funding Milestone Reached", content: "We have raised over 50% of our funding goal! Thank you to all our amazing supporters.", date: "2024-02-25", type: "funding" },
    ],
    tags: ["DEX", "Liquidity", "Trading"],
    github: "https://github.com/cardaswap",
    website: "https://cardaswap.io",
    twitter: "https://twitter.com/cardaswap",
    walletAddress: "addr1qx8z7...",
    rating: 4.7,
    reviewCount: 28,
    completionPercentage: 45,
  },
  {
    id: "2",
    name: "EduChain Academy",
    shortDescription: "Blockchain-verified educational credentials and Web3 learning platform for the Cardano ecosystem.",
    fullDescription: "EduChain Academy is revolutionizing education through blockchain-verified credentials. Students earn NFT certificates that are permanently recorded on Cardano, creating an immutable record of achievements. Our platform offers courses on DeFi, smart contracts, and Cardano development.",
    category: "Education",
    status: "Live",
    fundingGoal: 80000,
    fundingRaised: 80000,
    supportersCount: 521,
    createdAt: "2023-11-01",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80",
    team: [
      { name: "Sarah Kim", role: "Founder & CEO", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah" },
      { name: "David Park", role: "Curriculum Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david" },
    ],
    milestones: [
      { id: "m1", title: "Platform Development", description: "Build the core learning platform", completed: true, dueDate: "2024-01-01" },
      { id: "m2", title: "Course Content", description: "Create 50+ courses", completed: true, dueDate: "2024-02-01" },
      { id: "m3", title: "NFT Certificates", description: "Launch credential NFT system", completed: true, dueDate: "2024-03-01" },
      { id: "m4", title: "Community Launch", description: "Open to all learners", completed: false, dueDate: "2024-05-01" },
    ],
    reviews: [
      { id: "r1", author: "LearnWithADA", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=learn", rating: 5, comment: "The best place to learn about Cardano development. Highly recommend!", date: "2024-01-20" },
    ],
    updates: [
      { id: "u1", title: "Platform Launch Announced", content: "EduChain Academy is now live! Sign up and start earning blockchain-verified credentials.", date: "2024-03-01", type: "announcement" },
    ],
    tags: ["Education", "NFT Certificates", "Learning"],
    website: "https://educhain.io",
    twitter: "https://twitter.com/educhain",
    walletAddress: "addr1qy9k2...",
    rating: 4.9,
    reviewCount: 64,
    completionPercentage: 85,
  },
  {
    id: "3",
    name: "CardanoBridge",
    shortDescription: "Cross-chain bridge infrastructure connecting Cardano with Ethereum and Solana ecosystems.",
    fullDescription: "CardanoBridge provides secure, decentralized bridging infrastructure connecting Cardano with other major blockchain networks. Using advanced cryptographic techniques and multi-party computation, we enable seamless asset transfers while maintaining Cardano's security guarantees.",
    category: "Infrastructure",
    status: "Building",
    fundingGoal: 250000,
    fundingRaised: 125000,
    supportersCount: 187,
    createdAt: "2024-02-01",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    team: [
      { name: "Michael Torres", role: "Protocol Engineer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael" },
      { name: "Emma Johnson", role: "Cryptographer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma" },
    ],
    milestones: [
      { id: "m1", title: "Protocol Design", description: "Finalize bridge protocol architecture", completed: true, dueDate: "2024-03-01" },
      { id: "m2", title: "ETH Bridge MVP", description: "Cardano-Ethereum bridge MVP", completed: false, dueDate: "2024-07-01" },
      { id: "m3", title: "Solana Bridge", description: "Add Solana support", completed: false, dueDate: "2024-10-01" },
    ],
    reviews: [
      { id: "r1", author: "BridgeBuilder", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bridge", rating: 4, comment: "Solid technical foundation. The multi-party computation approach is innovative.", date: "2024-02-28" },
    ],
    updates: [
      { id: "u1", title: "Protocol Design Finalized", content: "We have completed the bridge protocol architecture and published our whitepaper.", date: "2024-03-01", type: "development" },
    ],
    tags: ["Bridge", "Cross-chain", "Infrastructure"],
    github: "https://github.com/cardanobridge",
    website: "https://cardanobridge.io",
    walletAddress: "addr1qz7m3...",
    rating: 4.2,
    reviewCount: 19,
    completionPercentage: 30,
  },
  {
    id: "4",
    name: "ADA NFT Marketplace",
    shortDescription: "The premier NFT marketplace for Cardano with royalty enforcement and creator tools.",
    fullDescription: "A fully decentralized NFT marketplace built on Cardano with smart contract-enforced royalties, creator analytics, collection management tools, and support for all major Cardano NFT standards including CIP-25 and CIP-68.",
    category: "NFT",
    status: "Live",
    fundingGoal: 60000,
    fundingRaised: 60000,
    supportersCount: 892,
    createdAt: "2023-08-15",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    team: [
      { name: "Lisa Chang", role: "Product Lead", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa" },
      { name: "Ryan Moore", role: "Smart Contract Dev", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ryan" },
    ],
    milestones: [
      { id: "m1", title: "Core Marketplace", description: "Launch basic buy/sell functionality", completed: true, dueDate: "2023-10-01" },
      { id: "m2", title: "Royalty System", description: "Smart contract royalty enforcement", completed: true, dueDate: "2023-12-01" },
      { id: "m3", title: "Creator Tools", description: "Advanced creator dashboard", completed: true, dueDate: "2024-02-01" },
      { id: "m4", title: "Mobile App", description: "iOS and Android apps", completed: false, dueDate: "2024-06-01" },
    ],
    reviews: [
      { id: "r1", author: "NFTCollector", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=nft", rating: 5, comment: "Best NFT marketplace on Cardano. The royalty enforcement is a game changer!", date: "2024-01-15" },
      { id: "r2", author: "DigitalArtist", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=artist", rating: 5, comment: "Finally a marketplace that respects creator royalties. Love the tools.", date: "2024-01-20" },
    ],
    updates: [
      { id: "u1", title: "1 Million ADA Traded!", content: "We have surpassed 1 million ADA in total trading volume. Thank you to our amazing community!", date: "2024-02-15", type: "announcement" },
    ],
    tags: ["NFT", "Marketplace", "Creator Economy"],
    website: "https://adanft.io",
    twitter: "https://twitter.com/adanft",
    walletAddress: "addr1qw4p1...",
    rating: 4.8,
    reviewCount: 156,
    completionPercentage: 90,
  },
  {
    id: "5",
    name: "CardaGov",
    shortDescription: "On-chain governance framework for Cardano DAOs with delegation and treasury management.",
    fullDescription: "CardaGov provides comprehensive DAO governance infrastructure for the Cardano ecosystem. Features include on-chain voting, treasury management, delegation systems, proposal creation, and integration with Cardano's native governance features via CIP-1694.",
    category: "Governance",
    status: "Idea",
    fundingGoal: 100000,
    fundingRaised: 12500,
    supportersCount: 78,
    createdAt: "2024-02-20",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80",
    team: [
      { name: "Tom Henderson", role: "Governance Researcher", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tom" },
    ],
    milestones: [
      { id: "m1", title: "Research & Design", description: "Governance model research and design", completed: false, dueDate: "2024-05-01" },
      { id: "m2", title: "Smart Contracts", description: "Core governance contracts", completed: false, dueDate: "2024-08-01" },
    ],
    reviews: [],
    updates: [
      { id: "u1", title: "Project Announced", content: "We are excited to announce CardaGov, bringing robust on-chain governance to Cardano DAOs.", date: "2024-02-20", type: "announcement" },
    ],
    tags: ["DAO", "Governance", "Voting"],
    github: "https://github.com/cardagov",
    walletAddress: "addr1qr8s2...",
    rating: 4.0,
    reviewCount: 5,
    completionPercentage: 5,
  },
  {
    id: "6",
    name: "Cardano Gaming Hub",
    shortDescription: "The ultimate gaming platform for blockchain games built on Cardano with play-to-earn mechanics.",
    fullDescription: "A unified gaming ecosystem on Cardano featuring play-to-earn mechanics, NFT game assets, tournament infrastructure, and developer tools for building blockchain games. Our SDK makes it easy for game developers to integrate Cardano functionality.",
    category: "Community",
    status: "Building",
    fundingGoal: 120000,
    fundingRaised: 67000,
    supportersCount: 445,
    createdAt: "2024-01-01",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    team: [
      { name: "Nick Rodriguez", role: "Game Developer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=nick" },
      { name: "Ana Silva", role: "UX Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ana" },
    ],
    milestones: [
      { id: "m1", title: "SDK Development", description: "Build the developer SDK", completed: true, dueDate: "2024-03-01" },
      { id: "m2", title: "First Game Launch", description: "Launch first native Cardano game", completed: false, dueDate: "2024-06-01" },
      { id: "m3", title: "Tournament System", description: "Build tournament infrastructure", completed: false, dueDate: "2024-09-01" },
    ],
    reviews: [
      { id: "r1", author: "GamerADA", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gamer", rating: 4, comment: "Love the vision. The SDK is well-designed and easy to use.", date: "2024-02-01" },
    ],
    updates: [
      { id: "u1", title: "SDK Alpha Released", content: "Our developer SDK is now available for alpha testing. Early access partners can apply now!", date: "2024-03-05", type: "development" },
    ],
    tags: ["Gaming", "Play-to-Earn", "SDK"],
    website: "https://cardanogaming.io",
    twitter: "https://twitter.com/cardanogaming",
    walletAddress: "addr1qp5n7...",
    rating: 4.3,
    reviewCount: 32,
    completionPercentage: 40,
  },
];

export const FUNDING_PROGRAMS: FundingProgram[] = [
  {
    id: "1",
    name: "Cardano Ecosystem Grants 2024",
    organization: "Cardano Foundation",
    description: "The Cardano Foundation's flagship grant program supporting innovative projects building on Cardano. Open to developers, researchers, and entrepreneurs.",
    fundingPool: 2000000,
    deadline: "2024-06-30",
    eligibility: "Open to all teams building on Cardano",
    category: "General",
    status: "active",
    applicants: 234,
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=cardano",
  },
  {
    id: "2",
    name: "DeFi Developer Accelerator",
    organization: "Input Output Global",
    description: "IOG's accelerator program for DeFi projects building on Cardano. Includes funding, mentorship, and technical support from the Cardano core team.",
    fundingPool: 5000000,
    deadline: "2024-05-15",
    eligibility: "DeFi projects in development or early stage",
    category: "DeFi",
    status: "active",
    applicants: 89,
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=iog",
  },
  {
    id: "3",
    name: "Community Innovation Fund",
    organization: "Intersect MBO",
    description: "Community-governed fund for projects that bring value to the Cardano ecosystem. Voted on by ADA holders through on-chain governance.",
    fundingPool: 1000000,
    deadline: "2024-07-01",
    eligibility: "Any community project beneficial to Cardano",
    category: "Community",
    status: "active",
    applicants: 412,
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=intersect",
  },
  {
    id: "4",
    name: "NFT & Creator Economy Grant",
    organization: "NMKR",
    description: "Supporting creators building NFT projects, marketplaces, and creator tools on Cardano. Special focus on digital art and creative applications.",
    fundingPool: 500000,
    deadline: "2024-05-31",
    eligibility: "NFT projects and creator tools",
    category: "NFT",
    status: "active",
    applicants: 156,
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=nmkr",
  },
];

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "1",
    title: "Understanding Cardano's eUTxO Model: A Deep Dive",
    content: "Cardano uses the Extended Unspent Transaction Output (eUTxO) model, which combines Bitcoin's UTXO model with the ability to store arbitrary data...",
    author: "CardanoExplorer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=explorer",
    date: "2024-03-01",
    type: "guide",
    category: "Education",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
  },
  {
    id: "2",
    title: "Cardano Summit 2024: What to Expect",
    content: "The annual Cardano Summit is approaching, and the community is buzzing with excitement. This year's event promises major announcements...",
    author: "CommunityLead",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lead",
    date: "2024-02-28",
    type: "announcement",
    category: "Events",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  },
  {
    id: "3",
    title: "Building Your First Plutus Smart Contract",
    content: "This tutorial will walk you through building your first smart contract on Cardano using the Plutus programming language...",
    author: "DevMentor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mentor",
    date: "2024-02-25",
    type: "guide",
    category: "Development",
    readTime: "15 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  },
  {
    id: "4",
    title: "Cardano TVL Reaches New All-Time High",
    content: "The total value locked (TVL) in Cardano DeFi protocols has reached a new all-time high, surpassing $500 million...",
    author: "DeFiAnalyst",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=analyst",
    date: "2024-02-20",
    type: "article",
    category: "News",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
  },
  {
    id: "5",
    title: "Cardano Developer Hackathon - Register Now!",
    content: "Join us for a 48-hour hackathon focused on building the future of Cardano. Prizes totaling 100,000 ADA await the best projects...",
    author: "HackathonOrg",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=hack",
    date: "2024-02-15",
    type: "event",
    category: "Events",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
  },
  {
    id: "6",
    title: "Getting Started with Cardano Wallet Integration",
    content: "Learn how to integrate Cardano wallets like Nami, Eternl, and Lace into your web application using the CIP-30 standard...",
    author: "WalletDev",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=wallet",
    date: "2024-02-10",
    type: "guide",
    category: "Development",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800&q=80",
  },
];

export const CATEGORY_COLORS: Record<string, string> = {
  DeFi: "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30",
  Education: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
  Infrastructure: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  NFT: "bg-pink-500/20 text-pink-400 border border-pink-500/30",
  Community: "bg-green-500/20 text-green-400 border border-green-500/30",
  Gaming: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
  Governance: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
};

export const STATUS_COLORS: Record<ProjectStatus, string> = {
  Idea: "bg-yellow-500/20 text-yellow-400",
  Building: "bg-blue-500/20 text-blue-400",
  Live: "bg-green-500/20 text-green-400",
  Completed: "bg-gray-500/20 text-gray-400",
};

export function formatADA(amount: number): string {
  if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}M ₳`;
  if (amount >= 1000) return `${(amount / 1000).toFixed(1)}K ₳`;
  return `${amount.toLocaleString()} ₳`;
}

export function getFundingPercentage(raised: number, goal: number): number {
  return Math.min(Math.round((raised / goal) * 100), 100);
}
