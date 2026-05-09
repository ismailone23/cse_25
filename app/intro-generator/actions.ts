"use server"
import { headers } from "next/headers";

type RateLimitData = { count: number, firstRequestTime: number };
const rateLimitMap = new Map<string, RateLimitData>();

export async function generateIntroAction(formData: Record<string, string>) {
    try {
        const headerList = await headers();
        const ip = headerList.get("x-forwarded-for") || "unknown-ip";
        
        const now = Date.now();
        const windowMs = 5 * 60 * 1000;
        const limit = 2;
        
        const userLimitData = rateLimitMap.get(ip) || { count: 0, firstRequestTime: now };
        
        if (now - userLimitData.firstRequestTime > windowMs) {
            userLimitData.count = 1;
            userLimitData.firstRequestTime = now;
        } else {
            userLimitData.count++;
            if (userLimitData.count > limit) {
                return { success: false, error: "Rate limit exceeded. You can only generate 2 introductions per 5 minutes. Please wait and try again." };
            }
        }
        rateLimitMap.set(ip, userLimitData);

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return { success: false, error: "OPENAI_API_KEY is not set in the environment variables." };
        }

    const systemPrompt = `You are an expert translator and assistant. Your task is to generate a natural-sounding introduction entirely in the Bengali (Bangla) language, using the user's provided details.

You MUST follow this exact structure, replacing the bracketed placeholders with the user's data:
"আসসালামু আলাইকুম, ভাই।
আমার নাম [Name]
আমার বাবা পেশায় একজন [Father's Occupation]। আমার মাতা পেশায় একজন [Mother's Occupation]।
আমি [SSC Year] সালে [School] থেকে গড় দশমিক মান [SSC GPA] পেয়ে মাধ্যমিক পরীক্ষায় উত্তীর্ণ হয়েছি এবং আমি [HSC Year] সালে [College] থেকে গড় দশমিক মান [HSC GPA] পেয়ে উচ্চ মাধ্যমিক পরীক্ষায় উত্তীর্ণ হয়েছি। বর্তমানে আমি "সামরিক বিজ্ঞান ও প্রযুক্তি প্রতিষ্ঠান" এর "গণনাযন্ত্র বিজ্ঞান ও প্রকৌশল" বিভাগের 26 তম দলের ১ম বর্ষে অধ্যয়ন করছি।
আমার স্থায়ী ঠিকানা: [From Area]। এবং বর্তমানে আমি [Current Area] আছি।
আসসালামু আলাইকুম, ভাই।"

CRITICAL RULES:
1. FULL BANGLA: The entire output must be in Bengali script.
2. TRANSLATE MEANING FOR INSTITUTION NAMES: When dealing with school or college names, translate common English words into proper Bangla words (think like a human translating into pure Bangla). For example:
   - "School" -> "বিদ্যালয়"
   - "High" -> "উচ্চ"
   - "Cantonment" -> "সেনানিবাস"
   - "College" -> "মহাবিদ্যালয়"
   - "Govt" / "Government" -> "সরকারি"
   - "Boys" -> "বালক"
   - "Girls" -> "বালিকা"
   Do not just transliterate "School" as "স্কুল" or "High" as "হাই", you must translate their meaning.
3. FAMOUS INSTITUTIONS & PROPER NOUNS:
   - Analyze school and college names to see if they are well-known Bangladeshi institutions. If they are, use their STANDARD widely accepted Bangla spelling.
   - CRITICAL EXAMPLES: "Adamjee" MUST be spelled "আদমজী" (NOT "অ্যাডামজি"). "Notre Dame" MUST be spelled "নটর ডেম". "Dhaka" MUST be spelled "ঢাকা".
   - For other general proper nouns, transliterate them naturally into Bangla script.
4. NAME PRESERVATION: Transliterate the user's name exactly as provided. NEVER alter, auto-correct, or guess the spelling (e.g., "Ismail" MUST remain "ইসমাইল" and NOT be changed to "ইসলামী").

Do not include any extra text or conversation, just return the final Bangla introduction.`;

    const userPrompt = `Fields:
Name: ${formData.name}
Father's Occupation: ${formData.fatherOcc}
Mother's Occupation: ${formData.motherOcc}
School: ${formData.school}
SSC GPA: ${formData.sscGpa}
SSC Year: ${formData.sscYear}
College: ${formData.college}
HSC GPA: ${formData.hscGpa}
HSC Year: ${formData.hscYear}
Permanent Address: ${formData.fromArea}
Current Address: ${formData.currentArea}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ]
        })
    });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("OpenAI Error:", errorData);
            return { success: false, error: "Failed to generate introduction from OpenAI." };
        }

        const data = await response.json();
        return { success: true, data: data.choices[0].message.content };
    } catch (error: any) {
        console.error(error);
        return { success: false, error: "An unexpected error occurred." };
    }
}
