import { useEffect } from "react";
import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRevalidator,
} from "react-router";
import { Analytics } from "@vercel/analytics/react";
import { TbAlertTriangle, TbHome, TbRefresh } from "react-icons/tb";

import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/Header";
import Footer from "./components/footer/Footer";
import VerticalHeader from "./components/header/VerticalHeader";
import "./index.css";

const FONTS =
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap";

const APPLE_ICON_SIZES = [57, 60, 72, 76, 114, 120, 144, 152, 180];

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { rel: "stylesheet", href: FONTS },
  ...APPLE_ICON_SIZES.map((s) => ({
    rel: "apple-touch-icon",
    sizes: `${s}x${s}`,
    href: `/apple-icon-${s}x${s}.png`,
  })),
  { rel: "icon", type: "image/png", sizes: "192x192", href: "/android-icon-192x192.png" },
  { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
  { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96x96.png" },
  { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
  { rel: "manifest", href: "/manifest.json" },
];

/** The HTML document. Pre-rendered for every page at build time. */
export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#020617" />
        <meta name="color-scheme" content="dark" />
        <meta name="msapplication-TileColor" content="#020617" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="author" content="Sachin Supunthaka" />
        <meta name="keywords" content="sachin96boy, sachin96_boy, sachin supunthaka, sachin, supunthaka" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Sachin96Boy" />
        <meta property="og:image" content="https://avatars.githubusercontent.com/u/52316373" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@sachin96boy" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function Shell({ children }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-on-accent"
      >
        Skip to content
      </a>
      <Sidebar />
      <Header />
      <main
        id="main"
        tabIndex={-1}
        className="flex min-h-dvh flex-col focus-visible:ring-0 lg:pl-64 lg:pr-20"
      >
        <div className="flex-1">{children}</div>
        <Footer />
      </main>
      <VerticalHeader />
      <Analytics />
    </>
  );
}

export default function App() {
  const revalidator = useRevalidator();

  // Pages are pre-rendered with build-time data; refresh it from Firebase once after hydration
  // so edits made in Firebase show up without a redeploy.
  useEffect(() => {
    revalidator.revalidate();
    // Run once on mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Shell>
      <Outlet />
    </Shell>
  );
}

export function ErrorBoundary({ error }) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  if (!notFound) console.error(error);
  return (
    <Shell>
      <section className="section flex min-h-[60vh] flex-col items-center justify-center text-center">
        <TbAlertTriangle aria-hidden="true" className="h-9 w-9 text-amber-300" />
        <h1 className="section-title mt-4">{notFound ? "Page not found" : "Something went wrong"}</h1>
        <p className="mt-3 max-w-md text-muted">
          {notFound
            ? "The page you’re looking for doesn’t exist or has moved."
            : "This page couldn’t load. Check your connection and try again."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {!notFound && (
            <button type="button" onClick={() => window.location.reload()} className="btn-primary">
              <TbRefresh aria-hidden="true" className="h-5 w-5" />
              Retry
            </button>
          )}
          <Link to="/" className={notFound ? "btn-primary" : "btn-secondary"}>
            <TbHome aria-hidden="true" className="h-5 w-5" />
            Back to home
          </Link>
        </div>
      </section>
    </Shell>
  );
}
