import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        status: 'ok',
        envVars: {
            NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL || 'NOT SET',
            CONVEX_URL: process.env.CONVEX_URL || 'NOT SET',
            NODE_ENV: process.env.NODE_ENV || 'NOT SET',
        },
        timestamp: new Date().toISOString()
    });
}
