'use client';
import {useState} from 'react';

export default function ProductCard({ productName, productIcon, cardColor , mode, index}) {

    const image_icon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
  </svg>
  
    const cardBGColor = `bg-${cardColor}`;
    const [selectedElementID, setSelectedELementID] = useState(null);

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
        <>
        {true &&
        <div className=' flex flex-col justify-between absolute rounded-lg overflow-hidden border-2 border-primary-green'>
          <div className='flex flex-row justify-between'>
            <input 
              type="text" className="w-24 h-10 border-primary-green p-2"
              placeholder="Title"
              onChange={(e) => handleTextChange(e,index)}
            />
            <button className='edit_btn w-10 ' >
              BG
            </button>
            <button className='edit_btn w-10' >
              {image_icon}
            </button>
            <button className='edit_btn w-10' >
              x
            </button>
          </div>
          <input 
            type="text" className="h-10 border-primary-green p-2 border-t-2"
            placeholder="Description..."
            onChange={(e) => handleTextChange(e,index)}
          />
        </div>
        }
        <div className={`${cardBGColor} text-center rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 aspect-square
                        hover:outline hover:outline-primary-green
        `}>
          <div className="flex justify-center items-center h-24">
            <img src={productIcon} alt={`${productName} icon`} className="h-16 w-16" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">{productName}</h3>
        </div>
        
        </>
      )}
      </>
      
    );
  }
  