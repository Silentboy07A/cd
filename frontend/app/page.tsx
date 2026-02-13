
import ProductCard from '@/components/ProductCard';

async function getProducts() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

  try {
    const res = await fetch(`${baseUrl}/api/products`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!res.ok) {
      console.error('Failed to fetch products:', res.status);
      return [];
    }

    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="bg-[#eaeded] min-h-screen py-4">
      <div className="container mx-auto px-4">
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#37475a] to-[#232F3E] text-white p-8 rounded mb-6">
          <h1 className="text-3xl font-bold mb-2">Welcome to Azon.in</h1>
          <p className="text-lg">Discover amazing products at great prices</p>
        </div>

        {/* Products grid */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.length > 0 ? (
              products.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-white rounded border border-gray-300">
                <p className="text-gray-600 text-lg font-medium mb-2">No products found</p>
                <p className="text-gray-500 text-sm">Check back later for new arrivals</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
