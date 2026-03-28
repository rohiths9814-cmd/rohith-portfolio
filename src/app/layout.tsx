import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050810",
};

export const metadata: Metadata = {
  title: "Rohith S — Cybersecurity Specialist & Ethical Hacker",
  description:
    "Portfolio of Rohith S — Cybersecurity student, ethical hacker, and security researcher specializing in penetration testing, web application security, and bug bounty hunting.",
  keywords: [
    "cybersecurity",
    "ethical hacker",
    "penetration testing",
    "bug bounty",
    "security researcher",
    "web security",
    "CTF",
    "portfolio",
  ],
  authors: [{ name: "Rohith S" }],
  creator: "Rohith S",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rohiths-portfolio.vercel.app",
    title: "Rohith S — Cybersecurity Specialist",
    description:
      "Ethical hacker and security researcher — breaking things responsibly since day one.",
    siteName: "Rohith S Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohith S — Cybersecurity Specialist",
    description: "Ethical hacker and security researcher portfolio.",
    creator: "@hyy_rohith_",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-dark-base text-slate-200 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

