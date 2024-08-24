'use client';

import { useState, useEffect } from 'react';
import contentCards from '@app/contentDatabase';
import ContentCard from '@components/ContentCards/ContentCard';
import ContentCardEdit from '@components/ContentCardEdit';

const initialContentCards = contentCards;
const defaultCards = {
  'TextCard': {
    cardId: contentCards.length + 1,
    cardType: 'TextCard',
    id: `new-section-${contentCards.length + 1}`,
    titles: [
      { size: 'head_text', color: 'green_gradient', text: 'Place Holder Title', alignment: 'left' },
      { size: 'desc', color: 'text-black', text: 'Place Holder description!', alignment: 'left' },
    ],
    background: 'bg-white',
  },
  'VideoCard':     {
    cardId: 3,
    cardType: 'VideoCard',
    id: `new-section-${contentCards.length + 1}`,
    videoID: 'c9HfNg4a_Og?si=Knmerx93u7xEINAB',
    background: 'bg-white',
  },
  'ProductsCard': {
    cardID: 4,
    cardType: 'ProductsCard',
    id: `new-section-${contentCards.length + 1}`,
    products:[
      { productName: "Product 1", productIcon: "/icons/product1.svg", cardColor: "blue-200" },
    ],
  },
}
export default function Edit() {
  const [contentCards, setContentCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [addMenuVisible, setAddMenuVisible] = useState(false);

  useEffect(() => {
    setContentCards(initialContentCards);
    if (initialContentCards.length > 0) {
      setSelectedCard(initialContentCards[0]);
    }
  }, []);

  const moveCard = (index, direction) => {
    const newCards = [...contentCards];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    [newCards[index], newCards[targetIndex]] = [newCards[targetIndex], newCards[index]];
    setContentCards(newCards);
  };

  const deleteCard = (index) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      const newCards = contentCards.filter((_, i) => i !== index);
      setContentCards(newCards);

      if (selectedCard === contentCards[index]) {
        setSelectedCard(newCards.length > 0 ? newCards[0] : {});
      }
    }
  };

  const addCard = (cardType) => {
    const newCard = defaultCards[cardType]

    setContentCards([...contentCards, newCard]);
    setSelectedCard(newCard); 
    setAddMenuVisible(false);
  };

  const openAddMenu = () => {
    setAddMenuVisible(!addMenuVisible);
  };

  const  openBackgroundColorMenu = () => {

  }

  return (
    <div className='flex flex-row p-4 w-full h-full gap-2'>
      <div>
        <div className="flex flex-col bg-slate-300 w-36 flex-none rounded-16 p-2 h-5/6 gap-2 overflow-y-auto">
          {contentCards.map((card, index) => (
            <ContentCardEdit 
              key={index} 
              card={card} 
              setSelectedCard={setSelectedCard} 
              moveCard={moveCard} 
              deleteCard={() => deleteCard(index)} 
              index={index} 
              totalCards={contentCards.length} 
            />
          ))}

        </div>
        
        <div className="flex flex-col bg-slate-300 w-36 flex-none rounded-16 p-2 h-fit mt-2 gap-2 overflow-y-auto">
          <button 
              className='flex align-middle justify-center green_btn cursor-pointer' 
              onClick={openAddMenu}
            >
              +
            </button>
            {addMenuVisible && 
              <div className='flex flex-row justify-between'>
                <button className='align-middle justify-center green_btn cursor-pointer w-1/4 aspect-square '
                  onClick={() => addCard('TextCard')}>
                  T
                </button>
                <button className='align-middle justify-center green_btn cursor-pointer w-1/4 aspect-square'
                  onClick={() => addCard('VideoCard')}>
                  V
                </button>
                <button className='align-middle justify-center green_btn cursor-pointer w-1/4 aspect-square'
                  onClick={() => addCard('ProductsCard')}>
                  P
                </button>
            </div>
          }

        </div>
      </div>
      <div className="relative flex flex-col bg-slate-300 min-w-40 rounded-16 p-2 w-full h-full">
        {selectedCard && selectedCard.cardType && (
          <ContentCard id={selectedCard.id} card={selectedCard} mode='edit' />
        )}
      </div>
    </div>
  );
}
