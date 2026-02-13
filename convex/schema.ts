
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        email: v.string(),
        passwordHash: v.string(),
        name: v.string(),
        role: v.string(), // "admin" | "customer"
    }).index("by_email", ["email"]),

    products: defineTable({
        name: v.string(),
        description: v.string(),
        price: v.number(),
        stock: v.number(),
        category: v.string(), // "Mobile", "Laptop", "Electronics", etc.
        imageUrl: v.optional(v.string()),
    }),

    orders: defineTable({
        userId: v.id("users"),
        items: v.array(
            v.object({
                productId: v.id("products"),
                quantity: v.number(),
                price: v.number(),
            })
        ),
        total: v.number(),
        status: v.string(), // "pending", "paid", "shipped"
        paymentId: v.optional(v.id("payments")),
    }).index("by_user", ["userId"]),

    payments: defineTable({
        orderId: v.id("orders"),
        amount: v.number(),
        status: v.string(), // "success", "failed"
        transactionId: v.string(),
    }),
});
