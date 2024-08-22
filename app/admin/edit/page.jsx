'use client';

import { useState, useEffect } from 'react';
import contentCards from '@app/contentDatabase';
import ContentCard from '@components/ContentCards/ContentCard';
import ContentCardEdit from '@components/ContentCardEdit';

const initialContentCards = contentCards;

const Page = () => {
  const [contentCards, setContentCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});

  useEffect(() => {
    setContentCards(initialContentCards);
    if (initialContentCards.length > 0) {
      setSelectedCard(initialContentCards[0]);
    }
  }, []);

  const moveCard = (index, direction) => {
    const newCards = [...contentCards];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    // Swap the cards
    [newCards[index], newCards[targetIndex]] = [newCards[targetIndex], newCards[index]];
    setContentCards(newCards);
  };

  const deleteCard = (index) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      const newCards = contentCards.filter((_, i) => i !== index);
      setContentCards(newCards);

      // Update selected card if it's the one being deleted
      if (selectedCard === contentCards[index]) {
        setSelectedCard(newCards.length > 0 ? newCards[0] : {});
      }
    }
  };

  const addCard = () => {
    const newCard = {
      cardId: contentCards.length + 1,
      cardType: 'TextCard',  // Default card type, can be adjusted
      id: `new-section-${contentCards.length + 1}`,
      titles: [
        { size: 'head_text', color: 'text-black', text: 'New Card Title', alignment: 'center' },
      ],
      background: 'bg-gray-100',
    };

    setContentCards([...contentCards, newCard]);
    setSelectedCard(newCard);  // Automatically select the new card
  };

  return (
    <div className='flex flex-row p-4 w-full h-full gap-2'>
      <div className="flex flex-col bg-slate-300 min-w-36 rounded-16 p-2 h-fill gap-2">
        {contentCards.map((card, index) => (
          <ContentCardEdit 
            key={index} 
            card={card} 
            setSelectedCard={setSelectedCard} 
            moveCard={moveCard} 
            deleteCard={() => deleteCard(index)} 
            index={index} 
            totalCards={contentCards.length} // Pass the length of the array
          />
        ))}
        <div 
          className='flex align-middle justify-center green_btn cursor-pointer'
          onClick={addCard}  // Add this line to trigger addCard function
        >
          +
        </div>
      </div>

      <div className="flex flex-col bg-slate-300 min-w-40 rounded-16 p-2 w-full h-fill">
        {selectedCard && selectedCard.cardType && (
          <div>
            <ContentCard id={selectedCard.id} card={selectedCard} mode='edit' />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
