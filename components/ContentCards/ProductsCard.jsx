import ProductCard from './ProductCard';

export default function ProductsCard({ products, mode }) {
  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.productName}
            productName={product.productName}
            productIcon={product.productIcon}
            cardColor={product.cardColor}
            mode = {mode}
          />
        ))}
      </div>
    </div>
  );
}
