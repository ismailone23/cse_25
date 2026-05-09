"use client"
import Link from "next/link"
import React, { useState, useEffect, useCallback } from "react"
import { Button } from "./ui/button"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export default function Navbar() {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [scrolled, setScrolled] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
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
        <div className={cn(
            "fixed top-0 w-full z-50 transition-all duration-300 flex items-center justify-center",
            scrolled ? "bg-background/60 backdrop-blur-lg py-5 shadow-sm" : "bg-transparent py-7"
        )}>
            <div className="flex w-full px-6 max-w-7xl items-center justify-between">
                <div className="flex">
                    <Link href="/" className="font-bold text-xl tracking-tight">দ্বিমিক - ২৫</Link>
                </div>
                <div className="flex items-center gap-x-6">
                    <Link href="/intro-generator" className="text-sm font-medium hover:text-primary transition-colors">Generator</Link>
                    <Button variant="ghost" size="icon" onClick={() => toggleTheme()}>
                        {mounted ? (resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />) : <div className="h-5 w-5" />}
                    </Button>
                </div>
            </div>
        </div>
    )
}
