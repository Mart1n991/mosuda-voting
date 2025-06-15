import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { routes } from "./constants/routes";

const maintenanceMode = process.env.MAINTENANCE_MODE === "true";

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Získať locale z pathy
  const locale = pathname.split("/")[1];

  // Ak sme v maintenance móde a nie sme už na maintenance stránke
  if (maintenanceMode && !pathname.includes("/maintenance")) {
    const url = request.nextUrl.clone();

    // Ak locale neexistuje, defaultuj na 'sk'
    const finalLocale = locale || "sk";

    url.pathname = `/${finalLocale}${routes.maintenance}`;
    return NextResponse.redirect(url);
  }

  if (locale === "") {
    // Nechať next-intl pridať prefix
    return createMiddleware(routing)(request);
  }

  return createMiddleware(routing)(request);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - /api (API routes)
    // - /_next (Next.js internals)
    // - /_vercel (Vercel internals)
    // - /static (public files)
    // - /monitoring (Sentry monitoring)
    // - .*\\..*$ (files with extensions)
    "/((?!api|_next|_vercel|static|monitoring|.*\\..*).*)",
  ],
};
