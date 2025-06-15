import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { routes } from "./constants/routes";

const maintenanceMode = process.env.MAINTENANCE_MODE === "true";

export default function middleware(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl;

  // Get locale from pathname - for example "sk" from "/sk/xyz"
  const locale = pathname.split("/")[1];
  console.log("locale", locale);
  console.log("hostname", hostname);
  console.log("pathname", pathname);
  if (maintenanceMode) {
    // Presmerovať na správnu URL s doménou a locale
    const url = request.nextUrl.clone();
    url.hostname = "toptrener.mosuda.sk";
    url.pathname = `/${locale}${routes.maintenance}`;
    return NextResponse.redirect(url);
  }

  // Ak je požiadavka na hlavnú domén (toptrener.mosuda.sk)
  if (hostname === "toptrener.mosuda.sk") {
    // Presmerovať na stránku údržby, ak je aktivovaná
    if (maintenanceMode) {
      const url = request.nextUrl.clone();
      url.hostname = "toptrener.mosuda.sk";
      url.pathname = `/${routes.maintenance}`;
      return NextResponse.redirect(url);
    }
  }

  if (locale === "") {
    // Nechať next-intl pridať prefix (napríklad "/" -> "/sk")
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
