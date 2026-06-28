"use client"
import { useCallback, useState, useRef } from "react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Sparkles, Loader2, Copy, Check } from "lucide-react"
import { generateIntroAction } from "./actions"

export default function IntroGenerator() {
  const [formData, setFormData] = useState({
    name: "",
    school: "",
    sscGpa: "",
    sscYear: "",
    college: "",
    hscGpa: "",
    hscYear: "",
    fatherOcc: "",
    motherOcc: "",
    fromArea: "",
    currentArea: "",
  })

  const [generatedIntro, setGeneratedIntro] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const outputRef = useRef<HTMLDivElement>(null)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    setGeneratedIntro("")
    setIsGenerating(true)
    try {
      const result = await generateIntroAction(formData)
      if (result.success && result.data) {
        setGeneratedIntro(result.data)
        setTimeout(() => {
          outputRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          })
        }, 100)
      } else {
        alert(result.error || "An error occurred.")
      }
    } catch (error) {
      console.error(error)
      alert("An unexpected error occurred while generating.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(generatedIntro)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }, [generatedIntro])

  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-hidden bg-gray-50 px-6 pt-32 pb-20 dark:bg-[#050505]">
      <div className="pointer-events-none absolute top-0 left-1/2 h-150 w-200 -translate-x-1/2 rounded-full bg-purple-600/10 blur-[120px] dark:bg-purple-600/20" />

      <div className="relative z-10 w-full max-w-4xl">
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-semibold tracking-widest text-purple-600 uppercase dark:text-purple-400"
          >
            <Sparkles className="h-3 w-3" />
            AI Assistant
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl font-bold tracking-tight text-black md:text-5xl dark:text-white"
          >
            Generate your{" "}
            <span className="bg-linear-to-r from-purple-500 to-indigo-500 bg-clip-text font-serif text-transparent italic">
              Introduction
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mx-auto mt-4 max-w-lg text-sm text-gray-500 dark:text-gray-400"
          >
            Fill in English, it will be auto translated in Bengla.
          </motion.p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleGenerate}
          className="relative space-y-8 overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-xl md:p-10 dark:border-white/5 dark:bg-[#111]"
        >
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase dark:text-gray-400">
                Full Name
              </label>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black transition-all focus:ring-2 focus:ring-purple-500/50 focus:outline-none dark:border-white/10 dark:bg-black/50 dark:text-white"
                placeholder="e.g. John Doe"
              />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="border-b border-purple-100 pb-3 text-xs font-bold tracking-widest text-purple-600 uppercase dark:border-purple-900/50 dark:text-purple-400">
                  SSC Details
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase dark:text-gray-400">
                      School Name
                    </label>
                    <input
                      required
                      type="text"
                      name="school"
                      value={formData.school}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black transition-all focus:ring-2 focus:ring-purple-500/50 focus:outline-none dark:border-white/10 dark:bg-black/50 dark:text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase dark:text-gray-400">
                        SSC GPA
                      </label>
                      <input
                        required
                        type="text"
                        name="sscGpa"
                        value={formData.sscGpa}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black transition-all focus:ring-2 focus:ring-purple-500/50 focus:outline-none dark:border-white/10 dark:bg-black/50 dark:text-white"
                        placeholder="5.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase dark:text-gray-400">
                        SSC Year
                      </label>
                      <input
                        required
                        type="text"
                        name="sscYear"
                        value={formData.sscYear}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black transition-all focus:ring-2 focus:ring-purple-500/50 focus:outline-none dark:border-white/10 dark:bg-black/50 dark:text-white"
                        placeholder="2021"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="border-b border-purple-100 pb-3 text-xs font-bold tracking-widest text-purple-600 uppercase dark:border-purple-900/50 dark:text-purple-400">
                  HSC Details
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase dark:text-gray-400">
                      College Name
                    </label>
                    <input
                      required
                      type="text"
                      name="college"
                      value={formData.college}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black transition-all focus:ring-2 focus:ring-purple-500/50 focus:outline-none dark:border-white/10 dark:bg-black/50 dark:text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase dark:text-gray-400">
                        HSC GPA
                      </label>
                      <input
                        required
                        type="text"
                        name="hscGpa"
                        value={formData.hscGpa}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black transition-all focus:ring-2 focus:ring-purple-500/50 focus:outline-none dark:border-white/10 dark:bg-black/50 dark:text-white"
                        placeholder="5.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase dark:text-gray-400">
                        HSC Year
                      </label>
                      <input
                        required
                        type="text"
                        name="hscYear"
                        value={formData.hscYear}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black transition-all focus:ring-2 focus:ring-purple-500/50 focus:outline-none dark:border-white/10 dark:bg-black/50 dark:text-white"
                        placeholder="2023"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <h3 className="border-b border-purple-100 pb-3 text-xs font-bold tracking-widest text-purple-600 uppercase dark:border-purple-900/50 dark:text-purple-400">
                Location Details
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase dark:text-gray-400">
                    Permanent Address (From)
                  </label>
                  <input
                    required
                    type="text"
                    name="fromArea"
                    value={formData.fromArea}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black transition-all focus:ring-2 focus:ring-purple-500/50 focus:outline-none dark:border-white/10 dark:bg-black/50 dark:text-white"
                    placeholder="e.g. Dhaka, Bangladesh"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase dark:text-gray-400">
                    Current Address
                  </label>
                  <input
                    required
                    type="text"
                    name="currentArea"
                    value={formData.currentArea}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black transition-all focus:ring-2 focus:ring-purple-500/50 focus:outline-none dark:border-white/10 dark:bg-black/50 dark:text-white"
                    placeholder="e.g. Mirpur, Dhaka, Bangladesh"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <Button
              disabled={isGenerating}
              type="submit"
              className="w-full rounded-full bg-purple-600 px-16 py-6 text-[11px] font-bold tracking-[0.3em] text-white uppercase shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all hover:bg-purple-700 hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] sm:w-auto"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate"
              )}
            </Button>
          </div>
        </motion.form>

        {generatedIntro && (
          <motion.div
            ref={outputRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mt-8 overflow-hidden rounded-2xl border border-purple-100 bg-white p-8 shadow-xl dark:border-purple-500/30 dark:bg-purple-900/10"
          >
            <div className="absolute top-0 left-0 h-full w-1 bg-linear-to-b from-purple-400 to-indigo-500" />
            <div className="mb-6 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-[11px] font-bold tracking-[0.3em] text-purple-600 uppercase dark:text-purple-400">
                <Sparkles className="h-4 w-4" />
                Your Output
              </h3>
              <button
                onClick={handleCopy}
                type="button"
                className="inline-flex items-center gap-2 rounded-md border border-black/5 bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-200 dark:border-white/5 dark:bg-black/50 dark:text-gray-300 dark:hover:bg-white/10"
              >
                {isCopied ? (
                  <Check className="h-3.5 w-3.5 text-green-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                {isCopied ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="text-lg leading-relaxed font-light whitespace-pre-wrap text-gray-800 dark:text-gray-300">
              {generatedIntro}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
