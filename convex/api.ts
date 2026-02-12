
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// User Functions
export const createUser = mutation({
    args: { email: v.string(), passwordHash: v.string(), name: v.string(), role: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db.insert("users", args);
    },
});

export const getUserByEmail = query({
    args: { email: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .first();
    },
});

// Product Functions
export const createProduct = mutation({
    args: { name: v.string(), description: v.string(), price: v.number(), stock: v.number(), imageUrl: v.optional(v.string()) },
    handler: async (ctx, args) => {
        return await ctx.db.insert("products", args);
    },
});

export const getProducts = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("products").collect();
    },
});

export const getProduct = query({
    args: { id: v.id("products") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

// Order Functions
export const createOrder = mutation({
    args: {
        userId: v.id("users"),
        items: v.array(v.object({ productId: v.id("products"), quantity: v.number(), price: v.number() })),
        total: v.number(),
        status: v.string()
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("orders", args);
    },
});

export const getOrdersByUser = query({
    args: { userId: v.id("users") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("orders")
            .withIndex("by_user", (q) => q.eq("userId", args.userId))
            .collect();
    },
});

// Payment Functions
export const createPayment = mutation({
    args: { orderId: v.id("orders"), amount: v.number(), status: v.string(), transactionId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db.insert("payments", args);
    },
});
