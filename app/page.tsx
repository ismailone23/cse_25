"use client"
import { motion } from "motion/react"
import { ChevronRight, Sparkles } from "lucide-react"
import IntroToSeniors from "@/components/intro-to-seniors"

export default function Hero() {
  return (
    <div>
      <section
        id="hero"
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20 text-center"
      >
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-200 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/20 blur-[120px]" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-semibold tracking-widest text-purple-600 uppercase dark:text-purple-400">
            <Sparkles className="h-3 w-3" />
            CSE 25
          </div>

          <h1 className="font-display glow-text text-4xl leading-[1.1] font-bold tracking-tight text-black md:text-7xl dark:text-white">
            Where New Journeys
            <br />
            <span className="bg-linear-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text font-serif text-transparent italic">
              Begin Through Connections
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed font-light text-slate-600 md:text-xl dark:text-slate-400">
            Step into a journey filled with new experiences, meaningful
            connections, and opportunities to grow. Join us to learn from shared
            stories, gain guidance, and make your beginning unforgettable.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row">
            <motion.button
              onClick={() => {
                document
                  .getElementById("intro-to-seniors")
                  ?.scrollIntoView({ behavior: "smooth" })
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex cursor-pointer items-center gap-2 rounded-full bg-purple-500 px-8 py-4 font-bold text-[#FFF6FF] transition-shadow hover:shadow-[0_0_30px_rgba(230,76,255,0.4)]"
            >
              Explore
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>
        </motion.div>
        <div className="animate-stars pointer-events-none absolute inset-0" />
        <div className="absolute bottom-0 left-0 flex h-[30vh] w-full items-end overflow-hidden bg-linear-to-t from-purple-200/40 to-transparent dark:from-purple-900/40">
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-1 w-full bg-linear-to-r from-transparent via-purple-500 to-transparent blur-sm"
          />
        </div>
      </section>
      <section id="intro-to-seniors">
        <IntroToSeniors />
      </section>
    </div>
  )
}
