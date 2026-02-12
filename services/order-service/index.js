
const express = require('express');
const { ConvexHttpClient } = require('convex/browser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3003;
const convex = new ConvexHttpClient(process.env.CONVEX_URL);

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'order-service' });
});

app.post('/orders', async (req, res) => {
    const { userId, items, total } = req.body;
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

app.get('/orders/user/:userId', async (req, res) => {
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
