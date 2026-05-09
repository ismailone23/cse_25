"use client"

import { useEffect, useRef, useState } from "react";
import { ScatterChart } from "@mui/x-charts/ScatterChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "next-themes";
import { Eye, Users, MousePointerClick, Globe } from "lucide-react";

type Props = {
    stats: { uniqueVisitors: number; totalViews: number };
    profileClicks: { name: string; clicks: number }[];
    visitorDetails: { ip: string; visits: number }[];
};

function StatCard({ icon: Icon, label, value, accent }: { icon: any; label: string; value: number | string; accent: string }) {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/5 bg-white dark:bg-[#111] p-6 shadow-lg">
            <div className={`absolute top-0 left-0 w-1 h-full ${accent}`} />
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-linear-to-br ${accent} text-white shadow-lg`}>
                    <Icon className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">{label}</p>
                    <p className="text-3xl font-bold text-black dark:text-white mt-1">{value}</p>
                </div>
            </div>
        </div>
    );
}

function useContainerWidth() {
    const ref = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(500);

    useEffect(() => {
        if (!ref.current) return;
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setWidth(entry.contentRect.width);
            }
        });
        observer.observe(ref.current);
        setWidth(ref.current.clientWidth);
        return () => observer.disconnect();
    }, []);

    return { ref, width };
}

export default function ViewersDashboard({ stats, profileClicks, visitorDetails }: Props) {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    const scatterContainer = useContainerWidth();
    const barContainer = useContainerWidth();

    // Theme-aware colors
    const textColor = isDark ? "#ccc" : "#444";
    const gridColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

    const chartSx = {
        "& .MuiChartsAxis-tickLabel": { fill: textColor, fontSize: 11 },
        "& .MuiChartsAxis-label": { fill: textColor, fontSize: 12, fontWeight: 600 },
        "& .MuiChartsLegend-label": { fill: textColor },
        "& .MuiChartsAxis-line": { stroke: gridColor },
        "& .MuiChartsAxis-tick": { stroke: gridColor },
        "& .MuiChartsGrid-line": { stroke: gridColor },
    };

    // Prepare scatter data
    const scatterData = profileClicks.map((item, index) => ({
        x: index + 1,
        y: item.clicks,
        id: item.name,
    }));

    // Prepare bar chart data
    const barLabels = visitorDetails.map(v => {
        const parts = v.ip.split(".");
        return parts.length === 4 ? `*.*.*.${parts[3]}` : v.ip.slice(-6);
    });
    const barValues = visitorDetails.map(v => v.visits);

    // Responsive chart height
    const chartHeight = Math.min(400, Math.max(280, scatterContainer.width * 0.5));

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-gray-50 dark:bg-[#050505]">
            <div className="max-w-6xl mx-auto space-y-10">
                {/* Header */}
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-purple-600 dark:text-purple-400 mb-2">Analytics</p>
                    <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white">
                        Site <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-indigo-500 italic font-serif">Viewers</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm">Real-time analytics from Redis.</p>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard icon={Users} label="Unique Visitors" value={stats.uniqueVisitors} accent="from-purple-500 to-indigo-500" />
                    <StatCard icon={Eye} label="Total Page Views" value={stats.totalViews} accent="from-blue-500 to-cyan-500" />
                    <StatCard icon={MousePointerClick} label="Profile Clicks" value={profileClicks.reduce((a, b) => a + b.clicks, 0)} accent="from-pink-500 to-rose-500" />
                    <StatCard icon={Globe} label="Tracked Profiles" value={profileClicks.length} accent="from-amber-500 to-orange-500" />
                </div>

                {/* Profile Clicks Scatter Chart */}
                <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-white dark:bg-[#111] p-4 md:p-8 shadow-lg">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 mb-6">Profile Clicks — Scatter</h2>
                    {profileClicks.length > 0 ? (
                        <div ref={scatterContainer.ref} className="w-full">
                            <ScatterChart
                                width={scatterContainer.width}
                                height={chartHeight}
                                series={[
                                    {
                                        data: scatterData,
                                        label: "Clicks",
                                        color: isDark ? "#c084fc" : "#9333ea",
                                    },
                                ]}
                                xAxis={[{
                                    label: "Profile",
                                    min: 0,
                                    max: profileClicks.length + 1,
                                    tickInterval: scatterData.map(d => d.x),
                                    valueFormatter: (value: number) => {
                                        const item = profileClicks[value - 1];
                                        return item ? item.name.split(" ")[0] : "";
                                    },
                                }]}
                                yAxis={[{ label: "Clicks", min: 0 }]}
                                grid={{ horizontal: true }}
                                sx={chartSx}
                            />
                        </div>
                    ) : (
                        <p className="text-gray-400 text-sm text-center py-12">No profile click data yet.</p>
                    )}
                    {/* Profile click table */}
                    {profileClicks.length > 0 && (
                        <div className="mt-6 border-t border-black/5 dark:border-white/5 pt-6">
                            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 pb-2 border-b border-black/5 dark:border-white/5">Name</div>
                                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 pb-2 border-b border-black/5 dark:border-white/5 text-right">Clicks</div>
                                {profileClicks.map((p) => (
                                    <div key={p.name} className="contents">
                                        <div className="text-black dark:text-white py-1.5">{p.name}</div>
                                        <div className="text-purple-600 dark:text-purple-400 py-1.5 text-right font-bold">{p.clicks}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Visitor Bar Chart */}
                <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-white dark:bg-[#111] p-4 md:p-8 shadow-lg">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 mb-6">Visitor Frequency — Bar</h2>
                    {visitorDetails.length > 0 ? (
                        <div ref={barContainer.ref} className="w-full">
                            <BarChart
                                width={barContainer.width}
                                height={chartHeight}
                                series={[{ data: barValues, label: "Visits", color: isDark ? "#818cf8" : "#4f46e5" }]}
                                xAxis={[{
                                    data: barLabels,
                                    scaleType: "band",
                                    label: "Visitor (masked IP)",
                                }]}
                                yAxis={[{ label: "Visits" }]}
                                grid={{ horizontal: true }}
                                sx={chartSx}
                            />
                        </div>
                    ) : (
                        <p className="text-gray-400 text-sm text-center py-12">No visitor data yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
