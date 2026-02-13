// Script to add Amazon-style products with categories (INR prices)
// Run: node add-amazon-products.js

const { ConvexHttpClient } = require("convex/browser");

const convex = new ConvexHttpClient("https://dependable-squid-960.convex.cloud");

const products = [
    // Mobile Category
    {
        name: "OnePlus 12 5G",
        description: "12GB RAM, 256GB Storage, Snapdragon 8 Gen 3, 6.7\" AMOLED Display, 100W Fast Charging",
        price: 64999,
        stock: 50,
        category: "Mobile",
        imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop"
    },
    {
        name: "Samsung Galaxy S24 Ultra",
        description: "12GB RAM, 256GB Storage, 200MP Camera, S Pen, 6.8\" Dynamic AMOLED Display",
        price: 129999,
        stock: 30,
        category: "Mobile",
        imageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&h=500&fit=crop"
    },
    {
        name: "iPhone 15 Pro",
        description: "256GB Storage, A17 Pro Chip, Titanium Design, 48MP Camera, USB-C",
        price: 134900,
        stock: 40,
        category: "Mobile",
        imageUrl: "https://images.unsplash.com/photo-1592286927806-0072a5a264e8?w=500&h=500&fit=crop"
    },

    // Laptop Category
    {
        name: "Dell XPS 15",
        description: "Intel i7 13th Gen, 16GB RAM, 512GB SSD, 15.6\" 4K OLED, NVIDIA RTX 4050",
        price: 169999,
        stock: 25,
        category: "Laptop",
        imageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=500&fit=crop"
    },
    {
        name: "MacBook Air M3",
        description: "M3 Chip, 16GB RAM, 512GB SSD, 15.3\" Liquid Retina Display, All-Day Battery",
        price: 134900,
        stock: 35,
        category: "Laptop",
        imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop"
    },
    {
        name: "ASUS ROG Strix G16",
        description: "Intel i9 14th Gen, 32GB RAM, 1TB SSD, RTX 4070, 16\" 240Hz Display",
        price: 189999,
        stock: 20,
        category: "Laptop",
        imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=500&fit=crop"
    },

    // Electronics Category
    {
        name: "Sony WH-1000XM5",
        description: "Premium Noise Canceling Headphones, 30Hr Battery, Multipoint Connection",
        price: 29990,
        stock: 100,
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
    },
    {
        name: "Apple Watch Series 9",
        description: "GPS + Cellular, 45mm, Always-On Retina Display, Health & Fitness Tracking",
        price: 44900,
        stock: 75,
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500&h=500&fit=crop"
    },
    {
        name: "Canon EOS R6 Mark II",
        description: "Full-Frame Mirrorless Camera, 24.2MP, 6K Video, In-Body Stabilization",
        price: 229999,
        stock: 15,
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=500&fit=crop"
    },

    // Accessories Category
    {
        name: "Keychron K8 Pro",
        description: "Wireless Mechanical Keyboard, Hot-swappable, RGB Backlight, Aluminum Frame",
        price: 9999,
        stock: 150,
        category: "Accessories",
        imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop"
    },
    {
        name: "Logitech MX Master 3S",
        description: "Wireless Performance Mouse, 8K DPI, Quiet Clicks, Multi-Device",
        price: 8995,
        stock: 200,
        category: "Accessories",
        imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop"
    },
    {
        name: "Anker PowerCore 26800mAh",
        description: "High Capacity Power Bank, 3 USB Ports, Fast Charging, Premium Build",
        price: 4999,
        stock: 300,
        category: "Accessories",
        imageUrl: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop"
    }
];

async function addProducts() {
    console.log("Adding Amazon-style products with categories (INR)...\n");

    for (const product of products) {
        try {
            await convex.mutation("api:createProduct", product);
            console.log(`✓ Added: ${product.name} (${product.category}) - ₹${product.price.toLocaleString('en-IN')}`);
        } catch (error) {
            console.error(`✗ Failed to add ${product.name}:`, error.message);
        }
    }

    console.log("\n✅ Done! Products added to database.");
}

addProducts();
