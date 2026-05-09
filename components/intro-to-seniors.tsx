"use client"
import { motion } from 'motion/react';
import { useState } from 'react'
import studentData from '@/data/students.json';
import { Link } from 'lucide-react';

interface Student {
    id: number;
    name: string;
    track: string;
    image: string;
    facebook: string;
}

interface StudentCardProps {
    student: Student;
    key?: any;
}

const StudentCard = ({ student }: StudentCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col group h-full relative transition-all duration-500 hover:-translate-y-2 hover:z-10 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(168,133,171,0.15)] bg-transparent hover:bg-white dark:hover:bg-[#0a0a0a]"
        >
            <div className="p-8 md:p-12 border-b border-black/5 dark:border-white/5 flex items-center justify-center transition-colors duration-500 group-hover:border-transparent">
                <div className="aspect-[1/1.2] w-full relative overflow-hidden rounded-sm bg-gray-200 dark:bg-[#1a1a1a]">
                    <img
                        src={student.image}
                        alt={student.name}
                        className="w-full h-full object-contain grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 group-hover:brightness-105 transition-all duration-700"
                        referrerPolicy="no-referrer"
                    />
                </div>
            </div>
            <div className="p-8 md:p-10 flex flex-col items-start text-left bg-gray-100 dark:bg-black/20 grow transition-colors duration-500 group-hover:bg-transparent">
                <h3 className="font-display text-[18px] md:text-[20px] text-black dark:text-white font-bold mb-2 tracking-tight uppercase">
                    {student.name}
                </h3>
                <p className="font-mono text-[10px] text-gray-500 dark:text-[#666666] uppercase tracking-[0.2em] leading-relaxed">
                    {student.track}
                </p>
                <div className="mt-8 grow flex items-end">
                    <a href={student.facebook} target="_mist" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-mono text-gray-500 dark:text-[#666666] hover:text-[#0866FF] dark:hover:text-purple-400 transition-all duration-300 uppercase tracking-widest group-hover:translate-x-1">
                        <Link className="w-4 h-4 transition-transform group-hover:scale-110" />
                        <span>Profile</span>
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

export default function IntroToSeniors() {
    const [students] = useState<Student[]>(studentData as Student[]);
    const [visibleCount, setVisibleCount] = useState(8);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 8);
    };

    return (
        <div className="bg-gray-50 dark:bg-[#050505] text-black dark:text-white antialiased min-h-screen flex flex-col relative font-sans overflow-x-hidden">
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none"></div>

            <main className="grow pt-[100px] pb-[160px] relative z-10 flex flex-col items-center">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto px-6 mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6"
                    >
                        Student <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-[#A885AB] italic font-serif">Introduction</span>
                    </motion.h2>
                </div>

                <div className="w-full max-w-[1400px] border-x border-black/5 dark:border-white/5 bg-white/50 dark:bg-black/20 backdrop-blur-3xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-y border-black/5 dark:border-white/5 divide-x divide-black/5 dark:divide-white/5">
                        {students.slice(0, visibleCount).map((student) => (
                            <div key={student.id} className="border-b border-black/5 dark:border-white/5 sm:border-b-0">
                                <StudentCard student={student} />
                            </div>
                        ))}
                    </div>
                    {visibleCount < students.length && (
                        <div className="mt-32 flex justify-center px-6">
                            <button
                                onClick={handleLoadMore}
                                className="border border-purple-500/50 text-purple-500 px-16 py-6 rounded-sm text-[12px] font-bold uppercase tracking-[0.5em] hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all duration-500"
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
