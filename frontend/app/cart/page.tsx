
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CartPage() {
    // Mock cart data for now
    const [cart, setCart] = useState([
        { id: '1', name: 'Premium Wireless Headphones', price: 199.99, quantity: 1, image: '' },
        { id: '2', name: 'Ergonomic Office Chair', price: 299.99, quantity: 1, image: '' },
    ]);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleRemove = (id: string) => {
        setCart(cart.filter(item => item.id !== id));
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

            {cart.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">Your cart is empty.</p>
                    <Link href="/" className="inline-block px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div key={item.id} className="flex gap-4 p-4 border rounded-lg bg-white">
                                <div className="w-24 h-24 bg-gray-100 rounded-md flex-shrink-0">
                                    {/* Image placeholder */}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                                    <div className="mt-2 flex items-center gap-4">
                                        <span className="text-sm">Qty: {item.quantity}</span>
                                        <button
                                            onClick={() => handleRemove(item.id)}
                                            className="text-red-500 text-sm hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="h-fit p-6 border rounded-lg bg-gray-50">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                        </div>
                        <div className="border-t pt-4 mb-6">
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                        <button
                            onClick={async () => {
                                const token = localStorage.getItem('token');
                                if (!token) {
                                    window.location.href = '/login';
                                    return;
                                }

                                try {
                                    const res = await fetch('/api/orders/orders', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${token}`
                                        },
                                        body: JSON.stringify({
                                            items: cart.map(item => ({ productId: item.id, quantity: item.quantity, price: item.price })),
                                            total: total
                                        })
                                    });

                                    if (res.ok) {
                                        alert('Order placed successfully!');
                                        setCart([]);
                                    } else {
                                        alert('Failed to place order');
                                    }
                                } catch (e) {
                                    console.error(e);
                                    alert('Error processing order');
                                }
                            }}
                            className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 font-medium"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
