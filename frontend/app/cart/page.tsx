
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trash2, ShoppingCart as CartIcon } from 'lucide-react';

export default function CartPage() {
    const [cart, setCart] = useState([
        { id: '1', name: 'OnePlus 12 5G (12GB RAM, 256GB)', price: 64999, quantity: 1, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop' },
        { id: '2', name: 'Dell XPS 15 Laptop', price: 169999, quantity: 1, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=200&h=200&fit=crop' },
    ]);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleRemove = (id: string) => {
        setCart(cart.filter(item => item.id !== id));
    };

    return (
        <div className="bg-[#eaeded] min-h-screen py-4">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-normal mb-6 text-gray-900">Shopping Cart</h1>

                {cart.length === 0 ? (
                    <div className="bg-white rounded p-12 text-center border border-gray-300">
                        <CartIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-6 text-lg">Your cart is empty</p>
                        <Link
                            href="/"
                            className="inline-block px-6 py-2 bg-[#FFD814] hover:bg-[#F7CA00] text-black rounded-lg font-medium transition-colors border border-[#c7c11e]"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-4">
                        {/* Cart items*/}
                        <div className="md:col-span-2 bg-white rounded p-5 border border-gray-300">
                            <div className="space-y-4">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-b-0">
                                        {/* Image */}
                                        <div className="w-32 h-32 bg-white flex-shrink-0 border border-gray-200 rounded p-2">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                    No image
                                                </div>
                                            )}
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1">
                                            <h3 className="font-normal text-base text-gray-900 mb-1 hover:text-[#c45500] cursor-pointer">
                                                {item.name}
                                            </h3>
                                            <p className="text-sm text-green-700 mb-2">In stock</p>
                                            <div className="text-xl font-normal text-gray-900 mb-3">
                                                <span className="text-sm align-top">₹</span>
                                                {Math.floor(item.price).toLocaleString('en-IN')}
                                            </div>

                                            <div className="flex items-center gap-4">
                                                {/* Quantity selector */}
                                                <select
                                                    value={item.quantity}
                                                    className="border border-gray-400 rounded px-2 py-1 bg-[#F0F2F2] text-sm"
                                                    onChange={(e) => {
                                                        const newCart = [...cart];
                                                        const idx = newCart.findIndex(i => i.id === item.id);
                                                        newCart[idx].quantity = parseInt(e.target.value);
                                                        setCart(newCart);
                                                    }}
                                                >
                                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                                                        <option key={i} value={i}>Qty: {i}</option>
                                                    ))}
                                                </select>

                                                {/* Delete button */}
                                                <button
                                                    onClick={() => handleRemove(item.id)}
                                                    className="text-[#007185] hover:text-[#c45500] text-sm transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Subtotal at bottom */}
                            <div className="mt-4 pt-4 border-t border-gray-300 text-right">
                                <p className="text-lg">
                                    Subtotal ({cart.length} {cart.length === 1 ? 'item' : 'items'}):
                                    <span className="font-bold text-gray-900 ml-2">
                                        ₹{total.toLocaleString('en-IN')}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Checkout sidebar */}
                        <div className="h-fit bg-white rounded p-5 border border-gray-300">
                            <div className="mb-4">
                                <p className="text-lg mb-1">
                                    Subtotal ({cart.length} {cart.length === 1 ? 'item' : 'items'}):
                                </p>
                                <p className="text-xl font-bold text-gray-900">
                                    ₹{total.toLocaleString('en-IN')}
                                </p>
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
                                                items: cart.map(item => ({
                                                    productId: item.id,
                                                    quantity: item.quantity,
                                                    price: item.price
                                                })),
                                                total: total
                                            })
                                        });

                                        if (res.ok) {
                                            alert('Order placed successfully!');
                                            setCart([]);
                                        } else {
                                            const data = await res.json();
                                            alert(`Failed to place order: ${data.error || 'Unknown error'}`);
                                        }
                                    } catch (e) {
                                        console.error(e);
                                        alert('Error processing order. Please try again.');
                                    }
                                }}
                                className="w-full py-2 bg-[#FFD814] hover:bg-[#F7CA00] text-black text-sm rounded-lg font-medium transition-colors border border-[#c7c11e]"
                            >
                                Proceed to Checkout
                            </button>

                            <p className="text-xs text-gray-600 mt-3 text-center">
                                Free delivery on orders over ₹499
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
