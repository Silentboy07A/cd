import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';

const convex = new ConvexHttpClient(process.env.CONVEX_URL || "https://nautical-marten-546.convex.cloud");

export async function POST(request: NextRequest) {
    try {
        const { orderId, amount } = await request.json();

        // Mock payment processing
        const transactionId = `txn_${Date.now()}`;
        const paymentId = await convex.mutation("api:createPayment" as any, {
            orderId, amount, status: 'success', transactionId
        });

        return NextResponse.json({ paymentId, status: 'success', transactionId });
    } catch (error) {
        console.error('Payment error:', error);
        return NextResponse.json({ error: 'Payment failed' }, { status: 500 });
    }
}
