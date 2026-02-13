// Script to add sample products to Convex database
// Run this with: node add-products.js

const { ConvexHttpClient } = require("convex/browser");

const convex = new ConvexHttpClient("https://nautical-marten-546.convex.cloud");

const sampleProducts = [
    {
        name: "Premium Wireless Headphones",
        description: "High-quality noise-canceling headphones with 30-hour battery life and premium sound quality",
        price: 199.99,
        stock: 50,
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
    },
    {
        name: "Ergonomic Office Chair",
        description: "Comfortable mesh office chair with lumbar support and adjustable armrests",
        price: 299.99,
        stock: 25,
        imageUrl: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&h=500&fit=crop"
    },
    {
        name: "Smart Watch Pro",
        description: "Advanced fitness tracker with heart rate monitor, GPS, and 7-day battery life",
        price: 349.99,
        stock: 100,
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop"
    },
    {
        name: "Mechanical Keyboard RGB",
        description: "Premium mechanical keyboard with customizable RGB lighting and Cherry MX switches",
        price: 149.99,
        stock: 75,
        imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop"
    },
    {
        name: "4K Webcam",
        description: "Professional 4K webcam with auto-focus and built-in noise-canceling microphone",
        price: 129.99,
        stock: 60,
        imageUrl: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=500&h=500&fit=crop"
    },
    {
        name: "Luxury Backpack",
        description: "Water-resistant laptop backpack with USB charging port and anti-theft design",
        price: 89.99,
        stock: 120,
        imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop"
    },
    {
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with precision tracking and long battery life",
        price: 49.99,
        stock: 200,
        imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop"
    },
    {
        name: "Standing Desk",
        description: "Electric height-adjustable standing desk with memory presets and cable management",
        price: 499.99,
        stock: 30,
        imageUrl: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=500&h=500&fit=crop"
    }
];

async function addProducts() {
    console.log("Adding sample products to Convex...\n");

    for (const product of sampleProducts) {
        try {
            await convex.mutation("api:createProduct", product);
            console.log(`✓ Added: ${product.name}`);
        } catch (error) {
            console.error(`✗ Failed to add ${product.name}:`, error.message);
        }
    }

    console.log("\nDone! Products added to database.");
}

addProducts();
