import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Introduction Generator",
  description: "Automatically generate a formal, well-structured Bengali introduction using our AI-powered Intro Generator tailored for MIST CSE 25 students.",
  openGraph: {
    title: "Introduction Generator | CSE 25",
    description: "Automatically generate a formal, well-structured Bengali introduction using our AI-powered Intro Generator tailored for MIST CSE 25 students.",
  },
  twitter: {
    title: "Introduction Generator | CSE 25",
    description: "Automatically generate a formal, well-structured Bengali introduction using our AI-powered Intro Generator tailored for MIST CSE 25 students.",
  },
};

export default function IntroGeneratorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
