import { ShoppingCart, Star } from 'lucide-react';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category?: string;
    imageUrl?: string;
}

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="bg-white rounded border border-gray-300 hover:shadow-lg transition-shadow duration-200 p-4 group cursor-pointer">
            {/* Product image */}
            <div className="aspect-square bg-white flex items-center justify-center relative overflow-hidden mb-3">
                {product.imageUrl ? (
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-gray-300">
                        <ShoppingCart className="w-16 h-16 mb-2" />
                        <span className="text-sm">No Image</span>
                    </div>
                )}
                {/* Category badge */}
                {product.category && (
                    <div className="absolute top-2 left-2 bg-[#232F3E] text-white px-2 py-1 rounded text-xs font-medium">
                        {product.category}
                    </div>
                )}
            </div>

            {/* Product details */}
            <div>
                <h3 className="font-normal text-base mb-2 text-gray-900 line-clamp-2 leading-snug group-hover:text-[#c45500] transition-colors">
                    {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4].map(i => (
                        <Star key={i} className="w-4 h-4 fill-[#FF9900] text-[#FF9900]" />
                    ))}
                    <Star className="w-4 h-4 fill-gray-200 text-gray-200" />
                    <span className="text-sm text-[#007185] ml-1">(1,234)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-sm align-top text-gray-900">₹</span>
                    <span className="text-2xl font-normal text-gray-900">
                        {Math.floor(product.price).toLocaleString('en-IN')}
                    </span>
                    {product.price % 1 !== 0 && (
                        <span className="text-sm align-top text-gray-900">{((product.price % 1) * 100).toFixed(0)}</span>
                    )}
                </div>

                {/* Add to cart button */}
                <button className="w-full py-2 bg-[#FFD814] hover:bg-[#F7CA00] text-black text-sm rounded-lg font-medium transition-colors border border-[#c7c11e]">
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
