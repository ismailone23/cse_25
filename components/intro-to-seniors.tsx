"use client"
import { motion } from "motion/react"
import { useState } from "react"
import studentData from "@/data/students.json"
import { GraduationCap, MapPin } from "lucide-react"
import Image from "next/image"

interface Student {
  id: number
  name: string
  track: string
  image: string
  college?: string
  hometown?: string
}

interface StudentCardProps {
  student: Student
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  key?: any
}

const StudentCard = ({ student }: StudentCardProps) => {
  const college = student.college?.trim() || "N/A"
  const hometown = student.hometown?.trim() || "N/A"

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex items-center gap-4 rounded-xl border border-black/5 bg-white/50 p-4 transition-all duration-300 hover:scale-[1.02] hover:bg-white hover:shadow-lg dark:border-white/5 dark:bg-black/20 dark:hover:bg-[#0a0a0a]"
    >
      <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-[#1a1a1a]">
        <Image
          src={student.image}
          alt={student.name}
          fill
          sizes="80px"
          className="h-full w-full object-contain opacity-90 grayscale transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex min-w-0 flex-col justify-center">
        <h3 className="font-display truncate text-base font-bold tracking-tight text-black uppercase dark:text-white">
          {student.name}
        </h3>
        <p className="mt-1 font-mono text-[11px] leading-relaxed tracking-[0.2em] text-gray-500 uppercase dark:text-[#888888]">
          {student.track}
        </p>
        <div className="mt-3 space-y-1.5 text-[11px] leading-relaxed text-gray-600 dark:text-[#a1a1a1]">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{college}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{hometown}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function IntroToSeniors() {
  const [students] = useState<Student[]>(studentData as Student[])
  const [visibleCount, setVisibleCount] = useState(21)

  const handleLoadMore = () => {
    setVisibleCount(() => students.length)
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
            Meet our
            <br />
            <span className="bg-linear-to-r from-purple-500 to-[#A885AB] bg-clip-text font-serif text-transparent italic">
              CSE 25 Students
            </span>
          </motion.h2>
        </div>

        <div className="w-full max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {students.slice(0, visibleCount).map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
          {visibleCount < students.length && (
            <div className="mt-20 flex justify-center px-6">
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
