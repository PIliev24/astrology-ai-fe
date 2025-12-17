"use client";

import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "@/lib/client-storage";
import { useEffect, useState } from "react";
import { defaultLocale, type Locale } from "@/lib/i18n";

interface LocaleProviderProps {
  children: React.ReactNode;
}

async function getMessages(locale: Locale) {
  return (await import(`@/messages/${locale}.json`)).default;
}

function getCookieLocale(): Locale {
  if (typeof document === "undefined") return defaultLocale;

  const cookies = document.cookie.split(";");
  const localeCookie = cookies.find(c => c.trim().startsWith("locale="));

  if (localeCookie) {
    const locale = localeCookie.split("=")[1]?.trim() as Locale;
    if (locale === "en" || locale === "bg") {
      return locale;
    }
  }

  return defaultLocale;
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    // Try to get from cookie first (for SSR hydration)
    const cookieLocale = getCookieLocale();
    if (cookieLocale !== defaultLocale) return cookieLocale;

    // Fallback to localStorage
    if (typeof window !== "undefined") {
      return getLocale() as Locale;
    }
    return defaultLocale;
  });
  const [messages, setMessages] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    // Load messages for current locale
    getMessages(locale).then(msgs => {
      setMessages(msgs);
    });

    // Listen for locale changes
    const checkLocale = () => {
      const newLocale = getCookieLocale() || (getLocale() as Locale);
      if (newLocale !== locale) {
        setLocaleState(newLocale);
        getMessages(newLocale).then(msgs => {
          setMessages(msgs);
        });
      }
    };

    // Check periodically for cookie changes
    const interval = setInterval(checkLocale, 500);

    // Also listen to storage events
    const handleStorage = () => checkLocale();
    window.addEventListener("storage", handleStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorage);
    };
  }, [locale]);

  if (!messages) {
    return <>{children}</>;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
