'use client';

import { useState,useEffect } from 'react';
import EditMenu from '@components/EditMenu';

const alignment_icons = {
  "left": <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
  </svg>,
  "center":<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>,
  "right":<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
  </svg>
}

const save_icons ={
  true: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>,
  false:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
</svg>
}

export default function TextCard({ card, mode, updateCard, changesSaved, saveContent}) {
  const [bg, setBg] = useState(card.background);
  const [bgMenuVisible, setBgMenuVisible] = useState(false);
  const [selectedTitleIndex, setSelectedTitleIndex] = useState(null);

  const bgMenuVisibility = () => {
      setBgMenuVisible((prev) => !prev);
    };

  const changeBgColor = (newColor) => {
    setBg(`bg-[#${newColor}]`);
  }

  const moveTitle = (index, direction) => {
    const newTitles = [...card.titles];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex >= 0 && targetIndex < newTitles.length) {
      [newTitles[index], newTitles[targetIndex]] = [newTitles[targetIndex], newTitles[index]];
      const updatedCard = {
        ...card,
        titles: newTitles
      }
      setSelectedTitleIndex(targetIndex)
      updateCard(card.id, updatedCard)
    }
  };

  const addText = (textType) => {
    let newText;
  
    switch (textType) {
      case "T0":
        newText = { size: 'head_text', color: 'green_gradient', text: 'Place Holder Title', alignment: 'left' };
        break;
      case "T1":
        newText = { size: 'head_text', color: 'text-black', text: 'Place Holder Title', alignment: 'left' };
        break;
      case 't':
        newText = { size: 'desc', color: 'text-black', text: 'Place Holder Title', alignment: 'left' };
        break;
      default:
        newText = null;
    }
  
    if (newText) {
      const updatedCard = {
        ...card,
        titles: [...card.titles, newText],
      }
      updateCard(card.id, updatedCard)
  
    }
  }

  const changeTextAlignment = (index) => {
    const newTitles = [...card.titles];
    switch(card.titles[index].alignment){
      case "left": 
        newTitles[index].alignment = "center"
        break;
      case "center": newTitles[index].alignment = "right"
        break;
      case "right": newTitles[index].alignment = "left"
        break;
      default:
        newTitles[index].alignment = "center"
      
    }
    
    const updatedCard = {
      ...card,
      titles: newTitles
    }
    updateCard(card.id, updatedCard)
  }
  const deleteTitle = () => {
    if (window.confirm('Are you sure you want to delete this text?')) {
      const newTitles = [...card.titles];
      newTitles.splice(selectedTitleIndex, 1);
      const updatedCard = {
        ...card,
        titles: newTitles
      };
      setSelectedTitleIndex(null);
      updateCard(card.id, updatedCard);
    }
  };

  useEffect(() => {
    setInputValues(card.titles.map(title => title.text));
  },[card.titles])

  useEffect (() => {
    setSelectedTitleIndex(null)
  }, [])

  const [inputValues, setInputValues] = useState(card.titles.map(title => title.text));

  const handleInputChange = (index, value) => {
    const updatedValues = [...inputValues];
    updatedValues[index] = value;
    setInputValues(updatedValues);
    if (value == ""){
      deleteTitle()
    }

  
    const updatedCard = {
      ...card,
      titles: card.titles.map((title, i) => (i === index ? { ...title, text: value } : title)),
    };
    updateCard(card.id, updatedCard,true);
  };
  

  return (
    <>
      {mode === "display" ? (
        <div className={`w-full h-screen flex-center flex-col p-12 ${bg}`}>
          {card.titles.map((title, index) => (
            <h1
              key={`${card.id}-title-${index}`}
              className={`w-full ${title.size} ${title.color} text-${title.alignment}`}
            >
              {title.text}
            </h1>
          ))}
        </div>
      ) : (
        <div className={`relative w-full h-screen flex-center flex-col ${bg} overflow-scroll`}>
          <button className={`absolute top-0 pt-2 left-0 mr-2 z-5 flex justify-center flex-row rounded-br-lg overflow-hidden h-10 w-full aspect-square border-2 border-slate-300 ${changesSaved ? 'bg-green-300' : 'bg-red-400'}`} 
          onClick={() => saveContent()} > 
            {save_icons[changesSaved]}
            {changesSaved? ' Changes saved': ' Click here to save your changes!'}
          </button>
          <EditMenu
            menuType="corner"
            menuButtons={['BG', 'add', 'T0', 'T1', 't']}
            changeBgColor={changeBgColor}
            addText={addText}
            bgMenuVisibility={bgMenuVisibility}
          />
          {bgMenuVisible &&
            <div className='absolute top-10 right-0 z-10' />
          }
          {card.titles.map((title, index) => (
            <div key={`${card.id}-title-${index}`} className={`w-full ${title.size} ${title.color} text-${title.alignment}`}>
              {index === selectedTitleIndex ? (
                <div className='relative'>
                  <div style={{ top: '-38px' }} className=' absolute z-5 flex justify-center flex-col rounded-t-lg overflow-hidden h-10 w-80 border-2 border-primary-green'>
                    <div className='flex flex-row'>
                      <input
                        type="text" className="h-10 border-primary-green w-full text-sm font-normal text-black"
                        value={inputValues[index]}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                      />
                      <button className='edit_btn w-10 ' onClick={() => changeTextAlignment(index)}>
                        {alignment_icons[card.titles[index].alignment]}
                      </button>
                      <button className='edit_btn w-10' onClick={() => moveTitle(index, 'up')} disabled={index === 0}>
                        ↑
                      </button>
                      <button className='edit_btn w-10' onClick={() => moveTitle(index, 'down')} disabled={index === card.titles.length - 1}>
                        ↓
                      </button>
                      <button className='edit_btn w-10' onClick={deleteTitle}>
                        X
                      </button>
                    </div>
                  </div>
                  <h1
                    onClick={() => setSelectedTitleIndex(index)}
                    className={`${title.size} ${title.color} text-${title.alignment} border-3 border-primary-green`}
                  >
                    {title.text}
                  </h1>
                </div>
              ) : (
                <h1
                  onClick={() => setSelectedTitleIndex(index)}
                  className={`${title.size} ${title.color} text-${title.alignment} border-3 hover:border-primary-green border-transparent`}
                >
                  {title.text}
                </h1>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
