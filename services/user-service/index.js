
const express = require('express');
const { ConvexHttpClient } = require('convex/browser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
const convex = new ConvexHttpClient(process.env.CONVEX_URL);
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // In prod, use .env

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'user-service' });
});

app.post('/register', async (req, res) => {
    const { email, password, name, role } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    try {
        // Check if user exists (using Convex query)
        const existingUser = await convex.query("api:getUserByEmail", { email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in Convex
        const userId = await convex.mutation("api:createUser", {
            email,
            passwordHash: hashedPassword,
            name,
            role: role || 'customer'
        });

        // Generate Token
        const token = jwt.sign({ userId, email, role: role || 'customer' }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ userId, token, message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await convex.query("api:getUserByEmail", { email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { email: user.email, name: user.name, role: user.role } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed' });
    }
});

app.get('/profile/:email', async (req, res) => {
    // Simple check - in real world, use middleware to verify token from Authorization header
    try {
        const user = await convex.query("api:getUserByEmail", { email: req.params.email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Don't return password hash
        const { passwordHash, ...userProfile } = user;
        res.json(userProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

app.listen(port, () => {
    console.log(`User Service running on port ${port}`);
});
