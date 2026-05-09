import React from 'react'
import { Heart } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="w-full border-t border-black/5 dark:border-white/5 bg-gray-50 dark:bg-[#050505] relative z-20">
            <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-16">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <span className="font-display text-2xl font-bold tracking-tight text-black dark:text-white">
                            CSE <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-[#A885AB] italic font-serif">Batch 25</span>
                        </span>
                        <p className="text-[10px] font-mono tracking-[0.2em] text-gray-500 dark:text-[#666666] uppercase">
                            MIST • Computer Science & Engineering
                        </p>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-400 dark:text-[#555555]">
                        &copy; {new Date().getFullYear()} CSE Batch 25. All rights reserved.
                    </p>
                    <p className="text-xs text-gray-400 dark:text-[#555555] flex items-center gap-1.5">
                        Made with <Heart className="w-3.5 h-3.5 text-purple-500 fill-purple-500" /> by Ismail Hossain from CSE 25
                    </p>
                </div>
            </div>
        </footer>
    )
}