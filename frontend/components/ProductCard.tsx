
import { ShoppingCart } from 'lucide-react';

interface Product {
    _id: string; // Using Convex ID directly or customized ID
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
        <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white group">
            <div className="aspect-square bg-gray-100 flex items-center justify-center relative overflow-hidden">
                {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform" />
                ) : (
                    <span className="text-gray-400">No Image</span>
                )}
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                    <span className="font-bold text-xl">${product.price.toFixed(2)}</span>
                    <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
