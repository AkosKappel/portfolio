import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Every page path, but not API routes, Next.js internals or files with an extension.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
