
import Link from 'next/link';
import { ShoppingCart, LogIn, Sparkles } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="border-b border-gray-200/50 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4 h-18 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-200">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            E-Shop Premium
                        </div>
                        <div className="text-xs text-gray-500">Luxury Shopping Experience</div>
                    </div>
                </Link>

                <div className="flex items-center gap-3">
                    <Link href="/cart" className="relative p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 group">
                        <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-purple-600 transition-colors" />
                        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                            0
                        </span>
                    </Link>
                    <Link href="/login" className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 font-semibold">
                        <LogIn className="w-4 h-4" />
                        <span>Login</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
