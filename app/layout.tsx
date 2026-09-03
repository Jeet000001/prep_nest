import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono, Geist } from "next/font/google";

import "./globals.css";

import Navbar from "@/Components/Navbar";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/Components/theme-provider";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono-face",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "PrepNest",
  description:
    "Free React interview preparation for freshers: HTML, CSS, JavaScript, React theory, and machine coding practice.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "antialiased",
        spaceGrotesk.variable,
        ibmPlexMono.variable,
        geist.variable,
      )}
    >
      <body className="min-h-screen bg-[#0B0907] font-sans text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />

          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
