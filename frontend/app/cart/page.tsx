
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartPage() {
    // Mock cart data for now
    const [cart, setCart] = useState([
        { id: '1', name: 'Premium Wireless Headphones', price: 199.99, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop' },
        { id: '2', name: 'Ergonomic Office Chair', price: 299.99, quantity: 1, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=200&h=200&fit=crop' },
    ]);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleRemove = (id: string) => {
        setCart(cart.filter(item => item.id !== id));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-12">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <ShoppingBag className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Shopping Cart
                        </h1>
                        <p className="text-gray-600">{cart.length} items in your cart</p>
                    </div>
                </div>

                {cart.length === 0 ? (
                    <div className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20">
                        <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                            <ShoppingBag className="w-12 h-12 text-gray-400" />
                        </div>
                        <p className="text-gray-600 mb-6 text-lg">Your cart is empty</p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-semibold"
                        >
                            Continue Shopping
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-6 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200">
                                    <div className="w-28 h-28 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex-shrink-0 overflow-hidden">
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                No image
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-xl text-gray-900 mb-2">{item.name}</h3>
                                        <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                                            ${item.price.toFixed(2)}
                                        </p>
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-4 py-2">
                                                <span className="text-sm font-medium text-gray-700">Qty:</span>
                                                <span className="text-lg font-bold text-gray-900">{item.quantity}</span>
                                            </div>
                                            <button
                                                onClick={() => handleRemove(item.id)}
                                                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="h-fit">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
                                    <h2 className="text-2xl font-bold text-white">Order Summary</h2>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="flex justify-between items-center py-3">
                                        <span className="text-gray-700 font-medium">Subtotal</span>
                                        <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-t border-gray-200">
                                        <span className="text-gray-700 font-medium">Shipping</span>
                                        <span className="text-green-600 font-bold">FREE</span>
                                    </div>
                                    <div className="flex justify-between items-center py-4 border-t-2 border-gray-300">
                                        <span className="text-xl font-bold text-gray-900">Total</span>
                                        <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                            ${total.toFixed(2)}
                                        </span>
                                    </div>
                                    <button
                                        onClick={async () => {
                                            const token = localStorage.getItem('token');
                                            if (!token) {
                                                window.location.href = '/login';
                                                return;
                                            }

                                            try {
                                                const res = await fetch('/api/orders', {
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
                                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-bold rounded-xl hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                                    >
                                        Proceed to Checkout
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                    <p className="text-center text-sm text-gray-500 mt-4">
                                        ✨ Secure checkout with encryption
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
