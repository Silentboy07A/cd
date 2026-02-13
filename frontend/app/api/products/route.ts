import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';

const convex = new ConvexHttpClient(
    process.env.NEXT_PUBLIC_CONVEX_URL ||
    process.env.CONVEX_URL ||
    "https://dependable-squid-960.convex.cloud"
);

export async function GET() {
    try {
        const products = await convex.query("api:getProducts" as any);
        return NextResponse.json(products);
    } catch (error) {
        console.error('Fetch products error:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { name, description, price, stock, imageUrl } = await request.json();

        const productId = await convex.mutation("api:createProduct" as any, {
            name, description, price, stock, imageUrl
        });

        return NextResponse.json({ productId, message: 'Product created' });
    } catch (error) {
        console.error('Create product error:', error);
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
