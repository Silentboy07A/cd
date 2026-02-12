
import Link from 'next/link';
import { ShoppingCart, LogIn, User } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="border-b bg-white">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold">
                    E-Shop Micro
                </Link>

                <div className="flex items-center gap-4">
                    <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-full">
                        <ShoppingCart className="w-6 h-6" />
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                            0
                        </span>
                    </Link>
                    <Link href="/login" className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
                        <LogIn className="w-4 h-4" />
                        <span>Login</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
