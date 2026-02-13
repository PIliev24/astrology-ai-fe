# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev          # Start dev server (Next.js 16 + Turbopack)
bun run build    # Production build
bun run lint     # ESLint (flat config, v9)
bun start        # Start production server
```

No test framework is configured yet.

## Architecture

**Aistrology** — an AI-powered astrology web app. Next.js 16 App Router frontend that talks to a Python backend API via REST + WebSocket.

### Route Groups

- `app/(public)/` — Public pages (landing, zodiac/houses/planets info, guide, contact, legal). Layout: navbar + footer.
- `app/(auth)/` — Protected pages (dashboard, chart viewer, chat/conversations, settings). Layout: collapsible sidebar.
- `app/login/`, `app/signup/`, `app/checkout/` — Standalone auth/payment pages (no route group).

Route protection is handled client-side by `RouteGuard` component checking against `PUBLIC_ROUTES` in `constants/routes.ts`.

### Data Flow

- **API client** (`services/api-client.tsx`): `api.get/post/put/patch/delete()` — handles JWT auth, automatic token refresh, and error wrapping via `ApiError`.
- **Services** (`services/`): Thin wrappers around `api` calls, one per domain (auth, birth-chart, conversation, subscription).
- **Hooks** (`hooks/`): SWR-based data fetching hooks that call services. Used by components for data + mutations.
- **Server actions** (`actions/`): `"use server"` functions that call services server-side.
- **WebSocket**: Chat uses `/ws/chat` endpoint with reconnection logic (max 5 attempts).

### Key Directories

- `constants/endpoints.ts` — All backend API endpoint paths
- `constants/routes.ts` — All frontend route paths + `PUBLIC_ROUTES` list
- `config/app.config.ts` — Centralized timing, feature flags, validation rules
- `config/messages.ts` — All user-facing message strings
- `types/` — TypeScript types split by domain (auth, astrology, subscription, common)
- `contexts/chart-context.tsx` — Selected chart state for dashboard
- `data/` — Static astrology content (zodiac signs, houses, planets)

## Styling

**Tailwind CSS v4** with `@theme inline` block (no tailwind.config.js). Theme defined in `app/styles/theme.css`.

- CSS variables use HSL channel format: `--background: 45 33% 96%;`
- `@theme inline` maps vars to Tailwind: `--color-background: hsl(var(--background));`
- Custom celestial colors: `text-celestial-gold`, `bg-celestial-indigo`, etc.
- In arbitrary values (shadows, gradients), wrap with `hsl()`: `shadow-[0_0_20px_hsl(var(--celestial-gold))]`
- Dark mode: `@custom-variant dark (&:is(.dark *))` — use `dark:` prefix as normal
- Fonts: Cinzel (headings/display), Lora (body), Geist Mono (code)
- Component-specific CSS in `app/styles/components/` and `app/styles/animations/`

## Conventions

- **Package manager**: Bun
- **Imports**: Always use `@/` path alias (maps to project root)
- **Forms**: react-hook-form + zod for all form validation
- **Data fetching**: SWR hooks wrapping service calls
- **API responses**: Backend returns snake_case; types use camelCase
- **Toasts**: `sonner` — use `toast.success()`, `toast.error()`, etc.
- **Icons**: `lucide-react` for general icons; custom zodiac/planet icons in `components/icons/`
- **shadcn/ui**: New York style, RSC-enabled. Components in `components/ui/`
- **Prettier**: 120 char width, double quotes, trailing commas (es5), no parens on single arrow params

## Environment Variables

```
NEXT_PUBLIC_API_URL          # Backend API base URL (default: http://localhost:8000)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY  # Stripe public key
NEXT_PUBLIC_WEB3FORMS_KEY    # Web3Forms key for contact form
```

Accessed via helpers in `lib/env.ts` (`getApiUrl()`, `apiUrl(endpoint)`, `getWebSocketUrl(endpoint)`).
