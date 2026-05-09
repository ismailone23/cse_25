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
        currentArea: ""
    })

    const [generatedIntro, setGeneratedIntro] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const [isCopied, setIsCopied] = useState(false)
    const outputRef = useRef<HTMLDivElement>(null)

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }, [])

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault()
        setGeneratedIntro("")
        setIsGenerating(true)
        try {
            const intro = await generateIntroAction(formData)
            setGeneratedIntro(intro)
            setTimeout(() => {
                outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }, 100)
        } catch (error) {
            console.error(error)
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
        <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center relative overflow-hidden bg-gray-50 dark:bg-[#050505]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-600/10 dark:bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-4xl relative z-10">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-4"
                    >
                        <Sparkles className="w-3 h-3" />
                        AI Assistant
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-display text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white"
                    >
                        Generate your <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-indigo-500 italic font-serif">Introduction</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="text-gray-500 dark:text-gray-400 mt-4 text-sm max-w-lg mx-auto"
                    >
                        Fill in English, it will be auto translated in Bengla.
                    </motion.p>
                </div>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    onSubmit={handleGenerate}
                    className="bg-white dark:bg-[#111] border border-black/5 dark:border-white/5 shadow-xl rounded-2xl p-6 md:p-10 space-y-8 relative overflow-hidden"
                >
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Full Name</label>
                            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" placeholder="e.g. John Doe" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 border-b border-purple-100 dark:border-purple-900/50 pb-3">SSC Details</h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">School Name</label>
                                        <input required type="text" name="school" value={formData.school} onChange={handleChange} className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">SSC GPA</label>
                                            <input required type="text" name="sscGpa" value={formData.sscGpa} onChange={handleChange} className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" placeholder="5.00" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">SSC Year</label>
                                            <input required type="text" name="sscYear" value={formData.sscYear} onChange={handleChange} className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" placeholder="2021" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 border-b border-purple-100 dark:border-purple-900/50 pb-3">HSC Details</h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">College Name</label>
                                        <input required type="text" name="college" value={formData.college} onChange={handleChange} className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">HSC GPA</label>
                                            <input required type="text" name="hscGpa" value={formData.hscGpa} onChange={handleChange} className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" placeholder="5.00" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">HSC Year</label>
                                            <input required type="text" name="hscYear" value={formData.hscYear} onChange={handleChange} className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" placeholder="2023" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-black/5 dark:border-white/5">
                            <div className="space-y-4 mt-4">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 border-b border-purple-100 dark:border-purple-900/50 pb-3">Family Details</h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Father's Occupation</label>
                                        <input required type="text" name="fatherOcc" value={formData.fatherOcc} onChange={handleChange} className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" placeholder="e.g. Service holder" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Mother's Occupation</label>
                                        <input required type="text" name="motherOcc" value={formData.motherOcc} onChange={handleChange} className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" placeholder="e.g. Housewife" />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4 mt-4">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 border-b border-purple-100 dark:border-purple-900/50 pb-3">Location Details</h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Permanent Address (From)</label>
                                        <input required type="text" name="fromArea" value={formData.fromArea} onChange={handleChange} className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" placeholder="e.g. Dhaka, Bangladesh" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Current Address</label>
                                        <input required type="text" name="currentArea" value={formData.currentArea} onChange={handleChange} className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" placeholder="e.g. Mirpur, Dhaka, Bangladesh" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 flex justify-center">
                        <Button disabled={isGenerating} type="submit" className="w-full sm:w-auto px-16 py-6 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full transition-all text-[11px] uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)]">
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Generating...
                                </>
                            ) : "Generate"}
                        </Button>
                    </div>
                </motion.form>

                {generatedIntro && (
                    <motion.div
                        ref={outputRef}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 p-8 bg-white dark:bg-purple-900/10 border border-purple-100 dark:border-purple-500/30 shadow-xl rounded-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-purple-400 to-indigo-500" />
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-600 dark:text-purple-400 flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Your Output
                            </h3>
                            <button
                                onClick={handleCopy}
                                type="button"
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-100 dark:bg-black/50 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-xs font-semibold text-gray-600 dark:text-gray-300 border border-black/5 dark:border-white/5"
                            >
                                {isCopied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                                {isCopied ? "Copied!" : "Copy"}
                            </button>
                        </div>
                        <p className="text-gray-800 dark:text-gray-300 text-lg leading-relaxed font-light whitespace-pre-wrap">
                            {generatedIntro}
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    )
}