# Fundit - Cardano Ecosystem Funding Platform

Fundit is a modern, responsive Web3 application for funding, discovering, and building projects within the Cardano ecosystem. Inspired by platforms like Karma HQ and Gitcoin, Fundit is purpose-built for the Cardano community.

![Fundit Screenshot](https://github.com/user-attachments/assets/09e2f4fa-4adb-4d62-bbe1-a888729f5f36)

## Features

- **Project Discovery** — Explore Cardano projects with category, status, and sort filters
- **Project Funding** — Support projects with ADA donations and track funding progress
- **Funding Programs** — Apply to ecosystem grants from Cardano Foundation, IOG, and Intersect MBO
- **Community Hub** — Tutorials, announcements, events, and ecosystem news
- **Project Creation** — 4-step wizard to launch and showcase projects with milestones
- **User Dashboard** — Track funded projects, manage created projects, view activity
- **Wallet Authentication** — Connect with Lace, Nami, or Eternl wallets (CIP-30)
- **Reputation System** — Community reviews, ratings, and credibility scores

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS v4, Inter & Space Grotesk fonts
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Design System

Colors follow the Cardano brand identity:
- **Cardano Blue:** `#0033AD`
- **Cardano Cyan:** `#00C6FF`
- **Dark Background:** `#0A0F1F`
- **Card Background:** `#1F2937`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, featured projects, and funding programs |
| `/explore` | Browse and filter all projects |
| `/projects/[id]` | Project detail with funding, milestones, and reviews |
| `/programs` | Active funding programs from Cardano organizations |
| `/community` | Articles, guides, announcements, and events |
| `/dashboard` | User dashboard for managing projects and funding |
| `/create-project` | 4-step project creation wizard |
| `/auth/login` | Sign in with email or Cardano wallet |
| `/auth/signup` | Create a new account |

## Wallet Support

Supports all major Cardano wallets via CIP-30:
- [Lace Wallet](https://www.lace.io/)
- [Nami Wallet](https://namiwallet.io/)
- [Eternl Wallet](https://eternl.io/)

## Build

```bash
npm run build
npm run start
```
