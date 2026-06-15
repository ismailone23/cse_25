"use client"
import { motion } from "motion/react"
import { useState } from "react"
import studentData from "@/data/students.json"
import { Link } from "lucide-react"
import Image from "next/image"

interface Student {
  id: number
  name: string
  track: string
  image: string
}

interface StudentCardProps {
  student: Student
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  key?: any
}

const StudentCard = ({ student }: StudentCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="group relative flex h-full flex-col bg-transparent transition-all duration-500 hover:z-10 hover:-translate-y-2 hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:bg-[#0a0a0a] dark:hover:shadow-[0_20px_40px_-15px_rgba(168,133,171,0.15)]"
    >
      <div className="flex items-center justify-center border-b border-black/5 p-8 transition-colors duration-500 group-hover:border-transparent md:p-12 dark:border-white/5">
        <div className="relative aspect-[1/1.2] w-full overflow-hidden rounded-sm bg-gray-200 dark:bg-[#1a1a1a]">
          <Image
            src={student.image}
            alt={student.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="h-full w-full object-contain opacity-90 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:brightness-105 group-hover:grayscale-0"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
      <div className="flex grow flex-col items-start bg-gray-100 p-8 text-left transition-colors duration-500 group-hover:bg-transparent md:p-10 dark:bg-black/20">
        <h3 className="font-display mb-2 text-[18px] font-bold tracking-tight text-black uppercase md:text-[20px] dark:text-white">
          {student.name}
        </h3>
        <p className="font-mono text-[12px] leading-relaxed tracking-[0.2em] text-gray-500 uppercase dark:text-[#666666]">
          {student.track}
        </p>
      </div>
    </motion.div>
  )
}

export default function IntroToSeniors() {
  const [students] = useState<Student[]>(studentData as Student[])
  const [visibleCount, setVisibleCount] = useState(8)

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8)
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-gray-50 font-sans text-black antialiased dark:bg-[#050505] dark:text-white">
      {/* Subtle Grid Background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[40px_40px] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]"></div>

      <main className="relative z-10 flex grow flex-col items-center pt-25 pb-40">
        {/* Header Section */}
        <div className="mx-auto mb-20 max-w-3xl px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
          >
            Student
            <span className="bg-linear-to-r from-purple-500 to-[#A885AB] bg-clip-text font-serif text-transparent italic">
              Introduction
            </span>
          </motion.h2>
        </div>

        <div className="w-full max-w-350 border-x border-black/5 bg-white/50 backdrop-blur-3xl dark:border-white/5 dark:bg-black/20">
          <div className="grid grid-cols-1 divide-x divide-black/5 border-y border-black/5 sm:grid-cols-2 lg:grid-cols-4 dark:divide-white/5 dark:border-white/5">
            {students.slice(0, visibleCount).map((student) => (
              <div
                key={student.id}
                className="border-b border-black/5 sm:border-b-0 dark:border-white/5"
              >
                <StudentCard student={student} />
              </div>
            ))}
          </div>
          {visibleCount < students.length && (
            <div className="mt-32 flex justify-center px-6">
              <button
                onClick={handleLoadMore}
                className="rounded-sm border border-purple-500/50 px-16 py-6 text-[12px] font-bold tracking-[0.5em] text-purple-500 uppercase transition-all duration-500 hover:border-purple-500 hover:bg-purple-500 hover:text-white"
              >
                Explore More
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
