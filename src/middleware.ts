import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

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
