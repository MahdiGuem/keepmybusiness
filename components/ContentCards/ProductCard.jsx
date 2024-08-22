export default function ProductCard({ productName, productIcon, cardColor , mode}) {
    console.log(mode);
    const cardBGColor = `bg-${cardColor}`;
    return (
      <>
      {mode=="display" ? (
        <div className={`${cardBGColor} text-center rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 aspect-square`}>
          <div className="flex justify-center items-center h-24">
            <img src={productIcon} alt={`${productName} icon`} className="h-16 w-16" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">{productName}</h3>
        </div>

      ): (
        <div className={`${cardBGColor} text-center rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 aspect-square
                        hover:outline hover:outline-primary-green
        `}>
          <div className="flex justify-center items-center h-24">
            <img src={productIcon} alt={`${productName} icon`} className="h-16 w-16" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">{productName}</h3>
        </div>
      )}
      </>
      
    );
  }
  