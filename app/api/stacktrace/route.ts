import { NextRequest, NextResponse } from "next/server";

export async function POST() {
    console.log("Enpoint hit");

    const ans = [1, 2, 3, 4]
    return NextResponse.json({
        success: true,
        data: ans
    })


}