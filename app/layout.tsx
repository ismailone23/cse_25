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
  metadataBase: new URL("https://cse25.frozenismail.xyz"),
  title: {
    default: "দ্বিমিক ২৫ | MIST CSE Batch 25",
    template: "%s | CSE 25",
  },
  description: "Official hub for the 25th Computer Science & Engineering batch (দ্বিমিক ২৫) of Military Institute of Science and Technology (MIST).",
  keywords: [
    "দ্বিমিক ২৫",
    "MIST CSE 25",
    "MIST",
    "Military Institute of Science and Technology",
    "Computer Science and Engineering",
    "CSE Batch 25",
    "MIST CSE Students",
    "Student Directory",
    "intro-generator",
    "brilliant minds"
  ],
  openGraph: {
    title: "দ্বিমিক ২৫ | MIST CSE Batch 25",
    description: "Official hub for the 25th Computer Science & Engineering batch (দ্বিমিক ২৫) of Military Institute of Science and Technology (MIST).",
    type: "website",
    locale: "en_US",
    siteName: "দ্বিমিক ২৫",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "দ্বিমিক ২৫ | MIST CSE Batch 25",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "দ্বিমিক ২৫ | MIST CSE Batch 25",
    description: "Official hub for the 25th Computer Science & Engineering batch (দ্বিমিক ২৫) of Military Institute of Science and Technology (MIST).",
    images: ["/og-image.png"],
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
