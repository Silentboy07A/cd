
const express = require('express');
const { ConvexHttpClient } = require('convex/browser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3002;
const convex = new ConvexHttpClient(process.env.CONVEX_URL);

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'product-service' });
});

app.get('/products', async (req, res) => {
    try {
        const products = await convex.query("api:getProducts");
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.post('/products', async (req, res) => {
    const { name, description, price, stock, imageUrl } = req.body;
    try {
        const productId = await convex.mutation("api:createProduct", {
            name, description, price, stock, imageUrl
        });
        res.json({ productId, message: 'Product created' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create product' });
    }
});

app.listen(port, () => {
    console.log(`Product Service running on port ${port}`);
});
