import type { Metadata, Viewport } from "next";
import "./globals.css";

/* ─── Canonical URL ─────────────────────────────────────────── */
const SITE_URL = "https://rohiths-portfolio.vercel.app";

/* ─── Viewport ──────────────────────────────────────────────── */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050810",
};

/* ─── SEO Metadata ──────────────────────────────────────────── */
export const metadata: Metadata = {
  /* ── Core ── */
  title: {
    default: "Rohith | Cybersecurity Portfolio",
    template: "%s | Rohith — Cybersecurity",
  },
  description:
    "Rohith S — Cybersecurity student, ethical hacker, and security researcher specializing in penetration testing, web application security, bug bounty hunting, and CTF competitions.",

  keywords: [
    "Rohith S",
    "cybersecurity",
    "ethical hacker",
    "penetration testing",
    "bug bounty",
    "security researcher",
    "web application security",
    "CTF",
    "HackTheBox",
    "TryHackMe",
    "OWASP",
    "Kali Linux",
    "portfolio",
    "India",
  ],

  authors: [{ name: "Rohith S", url: SITE_URL }],
  creator: "Rohith S",
  publisher: "Rohith S",

  /* ── Canonical ── */
  alternates: {
    canonical: SITE_URL,
  },

  /* ── Open Graph ── */
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Rohith | Cybersecurity Portfolio",
    title: "Rohith | Cybersecurity Portfolio",
    description:
      "Ethical hacker and security researcher — penetration testing, bug bounty, CTFs, and web security. Breaking things responsibly so others don't have to.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Rohith S — Cybersecurity Portfolio",
        type: "image/png",
      },
    ],
  },

  /* ── Twitter / X ── */
  twitter: {
    card: "summary_large_image",
    site: "@hyy_rohith_",
    creator: "@hyy_rohith_",
    title: "Rohith | Cybersecurity Portfolio",
    description:
      "Ethical hacker and security researcher — penetration testing, bug bounty, CTFs, and web security.",
    images: [`${SITE_URL}/og-image.png`],
  },

  /* ── Robots ── */
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /* ── Verification placeholders ── */
  // verification: {
  //   google: "YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN",
  // },

  /* ── Other ── */
  category: "technology",
  classification: "Portfolio",
};

/* ─── JSON-LD structured data ───────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rohith S",
  url: SITE_URL,
  jobTitle: "Cybersecurity Specialist",
  description:
    "Ethical hacker and security researcher specializing in penetration testing and web application security.",
  sameAs: [
    "https://github.com/rohiths9814-cmd",
    "https://linkedin.com/in/rohiths9814",
    "https://twitter.com/hyy_rohith_",
  ],
  knowsAbout: [
    "Penetration Testing",
    "Bug Bounty Hunting",
    "Web Application Security",
    "CTF Competitions",
    "Network Security",
    "Python",
    "Kali Linux",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "K.S.R College of Engineering",
  },
};

/* ─── Root layout ───────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-dark-base text-slate-200 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
