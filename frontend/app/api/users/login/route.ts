import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const convex = new ConvexHttpClient(process.env.CONVEX_URL || "https://nautical-marten-546.convex.cloud");
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        const user = await convex.query("api:getUserByEmail" as any, { email });
        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return NextResponse.json({
            token,
            user: { email: user.email, name: user.name, role: user.role }
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Login failed' }, { status: 500 });
    }
}
