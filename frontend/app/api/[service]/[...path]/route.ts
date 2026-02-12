
import { NextRequest, NextResponse } from 'next/server';

const SERVICES: Record<string, string> = {
    users: process.env.USER_SERVICE_URL || 'http://localhost:3001',
    products: process.env.PRODUCT_SERVICE_URL || 'http://localhost:3002',
    orders: process.env.ORDER_SERVICE_URL || 'http://localhost:3003',
    payments: process.env.PAYMENT_SERVICE_URL || 'http://localhost:3004',
};

export async function GET(req: NextRequest, { params }: { params: Promise<{ service: string; path: string[] }> }) {
    const resolvedParams = await params;
    return handleRequest(req, resolvedParams);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ service: string; path: string[] }> }) {
    const resolvedParams = await params;
    return handleRequest(req, resolvedParams);
}

// Helper to forward requests
async function handleRequest(req: NextRequest, params: { service: string; path: string[] }) {
    const serviceUrl = SERVICES[params.service];

    if (!serviceUrl) {
        return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    const path = params.path.join('/');
    const url = `${serviceUrl}/${path}`;

    try {
        const options: RequestInit = {
            method: req.method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (req.method === 'POST' || req.method === 'PUT') {
            const body = await req.json();
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);
        const data = await response.json();

        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error(`Proxy error to ${url}:`, error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
