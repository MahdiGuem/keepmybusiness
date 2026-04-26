'use client';

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import EditMenu from '@components/EditMenu';
import ColorPicker from '@components/ColorPicker';

const save_icons = {
  true: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>,
  false:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
  </svg>
};

export default function ProductsCard({ products, mode, updateCard, cardId, saveContent, changesSaved, background }) {
  const [colorPickerIndex, setColorPickerIndex] = useState(null);
  const [iconPickerIndex, setIconPickerIndex] = useState(null);
  const [bgMenuVisible, setBgMenuVisible] = useState(false);
  const [newProductCount, setNewProductCount] = useState(1);
  const [uploadedIcons, setUploadedIcons] = useState([]);
  const [localProducts, setLocalProducts] = useState(products);
  const [cardBg, setCardBg] = useState(background || '#FFFFFF');

  useEffect(() => {
    setLocalProducts(products);
  }, [products]);

  useEffect(() => {
    setCardBg(background || '#FFFFFF');
  }, [background]);

  const handleProductNameChange = (index, newName) => {
    const updatedProducts = localProducts.map((p, i) => i === index ? { ...p, productName: newName } : p);
    setLocalProducts(updatedProducts);
    updateCard(cardId, { products: updatedProducts });
  };

  const handleProductColorChange = (index, color) => {
    const updatedProducts = localProducts.map((p, i) => i === index ? { ...p, bgColor: color } : p);
    setLocalProducts(updatedProducts);
    updateCard(cardId, { products: updatedProducts });
    setColorPickerIndex(null);
  };

  const handleProductIconChange = (index, icon) => {
    const updatedProducts = localProducts.map((p, i) => i === index ? { ...p, productIcon: icon } : p);
    setLocalProducts(updatedProducts);
    updateCard(cardId, { products: updatedProducts });
  };

  const handleDeleteProduct = (index) => {
    if (window.confirm('Delete this product?')) {
      const updatedProducts = localProducts.filter((_, i) => i !== index);
      setLocalProducts(updatedProducts);
      updateCard(cardId, { products: updatedProducts });
    }
  };

  const handleAddProduct = () => {
    const nextCount = newProductCount + 1;
    setNewProductCount(nextCount);
    const newProduct = {
      productName: `Product ${nextCount}`,
      productIcon: '',
      bgColor: '#3B82F6',
      background: '#FFFFFF'
    };
    const updatedProducts = [...localProducts, newProduct];
    setLocalProducts(updatedProducts);
    updateCard(cardId, { products: updatedProducts });
  };

  const handleBgColorSelect = (color) => {
    setCardBg(color);
    updateCard(cardId, { background: color });
    setBgMenuVisible(false);
  };

  const bgMenuVisibility = () => {
    setBgMenuVisible((prev) => !prev);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newIcons = [...uploadedIcons, event.target.result];
        setUploadedIcons(newIcons);
        localStorage.setItem('productIcons', JSON.stringify(newIcons));
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteIcon = (index) => {
    const newIcons = uploadedIcons.filter((_, i) => i !== index);
    setUploadedIcons(newIcons);
    localStorage.setItem('productIcons', JSON.stringify(newIcons));
  };

  useEffect(() => {
    const saved = localStorage.getItem('productIcons');
    if (saved) {
      setUploadedIcons(JSON.parse(saved));
    }
  }, []);

return (
    <div className="relative w-full h-screen flex-center flex-col overflow-hidden" style={{ backgroundColor: cardBg }}>
      {mode === 'edit' && (
        <>
          <button 
            className={`absolute top-0 left-0 z-5 flex justify-center flex-row rounded-br-lg overflow-hidden h-10 w-48 border-2 border-slate-300 ${changesSaved ? 'bg-green-300' : 'bg-red-400'}`} 
            onClick={() => saveContent()}
          >
            {save_icons[changesSaved]}
            {changesSaved ? ' Saved' : ' Save!'}
          </button>
          <div className="absolute top-0 right-0 z-10 flex flex-row rounded-bl-lg overflow-hidden h-10 border-2 border-slate-300 bg-primary-green">
            <button 
              className="edit_btn w-10 text-white font-bold hover:bg-green-600 flex items-center justify-center" 
              onClick={handleAddProduct}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m6.75-6.75h-15" />
              </svg>
            </button>
            <button 
              className="edit_btn w-10 h-10 flex items-center justify-center" 
              onClick={bgMenuVisibility}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
              </svg>
            </button>
          </div>
          {bgMenuVisible && (
            <div className="absolute top-10 right-0 z-10">
              <ColorPicker color={cardBg} onChange={handleBgColorSelect} />
            </div>
          )}
        </>
      )}
      <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
      <div className="flex justify-center items-center gap-6 overflow-auto py-4">
        {localProducts.map((product, index) => (
          <ProductCard
            index={index}
            key={index}
            productName={product.productName}
            productIcon={product.productIcon}
            bgColor={product.bgColor}
            mode={mode}
            onNameChange={handleProductNameChange}
            onColorChange={handleProductColorChange}
            onIconChange={handleProductIconChange}
            onDelete={handleDeleteProduct}
            colorPickerIndex={colorPickerIndex}
            setColorPickerIndex={setColorPickerIndex}
            iconPickerIndex={iconPickerIndex}
            setIconPickerIndex={setIconPickerIndex}
            uploadedIcons={uploadedIcons}
            onFileUpload={handleFileUpload}
            onDeleteIcon={deleteIcon}
          />
        ))}
      </div>
    </div>
  );
}