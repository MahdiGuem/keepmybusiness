export default function ProductCard({ productName, productIcon, cardColor }) {
    return (
      <div
        className={`bg-${cardColor} text-center rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 aspect-square`}
      >
        
        <div className="flex justify-center items-center h-24">
          <img src={productIcon} alt={`${productName} icon`} className="h-16 w-16" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">{productName}</h3>
      </div>
    );
  }
  