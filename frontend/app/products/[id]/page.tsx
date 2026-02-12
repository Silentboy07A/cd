
import { ShoppingCart } from 'lucide-react';
import { notFound } from 'next/navigation';

async function getProduct(id: string) {
    // In a real app, this fetches from the microservice
    // const res = await fetch(`http://localhost:3002/products/${id}`);
    // if (!res.ok) return undefined;
    // return res.json();

    // Mock data for demo
    if (id === '1') {
        return {
            _id: '1',
            name: 'Premium Wireless Headphones',
            description: 'Experience high-fidelity sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and plush ear cushions for all-day comfort.',
            price: 199.99,
            stock: 50,
            imageUrl: ''
        };
    }
    return undefined;
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        notFound();
    }

    return (
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Image Section */}
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full" />
                ) : (
                    <span className="text-gray-400 text-lg">No Image Available</span>
                )}
            </div>

            {/* Details Section */}
            <div className="flex flex-col justify-center">
                <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                <p className="text-2xl font-semibold mb-6">${product.price.toFixed(2)}</p>

                <p className="text-gray-600 mb-8 leading-relaxed">
                    {product.description}
                </p>

                <div className="flex gap-4 mb-8">
                    <div className="w-1/3">
                        <label className="block text-sm font-medium mb-1">Quantity</label>
                        <select className="w-full p-3 border rounded-md">
                            {[1, 2, 3, 4, 5].map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <button className="flex items-center justify-center gap-2 w-full py-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors text-lg font-medium">
                    <ShoppingCart className="w-6 h-6" />
                    Add to Cart
                </button>

                <div className="mt-8 text-sm text-gray-500">
                    <p>Free shipping on orders over $50</p>
                    <p>30-day return policy</p>
                </div>
            </div>
        </div>
    );
}
