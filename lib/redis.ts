import { Redis } from '@upstash/redis'
import { headers } from 'next/headers'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})


export async function trackVisitor() {
  try {
    const headerList = await headers();
    const forwardedFor = headerList.get("x-forwarded-for");
    const realIp = headerList.get("x-real-ip");
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : (realIp || "unknown-ip");

    if (ip === "unknown-ip" && process.env.NODE_ENV === "production") return;

    await redis.hincrby("site_visitors:ip_counts", ip, 1);
    
    await redis.incr("site_visitors:total_views");

  } catch (error) {
    console.error("Failed to track visitor in Redis:", error);
  }
}


export async function getVisitorStats() {
  try {
    const uniqueVisitors = await redis.hlen("site_visitors:ip_counts");
    const totalViews = await redis.get<number>("site_visitors:total_views") || 0;
    
    return { uniqueVisitors, totalViews };
  } catch (error) {
    console.error("Failed to fetch visitor stats:", error);
    return { uniqueVisitors: 0, totalViews: 0 };
  }
}

export async function getProfileClicks(): Promise<{ name: string; clicks: number }[]> {
  try {
    // ZRANGE with WITHSCORES returns all members and their scores, sorted by score desc
    const result = await redis.zrange<string[]>("profile_clicks", 0, -1, { withScores: true, rev: true });
    
    // Result comes as [member1, score1, member2, score2, ...]
    const data: { name: string; clicks: number }[] = [];
    for (let i = 0; i < result.length; i += 2) {
      data.push({ name: result[i], clicks: Number(result[i + 1]) });
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch profile clicks:", error);
    return [];
  }
}

export async function getVisitorDetails(): Promise<{ ip: string; visits: number }[]> {
  try {
    const allVisitors = await redis.hgetall<Record<string, string>>("site_visitors:ip_counts");
    if (!allVisitors) return [];
    
    return Object.entries(allVisitors).map(([ip, visits]) => ({
      ip,
      visits: Number(visits),
    }));
  } catch (error) {
    console.error("Failed to fetch visitor details:", error);
    return [];
  }
}
