"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages, Check } from "lucide-react";
import { setLocale } from "@/lib/client-storage";
import { locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const localeNames: Record<Locale, string> = {
  en: "English",
  bg: "Български",
};

interface LanguageSwitcherProps {
  isCollapsed?: boolean;
}

export function LanguageSwitcher({ isCollapsed = false }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const t = useTranslations("sidebar");

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === locale) return;

    setLocale(newLocale);
    // Force a full page reload to ensure all components get the new locale
    window.location.reload();
  };

  return (
    <div className={cn("flex items-center", isCollapsed ? "justify-center" : "justify-between")}>
      {!isCollapsed && <span className="text-sm text-sidebar-foreground">{t("language")}</span>}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size={isCollapsed ? "icon" : "sm"}
            className={cn(isCollapsed && "w-full")}
            aria-label="Change language"
          >
            <Languages className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">{localeNames[locale]}</span>}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {locales.map(loc => (
            <DropdownMenuItem key={loc} onClick={() => handleLocaleChange(loc)} className="cursor-pointer">
              <span className="flex-1">{localeNames[loc]}</span>
              {locale === loc && <Check className="h-4 w-4 ml-2" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
