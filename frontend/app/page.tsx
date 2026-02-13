
import ProductCard from '@/components/ProductCard';

async function getProducts() {
  // Use the Next.js API route for Vercel deployment
  // The API route will handle the Convex database query
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
    <div>
      <h1 className="text-3xl font-bold mb-8">Featured Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center py-12">
            No products found. Start the services and add some products!
          </p>
        )}
      </div>
    </div>
  );
}
