"use client";

import { Loader2, Send, CheckCircle, Mail, User, MessageSquare, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useContact } from "@/hooks/contact";

export function ContactForm() {
  const { form, isSubmitting, isSuccess, error, handleSubmit, resetForm } = useContact();

  if (isSuccess) {
    return (
      <Card className="oracle-glass animate-scale-in">
        <CardContent className="pt-12 pb-12 text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full gradient-gold flex items-center justify-center zodiac-glow">
              <CheckCircle className="h-10 w-10 text-primary-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-display text-2xl text-gradient-gold">Message Sent!</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Thank you for reaching out. We&apos;ll get back to you as soon as possible.
            </p>
          </div>
          <Button onClick={resetForm} variant="outline" className="zodiac-border hover:bg-[var(--celestial-gold)]/10">
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="oracle-glass animate-scale-in">
      <CardHeader className="space-y-2 text-center pb-2">
        <CardTitle className="font-display text-2xl text-gradient-gold">Get in Touch</CardTitle>
        <CardDescription className="text-base">
          Have questions about your cosmic journey? We&apos;d love to hear from you.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/50" />
                      <Input
                        placeholder="Your name"
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
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/50" />
                      <Input
                        type="email"
                        placeholder="you@example.com"
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
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">Subject</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/50" />
                      <Input
                        placeholder="What's this about?"
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
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">Message</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-foreground/50" />
                      <Textarea
                        placeholder="Tell us what's on your mind..."
                        disabled={isSubmitting}
                        rows={5}
                        className="pl-10 bg-background/50 border-border/50 focus:border-[var(--celestial-gold)] focus:ring-[var(--celestial-gold)]/20 transition-all resize-none"
                        {...field}
                      />
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
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
