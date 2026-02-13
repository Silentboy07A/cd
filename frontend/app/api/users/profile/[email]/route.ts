import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';

const convex = new ConvexHttpClient(process.env.CONVEX_URL || "https://nautical-marten-546.convex.cloud");

export async function GET(
    request: NextRequest,
    { params }: { params: { email: string } }
) {
    try {
        const email = params.email;
        const user = await convex.query("api:getUserByEmail" as any, { email });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Don't return password hash
        const { passwordHash, ...userProfile } = user;
        return NextResponse.json(userProfile);
    } catch (error) {
        console.error('Profile fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
    }
}
