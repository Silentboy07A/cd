import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const convex = new ConvexHttpClient(process.env.CONVEX_URL || "https://nautical-marten-546.convex.cloud");
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
    try {
        const { email, password, name, role } = await request.json();

        if (!email || !password || !name) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        // Check if user exists
        const existingUser = await convex.query("api:getUserByEmail" as any, { email });
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in Convex
        const userId = await convex.mutation("api:createUser" as any, {
            email,
            passwordHash: hashedPassword,
            name,
            role: role || 'customer'
        });

        // Generate Token
        const token = jwt.sign({ userId, email, role: role || 'customer' }, JWT_SECRET, { expiresIn: '1h' });

        return NextResponse.json({ userId, token, message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
    }
}
