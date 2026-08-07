import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google'
import "./globals.css";
import Navbar from "@/Components/Navbar";

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono-face',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'PrepNest',
  description: 'Free React interview preparation for freshers: HTML, CSS, JavaScript, React theory, and machine coding practice.',
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#13110f]">
        <Navbar />
        {children}
        </body>
    </html>
  );
}
