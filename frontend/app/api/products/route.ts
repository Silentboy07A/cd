import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';

// Get Convex URL with fallback
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL ||
    process.env.CONVEX_URL ||
    "https://dependable-squid-960.convex.cloud";

console.log('Products API - Convex URL:', convexUrl);

const convex = new ConvexHttpClient(convexUrl);

export async function GET() {
    try {
        console.log('Fetching products from Convex...');
        const products = await convex.query("api:getProducts" as any);
        console.log('Products fetched:', products?.length || 0);
        return NextResponse.json(products || []);
    } catch (error: any) {
        console.error('Fetch products error:', error);
        console.error('Error details:', error.message, error.stack);
        return NextResponse.json({
            error: 'Failed to fetch products',
            details: error.message,
            convexUrl: convexUrl
        }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { name, description, price, stock, imageUrl, category } = await request.json();

        const productId = await convex.mutation("api:createProduct" as any, {
            name, description, price, stock, imageUrl, category
        });

        return NextResponse.json({ productId, message: 'Product created' });
    } catch (error: any) {
        console.error('Create product error:', error);
        return NextResponse.json({
            error: 'Failed to create product',
            details: error.message
        }, { status: 500 });
    }
}
