
const express = require('express');
const { ConvexHttpClient } = require('convex/browser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3004;
const convex = new ConvexHttpClient(process.env.CONVEX_URL || "https://benevolent-clownfish-573.convex.cloud");

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'payment-service' });
});

app.post('/pay', async (req, res) => {
    const { orderId, amount } = req.body;
    try {
        // Mock payment processing
        const transactionId = `txn_${Date.now()}`;
        const paymentId = await convex.mutation("api:createPayment", {
            orderId, amount, status: 'success', transactionId
        });

        // Update order status (would optimally be a separate internal mutation or repeated call)
        // For simplicity, we just record the payment

        res.json({ paymentId, status: 'success', transactionId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Payment failed' });
    }
});

app.listen(port, () => {
    console.log(`Payment Service running on port ${port}`);
});
