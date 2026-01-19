"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, Star, MessageSquare } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useAuth } from "@/hooks";
import { Logo } from "@/components/ui/logo";

const navLinks = [
  { href: "/zodiac", label: "Zodiac Signs" },
  { href: "/houses", label: "Houses" },
  { href: "/planets", label: "Planets" },
  { href: "/guide", label: "Guide" },
  { href: "/contact", label: "Contact" },
];

function PublicNav() {
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-nav bg-background/95 md:bg-background/60 border-b border-[var(--celestial-gold)]/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={user ? "/dashboard" : "/"} className="group">
          <Logo size="md" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-muted-foreground hover:text-foreground transition-colors group py-1"
            >
              <span className="relative z-10">{link.label}</span>
              <span className="absolute inset-x-0 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-[var(--celestial-gold)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform" />
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <Link href="/dashboard">
              <Button className="gradient-gold text-primary-foreground rounded-lg px-5 hover-glow">
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="hover:text-(--celestial-gold) hover:bg-[var(--celestial-gold)]/10">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="gradient-gold text-primary-foreground rounded-lg px-5 hover-glow">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-[var(--celestial-gold)]/10">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85vw] max-w-80 bg-background/95 backdrop-blur-cosmic border-l border-[var(--celestial-gold)]/20"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              {/* Mobile menu header */}
              <div className="flex items-center gap-2 p-4 border-b border-border">
                <Logo size="sm" />
              </div>

              {/* Mobile navigation links */}
              <div className="flex flex-col gap-2 mt-8">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 text-lg text-muted-foreground hover:text-foreground transition-colors py-3 px-4 rounded-lg hover:bg-[var(--celestial-gold)]/10 group"
                  >
                    <Star className="h-4 w-4 text-(--celestial-gold) opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile auth buttons */}
              <div className="p-6 border-t border-border space-y-3">
                {user ? (
                  <Link href="/dashboard" className="block">
                    <Button className="w-full gradient-gold text-primary-foreground">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Chat
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/login" className="block">
                      <Button variant="outline" className="w-full zodiac-border">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/signup" className="block">
                      <Button className="w-full gradient-gold text-primary-foreground">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

function PublicFooter() {
  return (
    <footer className="relative border-t border-[var(--celestial-gold)]/10 bg-background/80 backdrop-blur-soft">
      {/* Subtle star background */}
      <div className="absolute inset-0 star-field-subtle opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand section */}
          <div className="space-y-4">
            <Logo size="md" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discover your cosmic destiny with AI-powered astrology readings. Unlock the secrets written in the stars.
            </p>
          </div>

          {/* Learn section */}
          <div>
            <h4 className="font-display font-semibold mb-5 text-(--celestial-gold)">Learn</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/zodiac"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[var(--celestial-gold)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  Zodiac Signs
                </Link>
              </li>
              <li>
                <Link
                  href="/houses"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[var(--celestial-gold)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  Astrological Houses
                </Link>
              </li>
              <li>
                <Link
                  href="/planets"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[var(--celestial-gold)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  Planets
                </Link>
              </li>
              <li>
                <Link
                  href="/guide"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[var(--celestial-gold)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  Birth Chart Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Product section */}
          <div>
            <h4 className="font-display font-semibold mb-5 text-(--celestial-gold)">Product</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/login"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[var(--celestial-gold)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[var(--celestial-gold)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  Get Started
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[var(--celestial-gold)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal section */}
          <div>
            <h4 className="font-display font-semibold mb-5 text-(--celestial-gold)">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[var(--celestial-gold)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[var(--celestial-gold)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">&copy; {new Date().getFullYear()} Aistrology. All rights reserved.</p>
          <p className="text-xs">Made with cosmic energy</p>
        </div>
      </div>
    </footer>
  );
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicNav />
      <main className="flex-1 pt-16 star-field-subtle">{children}</main>
      <PublicFooter />
    </div>
  );
}
