
import Link from 'next/link';
import { ShoppingCart, LogIn, Search } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="bg-[#232F3E] text-white">
            {/* Main navbar */}
            <div className="border-b border-gray-700">
                <div className="container mx-auto px-4 h-16 flex items-center gap-6">
                    {/* Logo */}
                    <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
                        <div className="text-2xl font-bold">
                            <span className="text-white">a</span><span className="text-[#FF9900]">zon</span>
                            <span className="text-xs align-top text-[#FF9900]">.in</span>
                        </div>
                    </Link>

                    {/* Search bar */}
                    <div className="flex-1 max-w-3xl">
                        <div className="flex">
                            <input
                                type="text"
                                placeholder="Search Azon.in"
                                className="flex-1 px-4 py-2 text-black rounded-l outline-none focus:ring-2 focus:ring-[#FF9900]"
                            />
                            <button className="bg-[#FF9900] hover:bg-[#f09000] px-6 rounded-r transition-colors">
                                <Search className="w-5 h-5 text-black" />
                            </button>
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-6">
                        <Link href="/login" className="flex flex-col hover:opacity-80 transition-opacity">
                            <span className="text-xs">Hello, sign in</span>
                            <span className="text-sm font-bold">Account & Lists</span>
                        </Link>
                        <Link href="/cart" className="relative hover:opacity-80 transition-opacity">
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <ShoppingCart className="w-8 h-8" />
                                    <span className="absolute -top-1 -right-1 bg-[#FF9900] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        0
                                    </span>
                                </div>
                                <span className="text-sm font-bold">Cart</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Secondary navbar - Categories */}
            <div className="bg-[#37475a]">
                <div className="container mx-auto px-4 h-10 flex items-center gap-6 text-sm">
                    <Link href="/?category=all" className="hover:text-[#FF9900] transition-colors font-medium">All</Link>
                    <Link href="/?category=mobile" className="hover:text-[#FF9900] transition-colors">Mobiles</Link>
                    <Link href="/?category=laptop" className="hover:text-[#FF9900] transition-colors">Laptops</Link>
                    <Link href="/?category=electronics" className="hover:text-[#FF9900] transition-colors">Electronics</Link>
                    <Link href="/?category=accessories" className="hover:text-[#FF9900] transition-colors">Accessories</Link>
                    <Link href="/?category=fashion" className="hover:text-[#FF9900] transition-colors">Fashion</Link>
                    <Link href="/?category=home" className="hover:text-[#FF9900] transition-colors">Home & Kitchen</Link>
                </div>
            </div>
        </nav>
    );
}
