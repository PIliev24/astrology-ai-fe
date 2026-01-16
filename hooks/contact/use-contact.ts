"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { getWeb3FormsKey } from "@/lib/env";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export function useContact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const handleSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: getWeb3FormsKey(),
          from_name: "Aistrology Contact Form",
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        form.reset();
      } else {
        setError(result.message || "Failed to send message. Please try again.");
      }
    } catch {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setError(null);
    form.reset();
  };

  return {
    form,
    isSubmitting,
    isSuccess,
    error,
    handleSubmit: form.handleSubmit(handleSubmit),
    resetForm,
  };
}
