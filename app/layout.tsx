import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "CSE Batch 25 | MIST",
    template: "%s | CSE 25",
  },
  description: "Official platform for MIST Computer Science & Engineering Batch 25. Meet the brilliant minds, generate formal introductions, and connect with the community.",
  keywords: ["MIST", "CSE 25", "Computer Science", "Engineering", "Batch 25", "Students", "Dhaka", "Introduction Generator"],
  openGraph: {
    title: "CSE Batch 25 | MIST",
    description: "Official platform for MIST Computer Science & Engineering Batch 25. Meet the brilliant minds, generate formal introductions, and connect with the community.",
    type: "website",
    locale: "en_US",
    siteName: "CSE Batch 25",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSE Batch 25 | MIST",
    description: "Official platform for MIST Computer Science & Engineering Batch 25. Meet the brilliant minds, generate formal introductions, and connect with the community.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body suppressHydrationWarning>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
