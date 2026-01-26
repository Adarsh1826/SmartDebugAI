import { NextRequest, NextResponse } from "next/server";
import { DEBUG_PROMPT } from "@/lib/errordebug";
import axios from "axios";

export async function POST(req: NextRequest) {
    const pastedError = await req.text();

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent`,
            {
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                text: `${DEBUG_PROMPT}\n\n${pastedError}`
                            }
                        ]
                    }
                ]
            },
            {
                headers: {
                    "Content-Type": "application/json"
                },
                params: {
                    key: process.env.GEMINI_API_KEY
                }
            }
        );

        return NextResponse.json({
            success: true,
            result: response.data
        });

    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                error: error.response?.data || error.message
            },
            { status: 500 }
        );
    }
}
