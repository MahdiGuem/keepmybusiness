import ProductCard from './ProductCard';

export default function ProductsCard({ products, mode }) {
  return (
    <div className="py-12 p-4 bg-white w-full">
      <div className='absolute top-0 right-0 mt-2 mr-2 z-5 flex justify-center flex-row rounded-bl-lg overflow-hidden h-10 w-fit border-2 border-slate-300 bg-primary-green'>
        <input 
          type="text" className="h-10 border-primary-green pl-2"
          placeholder="Our Products"
          onChange={(e) => handleTextChange(e,index)}
        />
        <button className='edit_btn w-10' >
          BG
        </button>
        <button className='edit_btn w-10' >
          +
        </button>
      </div>
      <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {products.map((product, index) => (
          <ProductCard
            index={index}
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
