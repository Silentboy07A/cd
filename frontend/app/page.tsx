
import ProductCard from '@/components/ProductCard';

async function getProducts() {
  // In Next.js App Router, we can fetch directly in Server Components
  // Using our API Gateway or direct service (if internal networking allowed from server)
  // For local docker-compose, we should use service name or localhost
  // Since we are running Next.js locally (not in container yet), use localhost
  // BUT the API Gateway /api/products route is on the SAME Next.js instance, so we can't fetch it easily during SSR unless absolute URL

  // Better approach for SSR: Call the microservice directly
  const res = await fetch('http://localhost:3002/products', { cache: 'no-store' });

  if (!res.ok) {
    // Fallback or error handling
    return [];
  }

  const data = await res.json();
  // Ensure data structure matches expected from Convex query
  return data || [];
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
