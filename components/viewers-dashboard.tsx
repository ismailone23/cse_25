/* eslint-disable react-hooks/refs */
"use client"

import { useEffect, useRef, useState } from "react"
import { ScatterChart } from "@mui/x-charts/ScatterChart"
import { BarChart } from "@mui/x-charts/BarChart"
import { useTheme } from "next-themes"
import { Eye, Users, MousePointerClick, Globe } from "lucide-react"

type Props = {
  stats: { uniqueVisitors: number; totalViews: number }
  profileClicks: { name: string; clicks: number }[]
  visitorDetails: { ip: string; visits: number }[]
}

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any
  label: string
  value: number | string
  accent: string
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-lg dark:border-white/5 dark:bg-[#111]">
      <div className={`absolute top-0 left-0 h-full w-1 ${accent}`} />
      <div className="flex items-center gap-4">
        <div
          className={`rounded-xl bg-linear-to-br p-3 ${accent} text-white shadow-lg`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase dark:text-gray-400">
            {label}
          </p>
          <p className="mt-1 text-3xl font-bold text-black dark:text-white">
            {value}
          </p>
        </div>
      </div>
    </div>
  )
}

function useContainerWidth() {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(500)

  useEffect(() => {
    if (!ref.current) return
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width)
      }
    })
    observer.observe(ref.current)
    setWidth(ref.current.clientWidth)
    return () => observer.disconnect()
  }, [])

  return { ref, width }
}

export default function ViewersDashboard({
  stats,
  profileClicks,
  visitorDetails,
}: Props) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const scatterContainer = useContainerWidth()
  const barContainer = useContainerWidth()

  // Theme-aware colors
  const textColor = isDark ? "#ccc" : "#444"
  const gridColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"

  const chartSx = {
    "& .MuiChartsAxis-tickLabel": { fill: textColor, fontSize: 11 },
    "& .MuiChartsAxis-label": {
      fill: textColor,
      fontSize: 12,
      fontWeight: 600,
    },
    "& .MuiChartsLegend-label": { fill: textColor },
    "& .MuiChartsAxis-line": { stroke: gridColor },
    "& .MuiChartsAxis-tick": { stroke: gridColor },
    "& .MuiChartsGrid-line": { stroke: gridColor },
  }

  // Prepare scatter data
  const scatterData = profileClicks.map((item, index) => ({
    x: index + 1,
    y: item.clicks,
    id: item.name,
  }))

  // Prepare bar chart data
  const barLabels = visitorDetails.map((v) => {
    const parts = v.ip.split(".")
    return parts.length === 4 ? `*.*.*.${parts[3]}` : v.ip.slice(-6)
  })
  const barValues = visitorDetails.map((v) => v.visits)

  // Responsive chart height
  const chartHeight = Math.min(400, Math.max(280, scatterContainer.width * 0.5))

  return (
    <div className="min-h-screen bg-gray-50 px-6 pt-32 pb-20 dark:bg-[#050505]">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Header */}
        <div>
          <p className="mb-2 text-[10px] font-bold tracking-[0.3em] text-purple-600 uppercase dark:text-purple-400">
            Analytics
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
            Site{" "}
            <span className="bg-linear-to-r from-purple-500 to-indigo-500 bg-clip-text font-serif text-transparent italic">
              Viewers
            </span>
          </h1>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Real-time analytics from Redis.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Users}
            label="Unique Visitors"
            value={stats.uniqueVisitors}
            accent="from-purple-500 to-indigo-500"
          />
          <StatCard
            icon={Eye}
            label="Total Page Views"
            value={stats.totalViews}
            accent="from-blue-500 to-cyan-500"
          />
          <StatCard
            icon={MousePointerClick}
            label="Profile Clicks"
            value={profileClicks.reduce((a, b) => a + b.clicks, 0)}
            accent="from-pink-500 to-rose-500"
          />
          <StatCard
            icon={Globe}
            label="Tracked Profiles"
            value={profileClicks.length}
            accent="from-amber-500 to-orange-500"
          />
        </div>

        {/* Profile Clicks Scatter Chart */}
        <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-lg md:p-8 dark:border-white/5 dark:bg-[#111]">
          <h2 className="mb-6 text-xs font-bold tracking-widest text-purple-600 uppercase dark:text-purple-400">
            Profile Clicks — Scatter
          </h2>
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
                xAxis={[
                  {
                    label: "Profile",
                    min: 0,
                    max: profileClicks.length + 1,
                    tickInterval: scatterData.map((d) => d.x),
                    valueFormatter: (value: number) => {
                      const item = profileClicks[value - 1]
                      return item ? item.name.split(" ")[0] : ""
                    },
                  },
                ]}
                yAxis={[{ label: "Clicks", min: 0 }]}
                grid={{ horizontal: true }}
                sx={chartSx}
              />
            </div>
          ) : (
            <p className="py-12 text-center text-sm text-gray-400">
              No profile click data yet.
            </p>
          )}
          {/* Profile click table */}
          {profileClicks.length > 0 && (
            <div className="mt-6 border-t border-black/5 pt-6 dark:border-white/5">
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                <div className="border-b border-black/5 pb-2 text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase dark:border-white/5 dark:text-gray-400">
                  Name
                </div>
                <div className="border-b border-black/5 pb-2 text-right text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase dark:border-white/5 dark:text-gray-400">
                  Clicks
                </div>
                {profileClicks.map((p) => (
                  <div key={p.name} className="contents">
                    <div className="py-1.5 text-black dark:text-white">
                      {p.name}
                    </div>
                    <div className="py-1.5 text-right font-bold text-purple-600 dark:text-purple-400">
                      {p.clicks}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Visitor Bar Chart */}
        <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-lg md:p-8 dark:border-white/5 dark:bg-[#111]">
          <h2 className="mb-6 text-xs font-bold tracking-widest text-purple-600 uppercase dark:text-purple-400">
            Visitor Frequency — Bar
          </h2>
          {visitorDetails.length > 0 ? (
            <div ref={barContainer.ref} className="w-full">
              <BarChart
                width={barContainer.width}
                height={chartHeight}
                series={[
                  {
                    data: barValues,
                    label: "Visits",
                    color: isDark ? "#818cf8" : "#4f46e5",
                  },
                ]}
                xAxis={[
                  {
                    data: barLabels,
                    scaleType: "band",
                    label: "Visitor (masked IP)",
                  },
                ]}
                yAxis={[{ label: "Visits" }]}
                grid={{ horizontal: true }}
                sx={chartSx}
              />
            </div>
          ) : (
            <p className="py-12 text-center text-sm text-gray-400">
              No visitor data yet.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
