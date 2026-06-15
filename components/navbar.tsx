"use client"
import Link from "next/link"
import React, { useState, useEffect, useCallback } from "react"
import { Button } from "./ui/button"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const { setTheme, resolvedTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }, [resolvedTheme, setTheme])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={cn(
        "fixed top-0 z-50 flex w-full items-center justify-center transition-all duration-300",
        scrolled
          ? "bg-background/60 py-5 shadow-sm backdrop-blur-lg"
          : "bg-transparent py-7"
      )}
    >
      <div className="flex w-full max-w-7xl items-center justify-between px-6">
        <div className="flex">
          <Link href="/" className="text-xl font-bold tracking-tight">
            দ্বিমিক - ২৫
          </Link>
        </div>
        <div className="flex items-center gap-x-6">
          {/* <Link
            href="/intro-generator"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Generator
          </Link> */}
          <Button variant="ghost" size="icon" onClick={() => toggleTheme()}>
            {mounted ? (
              resolvedTheme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )
            ) : (
              <div className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
