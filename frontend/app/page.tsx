
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

export default async function Home({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

  let products = [];
  let debugError = '';

  try {
    const res = await fetch(`${baseUrl}/api/products`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) {
      debugError = `Failed to fetch: ${res.status} ${res.statusText}`;
    } else {
      products = await res.json();
    }
  } catch (error: any) {
    debugError = `Error: ${error.message}`;
    console.error('Error fetching products:', error);
  }

  const category = searchParams.category?.toLowerCase();

  // Filter products by category if specified
  let filteredProducts = products;
  if (category && category !== 'all') {
    filteredProducts = products.filter((p: any) =>
      p.category?.toLowerCase() === category
    );
  }

  // Group products by category for sections
  const mobiles = products.filter((p: any) => p.category === 'Mobile');
  const laptops = products.filter((p: any) => p.category === 'Laptop');
  const electronics = products.filter((p: any) => p.category === 'Electronics');
  const accessories = products.filter((p: any) => p.category === 'Accessories');

  // If a category is selected, show only that category
  const showAllSections = !category || category === 'all';

  return (
    <div className="bg-[#eaeded] min-h-screen">
      {/* Debug Info (Only visible if no products) */}
      {products.length === 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 m-4 rounded relative">
          <strong className="font-bold">Debug Info:</strong>
          <span className="block sm:inline"> Products failed to load.</span>
          <pre className="mt-2 text-xs bg-red-50 p-2 rounded">
            URL: {baseUrl}/api/products{'\n'}
            Error: {debugError || 'unknown error'}{'\n'}
            Env: {process.env.NODE_ENV}
          </pre>
        </div>
      )}
      {/* Hero Banner */}
      <div className="bg-gradient-to-b from-[#37475a] to-transparent relative h-[400px] -mt-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-purple-900/40">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-xl">
              <h1 className="text-5xl font-bold mb-4">Great deals on top products</h1>
              <p className="text-xl mb-6">Shop the latest electronics, mobiles & more</p>
              <button className="px-8 py-3 bg-[#FFD814] hover:bg-[#F7CA00] text-black font-medium rounded-lg transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className="font-bold text-lg mb-2">Mobiles & Accessories</h3>
            <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop" alt="Mobiles" className="w-full h-32 object-cover rounded mb-2" />
            <a href="/?category=mobile" className="text-[#007185] hover:text-[#c45500] text-sm">Shop now</a>
          </div>
          <div className="bg-white p-6 rounded hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className="font-bold text-lg mb-2">Laptops & Computers</h3>
            <img src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&h=200&fit=crop" alt="Laptops" className="w-full h-32 object-cover rounded mb-2" />
            <a href="/?category=laptop" className="text-[#007185] hover:text-[#c45500] text-sm">Shop now</a>
          </div>
          <div className="bg-white p-6 rounded hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className="font-bold text-lg mb-2">Electronics</h3>
            <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop" alt="Electronics" className="w-full h-32 object-cover rounded mb-2" />
            <a href="/?category=electronics" className="text-[#007185] hover:text-[#c45500] text-sm">Explore more</a>
          </div>
          <div className="bg-white p-6 rounded hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className="font-bold text-lg mb-2">Deals of the Day</h3>
            <img src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=300&h=200&fit=crop" alt="Deals" className="w-full h-32 object-cover rounded mb-2" />
            <a href="/?category=all" className="text-[#007185] hover:text-[#c45500] text-sm">See all deals</a>
          </div>
        </div>

        {/* Category Title */}
        {category && category !== 'all' && (
          <div className="mb-6">
            <h2 className="text-3xl font-bold capitalize">
              {category === 'mobile' ? 'Mobiles' :
                category === 'laptop' ? 'Laptops' :
                  category === 'electronics' ? 'Electronics' :
                    category === 'accessories' ? 'Accessories' : category}
            </h2>
            <p className="text-gray-600 mt-1">
              {filteredProducts.length} results
            </p>
          </div>
        )}

        {/* Filtered Products (when category selected) */}
        {category && category !== 'all' && filteredProducts.length > 0 && (
          <div className="mb-8 bg-white p-6 rounded">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredProducts.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* All Sections (when no category or "all" selected) */}
        {showAllSections && (
          <>
            {/* Mobiles Section */}
            {mobiles.length > 0 && (
              <div className="mb-8 bg-white p-6 rounded" id="mobiles">
                <h2 className="text-2xl font-bold mb-4">Best of Mobiles</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {mobiles.slice(0, 5).map((product: any) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {/* Laptops Section */}
            {laptops.length > 0 && (
              <div className="mb-8 bg-white p-6 rounded" id="laptops">
                <h2 className="text-2xl font-bold mb-4">Top Laptops</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {laptops.slice(0, 5).map((product: any) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {/* Electronics Section */}
            {electronics.length > 0 && (
              <div className="mb-8 bg-white p-6 rounded" id="electronics">
                <h2 className="text-2xl font-bold mb-4">Electronics & Gadgets</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {electronics.slice(0, 5).map((product: any) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {/* Accessories Section */}
            {accessories.length > 0 && (
              <div className="mb-8 bg-white p-6 rounded" id="accessories">
                <h2 className="text-2xl font-bold mb-4">Must-Have Accessories</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {accessories.slice(0, 5).map((product: any) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* No products message */}
        {filteredProducts.length === 0 && (
          <div className="bg-white rounded p-12 text-center">
            <p className="text-gray-600 text-lg font-medium mb-2">
              {products.length === 0 ? 'No products found' : `No ${category} products found`}
            </p>
            <p className="text-gray-500 text-sm">
              {products.length === 0 ? 'Products are being loaded...' : 'Try selecting a different category'}
            </p>
            {category && category !== 'all' && (
              <a href="/" className="inline-block mt-4 px-6 py-2 bg-[#FFD814] hover:bg-[#F7CA00] text-black rounded-lg font-medium transition-colors">
                View All Products
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
