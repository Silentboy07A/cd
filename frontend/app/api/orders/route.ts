import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import jwt from 'jsonwebtoken';

const convex = new ConvexHttpClient(process.env.CONVEX_URL || "https://nautical-marten-546.convex.cloud");
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to verify token
function verifyToken(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return null;
    }

    try {
        return jwt.verify(token, JWT_SECRET) as any;
    } catch (err) {
        return null;
    }
}

export async function POST(request: NextRequest) {
    const user = verifyToken(request);

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { items, total } = await request.json();
        const userId = user.userId;

        const orderId = await convex.mutation("api:createOrder" as any, {
            userId, items, total, status: 'pending'
        });

        return NextResponse.json({ orderId, message: 'Order created' });
    } catch (error) {
        console.error('Create order error:', error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}
