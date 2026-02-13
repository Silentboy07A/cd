import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import jwt from 'jsonwebtoken';

const convex = new ConvexHttpClient(process.env.CONVEX_URL || "https://nautical-marten-546.convex.cloud");
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to verify token
function verifyToken(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return null;
    }

    try {
        return jwt.verify(token, JWT_SECRET) as any;
    } catch (err) {
        return null;
    }
}

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ userId: string }> }
) {
    const params = await context.params;
    const user = verifyToken(request);

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Ensure user can only access their own orders
    if (user.userId !== params.userId && user.role !== 'admin') {
        return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    try {
        const orders = await convex.query("api:getOrdersByUser" as any, { userId: params.userId });
        return NextResponse.json(orders);
    } catch (error) {
        console.error('Fetch orders error:', error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}
