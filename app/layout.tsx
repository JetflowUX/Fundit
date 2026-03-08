import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Fundit - Cardano Ecosystem Funding Platform",
  description: "Discover, fund, and build projects in the Cardano ecosystem. Connect with builders, track milestones, and shape the future of decentralized finance.",
  keywords: "Cardano, ADA, Web3, funding, blockchain, DeFi, community",
  openGraph: {
    title: "Fundit - Cardano Ecosystem Funding Platform",
    description: "Discover, fund, and build projects in the Cardano ecosystem.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0A0F1F] text-white min-h-screen">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
