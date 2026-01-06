"use client";

import { Loader2, Sparkles, Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSignup } from "@/hooks";
import { CosmicBackground } from "@/components/celestial";

const SignupForm = () => {
  const { form, error, isSubmitting, handleSignup } = useSignup();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Cosmic background */}
      <CosmicBackground
        variant="default"
        showStars={true}
        showNebula={true}
        showAurora={true}
        className="absolute inset-0"
      />

      {/* Decorative elements */}
      <div className="absolute top-32 right-20 w-48 h-48 bg-[var(--celestial-violet)]/15 rounded-full blur-3xl animate-nebula-drift" />
      <div
        className="absolute bottom-32 left-20 w-36 h-36 bg-[var(--celestial-gold)]/20 rounded-full blur-3xl animate-nebula-drift"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="absolute top-1/4 left-1/4 w-24 h-24 bg-[var(--celestial-teal)]/10 rounded-full blur-2xl animate-nebula-drift"
        style={{ animationDelay: "-14s" }}
      />

      {/* Signup card */}
      <Card className="relative z-10 w-full max-w-md oracle-glass animate-scale-in">
        <CardHeader className="space-y-4 text-center pb-2">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center zodiac-glow">
                <Sparkles className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="absolute inset-0 bg-[var(--celestial-gold)]/30 rounded-full blur-xl" />
            </div>
          </div>

          <div className="space-y-2">
            <CardTitle className="font-display text-3xl text-gradient-gold">
              Begin Your Journey
            </CardTitle>
            <CardDescription className="text-base">
              Create your account to unlock the secrets of the cosmos
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80">Name (optional)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/70" />
                        <Input
                          type="text"
                          placeholder="Your name"
                          autoComplete="name"
                          disabled={isSubmitting}
                          className="h-12 pl-10 bg-background/50 border-border/50 focus:border-[var(--celestial-gold)] focus:ring-[var(--celestial-gold)]/20 transition-all"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/70" />
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          autoComplete="email"
                          disabled={isSubmitting}
                          className="h-12 pl-10 bg-background/50 border-border/50 focus:border-[var(--celestial-gold)] focus:ring-[var(--celestial-gold)]/20 transition-all"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/70" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          autoComplete="new-password"
                          disabled={isSubmitting}
                          className="h-12 pl-10 pr-12 bg-background/50 border-border/50 focus:border-[var(--celestial-gold)] focus:ring-[var(--celestial-gold)]/20 transition-all"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/70 hover:text-foreground transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && (
                <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-4 text-sm text-destructive animate-fade-in">
                  <p className="font-medium">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium gradient-gold text-primary-foreground rounded-xl hover-glow transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating your account...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Create Account
                  </>
                )}
              </Button>

              {/* Divider */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-foreground/70">
                    Already a star seeker?
                  </span>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-[var(--celestial-gold)] hover:text-[var(--celestial-gold)]/80 font-medium transition-colors group"
                >
                  <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
                  Sign in to your account
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Bottom decorative text */}
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-foreground/50">
        ✦ The stars await your discovery ✦
      </p>
    </div>
  );
};

export default SignupForm;
