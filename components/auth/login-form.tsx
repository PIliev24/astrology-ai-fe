"use client";

import { Loader2, Stars, Eye, EyeOff } from "lucide-react";
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
import { useLogin } from "@/hooks";
import { CosmicBackground } from "@/components/celestial";

const LoginForm = () => {
  const { form, error, isSubmitting, handleLogin } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Cosmic background */}
      <CosmicBackground
        variant="default"
        showStars={true}
        showNebula={true}
        className="absolute inset-0"
      />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[var(--celestial-violet)]/20 rounded-full blur-3xl animate-nebula-drift" />
      <div
        className="absolute bottom-20 right-10 w-40 h-40 bg-[var(--celestial-gold)]/15 rounded-full blur-3xl animate-nebula-drift"
        style={{ animationDelay: "-10s" }}
      />

      {/* Login card */}
      <Card className="relative z-10 w-full max-w-md oracle-glass animate-scale-in">
        <CardHeader className="space-y-4 text-center pb-2">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center zodiac-glow">
                <Stars className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="absolute inset-0 bg-[var(--celestial-gold)]/30 rounded-full blur-xl" />
            </div>
          </div>

          <div className="space-y-2">
            <CardTitle className="font-display text-3xl text-(--celestial-gold)">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-base text-foreground/70">
              Enter your credentials to access your celestial journey
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        disabled={isSubmitting}
                        className="h-12 bg-background/50 border-border/50 focus:border-[var(--celestial-gold)] focus:ring-[var(--celestial-gold)]/20 transition-all"
                        {...field}
                      />
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
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          autoComplete="current-password"
                          disabled={isSubmitting}
                          className="h-12 bg-background/50 border-border/50 focus:border-[var(--celestial-gold)] focus:ring-[var(--celestial-gold)]/20 pr-12 transition-all"
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
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              {/* Divider */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-foreground/70">
                    New to Aistrology?
                  </span>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 text-(--celestial-gold) hover:text-(--celestial-gold)/80 font-medium transition-colors group"
                >
                  Create your account
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Bottom decorative text */}
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-foreground/50">
        ✦ Your cosmic journey continues ✦
      </p>
    </div>
  );
};

export default LoginForm;
