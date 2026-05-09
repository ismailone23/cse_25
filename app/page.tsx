"use client"
import { motion } from "motion/react";
import { ChevronRight, Sparkles } from "lucide-react";
import IntroToSeniors from "@/components/intro-to-seniors";

export default function Hero() {

  return (
    <div>
      <section id="hero" className="relative pt-32 pb-20 px-6 min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 space-y-6 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            CSE 25
          </div>

          <h1 className="font-display text-4xl md:text-7xl font-bold tracking-tight text-black dark:text-white leading-[1.1] glow-text">
            Where New Journeys<br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-400 to-indigo-400 italic font-serif">
              Begin Through Connections
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Step into a journey filled with new experiences, meaningful connections, and opportunities to grow.
            Join us to learn from shared stories, gain guidance, and make your beginning unforgettable.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <motion.button
              onClick={() => {
                document.getElementById('intro-to-seniors')?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-purple-500 text-[#FFF6FF] font-bold rounded-full flex items-center gap-2 group transition-shadow hover:shadow-[0_0_30px_rgba(230,76,255,0.4)] cursor-pointer"
            >
              Explore
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
        <div className="absolute inset-0 animate-stars pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-linear-to-t from-purple-200/40 dark:from-purple-900/40 to-transparent flex items-end overflow-hidden">
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="w-full h-1 bg-linear-to-r from-transparent via-purple-500 to-transparent blur-sm"
          />
        </div>
      </section>
      <section id="intro-to-seniors">
        <IntroToSeniors />
      </section>
    </div>
  );
}
