
const express = require('express');
const { ConvexHttpClient } = require('convex/browser');
const { api } = require('../../convex/_generated/api'); // Logic needs adjustment for generated types, using loose coupling for now or manual types
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
const convex = new ConvexHttpClient(process.env.CONVEX_URL);

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'user-service' });
});

app.post('/register', async (req, res) => {
    const { email, password, name, role } = req.body;
    try {
        // In a real app, hash password here
        const userId = await convex.mutation("api:createUser", {
            email,
            passwordHash: password, // Mock hash
            name,
            role: role || 'customer'
        });
        res.json({ userId, message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

app.get('/profile/:email', async (req, res) => {
    try {
        const user = await convex.query("api:getUserByEmail", { email: req.params.email });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

app.listen(port, () => {
    console.log(`User Service running on port ${port}`);
});
