'use client';

import { useState, useEffect, useRef } from 'react';
import ContentCardPreview from '@components/ContentCardPreview';
import TextCard from "@components/ContentCards/TextCard";
import VideoCard from "@components/ContentCards/VideoCard";
import ProductsCard from "@components/ContentCards/ProductsCard";

const defaultCards = {
  'TextCard': {
    cardType: 'TextCard',
    titles: [
      { size: 'head_text', color: 'green_gradient', text: 'Place Holder Title', alignment: 'left' },
      { size: 'desc', color: 'text-black', text: 'Place Holder description!', alignment: 'left' },
    ],
    background: 'bg-white',
  },
  'VideoCard': {
    cardType: 'VideoCard',
    videoID: 'c9HfNg4a_Og?si=Knmerx93u7xEINAB',
    background: 'bg-white',
  },
  'ProductsCard': {
    cardType: 'ProductsCard',
    products: [
      { productName: "Product 1", productIcon: "/icons/product1.svg", cardColor: "blue-200" },
    ],
  },
};

export default function Edit() {
  const [contentCards, setContentCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [addMenuVisible, setAddMenuVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [changesSaved, setChangesSaved] = useState(true);

  const getContentCard = (card, mode) => {
    switch (card.cardType) {
      case 'TextCard':
        return <TextCard card={card} mode={mode} updateCard={updateCard} saveContent={saveContent} changesSaved={changesSaved}/>;
      case 'VideoCard':
        return <VideoCard {...card} mode={mode} />;
      case 'ProductsCard':
        return <ProductsCard {...card} mode={mode} />;
      default:
        return null;
    }
  };

  const saveContent = async () => {
      try {
        const res = await fetch(`http://localhost:8080/content`, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("token")
          },
          method: 'POST',
          body: JSON.stringify(contentCards),
        });
        const data = await res.json();
        setContentCards(data);
        setChangesSaved(true);
      } catch (error) {
        console.error('Error saving content:', error);
      }
  };

  const fetchContent = async () => {
    try {
      const res = await fetch('http://localhost:8080/content/all', {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      });
      const data = await res.json();
      setContentCards(data);
      setChangesSaved(true);
      if (data.length > 0 && !selectedCard) {
        setSelectedCard(data[0]);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const moveCard = async (index, direction) => {
    const newCards = [...contentCards];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex >= 0 && targetIndex < newCards.length) {
      [newCards[index], newCards[targetIndex]] = [newCards[targetIndex], newCards[index]];
      setContentCards(newCards)
      setChangesSaved(false);
    }
  };

  const deleteCard = async (index) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      const newCards = contentCards.filter((_, i) => i !== index);

      if (selectedCard && selectedCard.id === contentCards[index].id) {
        setSelectedCard(newCards.length > 0 ? newCards[0] : null);
      }
      setContentCards(newCards)
      setChangesSaved(false);
    }
  };

  const addCard = async (cardType) => {
    const newCard = { ...defaultCards[cardType] };
    await saveContent()
    try {
      await fetch(`http://localhost:8080/content/new`, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        method: 'POST',
        body: JSON.stringify(newCard)
      });
      setAddMenuVisible(false);
      fetchContent()
    } catch (error) {
      console.error('Error adding content card:', error);
    }
  };

  const updateCard = async (cardId, updatedCard) => {
    const newCards = contentCards.map((card) => (card.id === cardId ? { ...card, ...updatedCard } : card));
    setSelectedCard(updatedCard);
    setContentCards(newCards)
    setChangesSaved(false);
  };

  const openAddMenu = () => {
    setAddMenuVisible((prev) => !prev);
  };

  const addTextToCard = async (textType, cardIndex) => {
    const updatedCards = [...contentCards];
    const card = updatedCards[cardIndex];

    if (card.cardType === 'TextCard') {
      const updatedTitles = card.titles.map((title) =>
        title.size === textType ? { ...title, text: 'Place holder text' } : title
      );

      updatedCards[cardIndex] = { ...card, titles: updatedTitles };
      setContentCards(newCards)
      setChangesSaved(false);
    }
  };

  const changeBackgroundColor = async (newColor, cardIndex) => {
    const updatedCards = [...contentCards];
    const card = updatedCards[cardIndex];

    if (card.cardType === 'TextCard') {
      updatedCards[cardIndex] = { ...card, background: newColor };
      setContentCards(newCards)
      setChangesSaved(false);
    }
  };

  return (
    <div className={`flex flex-row p-4 w-full h-full gap-2 ${changesSaved ? 'bg-green-100' : 'bg-red-400'}`}>
      <div>
        <div className="flex flex-col bg-slate-300 w-36 flex-none rounded-16 p-2 h-5/6 gap-2 overflow-y-auto">
          {contentCards.map((card, index) => (
            <ContentCardPreview
              key={`preview_${card.id}`}
              card={card}
              setSelectedCard={setSelectedCard}
              moveCard={moveCard}
              deleteCard={() => deleteCard(index)}
              index={index}
              totalCards={contentCards.length}
              selected={selectedCard && selectedCard.id === card.id}
              addText={addTextToCard}
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
          {addMenuVisible && (
            <div className='flex flex-row justify-between'>
              <button
                className='align-middle justify-center green_btn cursor-pointer w-1/4 aspect-square'
                onClick={() => addCard('TextCard')}
              >
                T
              </button>
              <button
                className='align-middle justify-center green_btn cursor-pointer w-1/4 aspect-square'
                onClick={() => addCard('VideoCard')}
              >
                V
              </button>
              <button
                className='align-middle justify-center green_btn cursor-pointer w-1/4 aspect-square'
                onClick={() => addCard('ProductsCard')}
              >
                P
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="relative flex flex-col bg-slate-300 min-w-40 rounded-16 p-2 w-full h-full">
        {selectedCard && selectedCard.cardType && getContentCard(selectedCard, "edit")}
      </div>
    </div>
  );
}
