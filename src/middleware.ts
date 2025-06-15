import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { routes } from "./constants/routes";

const maintenanceMode = process.env.MAINTENANCE_MODE === "true";

export default function middleware(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl;

  // Ak je aktivované režim údržby
  if (maintenanceMode) {
    // Presmerovať všetky požiadavky na stránku údržby
    return NextResponse.redirect(new URL(`/${pathname.startsWith("/") ? "" : "/"}${routes.maintenance}`, request.url));
  }

  // Get locale from pathname - for example "sk" from "/sk/xyz"
  const locale = pathname.split("/")[1];

  // Ak je požiadavka na hlavnú domén (toptrener.mosuda.sk)
  if (hostname === "toptrener.mosuda.sk") {
    // Presmerovať na hlavnú stránku alebo inú logiku
    // Napríklad presmerovanie na domovskú stránku alebo stránku údržby
    if (maintenanceMode) {
      return NextResponse.redirect(new URL(`/${routes.maintenance}`, request.url));
    }
  }

  const maintenancePath = `/${locale}${routes.maintenance}`;

  if (locale === "") {
    // Nechať next-intl pridať prefix (napríklad "/" -> "/sk")
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
