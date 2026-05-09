import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get('name');
    const url = searchParams.get('url');

    if (name && url) {
        try {
            // Use a Sorted Set to track profile clicks. 
            // ZINCRBY increments the score of the member (name) in the sorted set by 1.
            await redis.zincrby("profile_clicks", 1, name);
        } catch (error) {
            console.error("Failed to record profile click:", error);
        }
        // Redirect the user to the actual facebook/profile link
        return NextResponse.redirect(new URL(url), 302);
    }
    
    return new NextResponse("Invalid parameters", { status: 400 });
}
