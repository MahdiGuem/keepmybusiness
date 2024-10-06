'use client';
import { useState } from 'react';

const ContentCardPreview = ({ card, selected, setSelectedCard, moveCard, deleteCard, index, totalCards }) => {

  return (
    <div className={`flex justify-center flex-col shadow rounded-lg overflow-hidden min-h-20 border-2 ${selected ? 'border-primary-green' : 'border-transparent'}`}>
      <div
        className={`flex align-middle justify-center p-2 bg-white rounded-t-lg shadow cursor-pointer ${selected && 'underline text-primary-green'}`}
        onClick={() => {
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

export default ContentCardPreview;
