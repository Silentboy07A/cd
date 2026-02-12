
const express = require('express');
const { ConvexHttpClient } = require('convex/browser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3003;
const convex = new ConvexHttpClient(process.env.CONVEX_URL);
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

app.use(express.json());

// Middleware to verify token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'order-service' });
});

// Protect Order Creation
app.post('/orders', authenticateToken, async (req, res) => {
    const { items, total } = req.body;
    // Use userId from token for security
    const userId = req.user.userId;

    try {
        // Ideally validate items with Product Service here via HTTP call
        const orderId = await convex.mutation("api:createOrder", {
            userId, items, total, status: 'pending'
        });
        res.json({ orderId, message: 'Order created' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// Protect Order History
app.get('/orders/user/:userId', authenticateToken, async (req, res) => {
    // Ensure user can only access their own orders
    if (req.user.userId !== req.params.userId && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied' });
    }

    try {
        const orders = await convex.query("api:getOrdersByUser", { userId: req.params.userId });
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

app.listen(port, () => {
    console.log(`Order Service running on port ${port}`);
});
