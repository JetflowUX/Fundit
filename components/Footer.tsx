import Link from "next/link";
import { Github, Twitter, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111827] border-t border-[#374151]/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0033AD] to-[#00C6FF] flex items-center justify-center">
                <span className="text-white font-bold text-sm font-display">F</span>
              </div>
              <span className="text-white font-bold text-xl font-display">
                Fun<span className="text-[#00C6FF]">dit</span>
              </span>
            </Link>
            <p className="text-[#9CA3AF] text-sm max-w-sm leading-relaxed">
              Fundit is the premier funding, discovery, and community platform for the Cardano ecosystem. 
              Empowering builders and connecting communities.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="p-2 text-[#9CA3AF] hover:text-white hover:bg-[#1F2937] rounded-lg transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 text-[#9CA3AF] hover:text-white hover:bg-[#1F2937] rounded-lg transition-all">
                <Github size={18} />
              </a>
              <a href="#" className="p-2 text-[#9CA3AF] hover:text-white hover:bg-[#1F2937] rounded-lg transition-all">
                <Globe size={18} />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Platform</h3>
            <ul className="space-y-3">
              {[
                { label: "Explore Projects", href: "/explore" },
                { label: "Funding Programs", href: "/programs" },
                { label: "Community Hub", href: "/community" },
                { label: "Create Project", href: "/create-project" },
                { label: "Dashboard", href: "/dashboard" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#9CA3AF] hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Ecosystem</h3>
            <ul className="space-y-3">
              {[
                { label: "Cardano Foundation", href: "https://cardanofoundation.org" },
                { label: "Input Output Global", href: "https://iog.io" },
                { label: "Intersect MBO", href: "https://www.intersectmbo.org" },
                { label: "Project Catalyst", href: "https://projectcatalyst.io" },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-[#9CA3AF] hover:text-white text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#374151]/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#9CA3AF] text-sm">
            © {new Date().getFullYear()} Fundit. Built on Cardano.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-[#9CA3AF] hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-[#9CA3AF] hover:text-white text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
