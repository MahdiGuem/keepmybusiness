'use client';
import { useState } from 'react';

const ContentCardEdit = ({ card, setSelectedCard, moveCard, deleteCard, index, totalCards }) => {
  const [selected, setSelected] = useState(false);

  return (
    <div className='flex justify-center flex-col shadow rounded-lg overflow-hidden min-h-20'>
      <div
        className='flex align-middle justify-center p-2 bg-white rounded-t-lg shadow cursor-pointer'
        onClick={() => {
          setSelected(true);
          setSelectedCard(card);
        }}
      >
        {card.cardType}
      </div>
      
      <div className='flex flex-row justify-between'>
        
        <button className='edit_btn w-1/3' onClick={() => moveCard(index, 'up')} disabled={index === 0}>
          ↑
        </button>
        <button className='edit_btn w-1/3' onClick={() => moveCard(index, 'down')} disabled={index === totalCards - 1}>
          ↓
        </button>
        <button className='edit_btn w-1/3' onClick={deleteCard}>
          X
        </button>
      </div>
    </div>
  );
};

export default ContentCardEdit;
