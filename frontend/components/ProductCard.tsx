
import { ShoppingCart, Sparkles } from 'lucide-react';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
}

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/20">
            {/* Product image */}
            <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center relative overflow-hidden">
                {product.imageUrl ? (
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                        <Sparkles className="w-16 h-16 mb-2" />
                        <span className="text-sm">No Image</span>
                    </div>
                )}
                {/* Premium badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    Premium
                </div>
            </div>

            {/* Product details */}
            <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-gray-900 line-clamp-1 group-hover:text-purple-600 transition-colors">
                    {product.name}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
                    {product.description}
                </p>

                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            ${product.price.toFixed(2)}
                        </span>
                    </div>
                    <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3.5 rounded-xl hover:shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 group/btn">
                        <ShoppingCart className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}
