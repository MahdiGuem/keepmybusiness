'use client';
import {useState, useEffect} from 'react';
import ColorPicker from '@components/ColorPicker';

const bg_icon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
</svg>;

const default_product_icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
  <path fillRule="evenodd" d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.163 3.75A.75.75 0 0 1 10 12h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
</svg>;

export default function ProductCard({ 
  productName, 
  productIcon, 
  bgColor, 
  mode, 
  index,
  onNameChange, 
  onColorChange, 
  onIconChange,
  onDelete,
  colorPickerIndex,
  setColorPickerIndex,
  iconPickerIndex,
  setIconPickerIndex,
  presetColors,
  uploadedIcons,
  onFileUpload,
  onDeleteIcon
}) {
  const [selected, setSelected] = useState(false);
  const [localName, setLocalName] = useState(productName);
  const [iconModalOpen, setIconModalOpen] = useState(false);

  useEffect(() => {
    setLocalName(productName);
  }, [productName]);

  const handleNameBlur = () => {
    if (localName !== productName && onNameChange) {
      onNameChange(index, localName);
    }
  };

  const toggleColorPicker = () => {
    if (setColorPickerIndex) {
      setColorPickerIndex(colorPickerIndex === index ? null : index);
    }
  };

  const openIconPicker = () => {
    if (setIconPickerIndex) {
      setIconPickerIndex(index);
      setIconModalOpen(true);
    }
  };

  const closeIconModal = () => {
    setIconModalOpen(false);
    if (setIconPickerIndex) {
      setIconPickerIndex(null);
    }
  };

  const handleIconSelect = (icon) => {
    if (onIconChange) {
      onIconChange(index, icon);
    }
    closeIconModal();
  };

  const handleDeleteIcon = (iconIndex, e) => {
    e.stopPropagation();
    if (onDeleteIcon) {
      onDeleteIcon(iconIndex);
    }
  };

  const renderProductName = () => {
    if (mode === 'edit') {
      return (
        <input 
          type="text"
          className="text-sm font-semibold text-center bg-transparent border-none w-full"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
          onBlur={handleNameBlur}
          onKeyDown={(e) => e.key === 'Enter' && handleNameBlur()}
        />
      );
    }
    return <h3 className="text-sm font-semibold text-center">{productName}</h3>;
  };

  return (
    <div className="relative flex justify-center">
      {mode === 'edit' && selected && colorPickerIndex === index && (
          <div className="absolute z-20 top-10 right-0">
            <ColorPicker color={bgColor} onChange={(color) => onColorChange && onColorChange(index, color)} title="Product Color" small />
          </div>
        )}

      {mode === 'edit' && iconModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center" onClick={closeIconModal}>
          <div className="bg-white rounded-lg shadow-xl p-4 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Select Icon</h3>
              <button onClick={closeIconModal} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-wrap gap-3 mb-4 max-h-80 overflow-y-auto p-2">
              {uploadedIcons && uploadedIcons.map((icon, i) => (
                <div key={i} className="relative group">
                  <img
                    src={icon}
                    alt={`icon-${i}`}
                    className="w-40 h-40 object-contain cursor-pointer border-2 border-gray-200 rounded-lg hover:border-red-500 p-1"
                    onClick={() => handleIconSelect(icon)}
                  />
                  <button
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10"
                    onClick={(e) => handleDeleteIcon(i, e)}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
            <label className="block w-full text-center bg-primary-green text-white py-2 rounded cursor-pointer hover:bg-green-600">
              Upload New Icon
              <input type="file" accept="image/*" className="hidden" onChange={onFileUpload} />
            </label>
          </div>
        </div>
      )}
      
      {mode === 'edit' && selected && (
        <div className="absolute z-10 mt-1 left-0 w-full flex justify-center">
          <div className="flex bg-white rounded-lg shadow-lg overflow-hidden border-2 border-primary-green">
            <button 
              className="edit_btn px-2 h-8 flex items-center justify-center bg-blue-500" 
              onClick={toggleColorPicker}
            >
              {bg_icon}
            </button>
            <button 
              className="edit_btn px-2 h-8 flex items-center justify-center bg-purple-500 text-white" 
              onClick={openIconPicker}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </button>
            <button 
              className="edit_btn px-2 h-8 text-red-500" 
              onClick={() => onDelete && onDelete(index)}
            >
              x
            </button>
          </div>
        </div>
      )}

      {mode === 'display' ? (
        <div 
          className="text-center rounded-lg shadow-lg p-3 w-64 h-64 flex flex-col items-center justify-between"
          style={{ backgroundColor: bgColor || '#3B82F6' }}
        >
          <div className="flex justify-center items-center flex-1">
            {productIcon ? (
              <img src={productIcon} alt={productName} className="h-32 w-32" />
            ) : (
              default_product_icon
            )}
          </div>
          {renderProductName()}
        </div>
      ) : (
        <div 
          className={`text-center rounded-lg shadow-lg p-3 w-64 h-64 flex flex-col items-center justify-between
            ${selected ? 'ring-4 ring-primary-green' : 'hover:ring-2 hover:ring-primary-green'}`}
          style={{ backgroundColor: bgColor || '#3B82F6' }}
          onClick={() => setSelected(!selected)}
        >
          <div className="flex justify-center items-center flex-1">
            {productIcon ? (
              <img src={productIcon} alt={productName} className="h-32 w-32" />
            ) : (
              <span className="text-gray-400">{default_product_icon}</span>
            )}
          </div>
          {renderProductName()}
        </div>
      )}
    </div>
  );
}