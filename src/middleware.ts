import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { routes } from "./constants/routes";

const maintenanceMode = process.env.MAINTENANCE_MODE === "true";

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get locale from pathname - for example "sk" from "/sk/xyz"
  const locale = pathname.split("/")[1];
  const maintenancePath = `/${locale}${routes.maintenance}`;

  if (locale === "") {
    // Let next-intl add a prefix (for example "/" -> "/sk")
    return createMiddleware(routing)(request);
  }

  // Manage when on maintenance page it will NOT eredirect again
  if (maintenanceMode && pathname !== maintenancePath) {
    return NextResponse.redirect(new URL(maintenancePath, request.url));
  }

  // Continue in regular routing middleware
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
