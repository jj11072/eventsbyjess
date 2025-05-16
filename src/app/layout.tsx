import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Events by Jess - Professional Event Planning",
  description: "Creating unforgettable moments through professional event planning and management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link href="/" className="text-2xl font-bold text-primary">
                Events by Jess
              </Link>
              <div className="hidden md:flex space-x-8">
                <Link href="/" className="text-black hover:text-primary transition-colors">
                  Home
                </Link>
                <Link href="/services" className="text-black hover:text-primary transition-colors">
                  Services
                </Link>
                <Link href="/portfolio" className="text-black hover:text-primary transition-colors">
                  Portfolio
                </Link>
                <Link href="/about" className="text-black hover:text-primary transition-colors">
                  About
                </Link>
                <Link href="/contact" className="text-black hover:text-primary transition-colors">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {children}

        <footer className="bg-primary-dark text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-secondary">Events by Jess</h3>
                <p className="text-white/80">
                  Creating unforgettable moments through professional event planning
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-secondary">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/services" className="text-white/80 hover:text-secondary transition-colors">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/portfolio" className="text-white/80 hover:text-secondary transition-colors">
                      Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-white/80 hover:text-secondary transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-secondary">Contact</h3>
                <ul className="space-y-2 text-white/80">
                  <li>Email: info@eventsbyjess.com</li>
                  <li>Phone: (555) 123-4567</li>
                  <li>Location: Your City, State</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/60">
              <p>&copy; {new Date().getFullYear()} Events by Jess. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
