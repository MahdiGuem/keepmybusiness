'use client';

import { useState, useEffect, useRef } from 'react';
import EditMenu from '@components/EditMenu';
import ColorPicker from '@components/ColorPicker';

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

const save_icons = {
  true: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>,
  false:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
  </svg>
}

export default function TextCard({ card, mode, updateCard, changesSaved, saveContent }) {
  const [bg, setBg] = useState(card.background);
  const [bgMenuVisible, setBgMenuVisible] = useState(false);
  const [selectedTitleIndex, setSelectedTitleIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const textRefs = useRef([]);

  const bgMenuVisibility = () => {
    setBgMenuVisible((prev) => !prev);
  };

  const handleBgColorSelect = (color) => {
    setBg(color);
    const updatedCard = { ...card, background: color };
    updateCard(card.id, updatedCard, true);
  };

  const handleBgColorInput = (e) => {
    const color = e.target.value;
    setBg(color);
    const updatedCard = { ...card, background: color };
    updateCard(card.id, updatedCard, true);
  };

  const handleTextColorInput = (index, color) => {
    const newTitles = [...card.titles];
    newTitles[index].color = color;
    const updatedCard = { ...card, titles: newTitles };
    updateCard(card.id, updatedCard, true);
  };

  const moveTitle = (index, direction) => {
    const newTitles = [...card.titles];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex >= 0 && targetIndex < newTitles.length) {
      [newTitles[index], newTitles[targetIndex]] = [newTitles[targetIndex], newTitles[index]];
      const updatedCard = { ...card, titles: newTitles };
      setSelectedTitleIndex(targetIndex);
      updateCard(card.id, updatedCard);
    }
  };

  const addText = (textType) => {
    let newText;
    switch (textType) {
      case "T0":
        newText = { size: 'head_text', color: 'green_gradient', text: 'Place Holder Title', alignment: 'left' };
        break;
      case "T1":
        newText = { size: 'head_text', color: '#000000', text: 'Place Holder Title', alignment: 'left' };
        break;
      case 't':
        newText = { size: 'desc', color: '#000000', text: 'Place Holder Title', alignment: 'left' };
        break;
      default:
        newText = null;
    }

    if (newText) {
      const updatedCard = { ...card, titles: [...card.titles, newText] };
      updateCard(card.id, updatedCard);
    }
  }

  const changeTextAlignment = (index) => {
    const newTitles = [...card.titles];
    switch(card.titles[index].alignment){
      case "left": newTitles[index].alignment = "center"; break;
      case "center": newTitles[index].alignment = "right"; break;
      case "right": newTitles[index].alignment = "left"; break;
      default: newTitles[index].alignment = "center";
    }
    const updatedCard = { ...card, titles: newTitles };
    updateCard(card.id, updatedCard);
  }

  const deleteTitle = (index) => {
    if (window.confirm('Are you sure you want to delete this text?')) {
      const newTitles = [...card.titles];
      newTitles.splice(index, 1);
      const updatedCard = { ...card, titles: newTitles };
      setSelectedTitleIndex(null);
      updateCard(card.id, updatedCard);
    }
  };

  const handleTextBlur = (index, e) => {
    const newText = e.target.innerText.trim();
    if (newText === '') {
      deleteTitle(index);
    } else {
      const newTitles = [...card.titles];
      newTitles[index].text = e.target.innerText;
      const updatedCard = { ...card, titles: newTitles };
      updateCard(card.id, updatedCard, true);
    }
  };

  useEffect(() => {
    setSelectedTitleIndex(null);
  }, []);

  useEffect(() => {
    setBg(card.background);
  }, [card.background]);

  const getTextColorStyle = (color) => {
    if (color === 'green_gradient') {
      return {
        background: 'linear-gradient(to right, #22C55E, #3B82F6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      };
    }
    return { color };
  };

  return (
    <>
      {mode === "display" ? (
        <div className="w-full h-screen flex-center flex-col p-12" style={{ backgroundColor: bg }}>
          {card.titles.map((title, index) => (
            <h1
              key={`${card.id}-title-${index}`}
              className={`w-full ${title.size} text-${title.alignment}`}
              style={getTextColorStyle(title.color)}
            >
              {title.text}
            </h1>
          ))}
        </div>
      ) : (
        <div className="relative w-full h-screen flex-center flex-col overflow-scroll" style={{ backgroundColor: bg }}>
          <button className={`absolute top-0 left-0 z-5 flex justify-center flex-row rounded-br-lg overflow-hidden h-10 w-48 border-2 border-slate-300 ${changesSaved ? 'bg-green-300' : 'bg-red-400'}`} 
          onClick={() => saveContent()}>
            {save_icons[changesSaved]}
            {changesSaved ? ' Saved' : ' Save!'}
          </button>

          <EditMenu
            menuType="corner"
            menuButtons={['BG', 'add', 'T0', 'T1', 't']}
            addText={addText}
            bgMenuVisibility={bgMenuVisibility}
          />

          {bgMenuVisible && (
            <div className="absolute top-10 right-0 z-30">
              <ColorPicker color={bg} onChange={(color) => {
                setBg(color);
                const updatedCard = { ...card, background: color };
                updateCard(card.id, updatedCard, true);
              }} />
            </div>
          )}

          {card.titles.map((title, index) => {
            const isSelected = selectedTitleIndex === index;
            const isHovered = hoverIndex === index && !isSelected;
            
            return (
              <div key={`${card.id}-title-${index}`} className="w-full relative">
                {isSelected && (
                  <>
                    <div className="absolute z-30 top-10 right-0">
                      <ColorPicker 
                        color={title.color === 'green_gradient' ? '#22C55E' : title.color} 
                        onChange={(color) => handleTextColorInput(index, color)}
                        title="Text Color"
                        small
                      />
                    </div>
                    <div className="absolute z-20 flex rounded-lg overflow-hidden h-10 border-2 border-primary-green" style={{ top: '-46px', left: '0px' }}>
                      <div className="flex flex-row h-full">
                        <button className="edit_btn px-2 h-full" onClick={() => changeTextAlignment(index)}>
                          {alignment_icons[title.alignment]}
                        </button>
                        <button className="edit_btn px-2 h-full" onClick={() => moveTitle(index, 'up')} disabled={index === 0}>
                          ↑
                        </button>
                        <button className="edit_btn px-2 h-full" onClick={() => moveTitle(index, 'down')} disabled={index === card.titles.length - 1}>
                          ↓
                        </button>
                        <button className="edit_btn px-2 h-full" onClick={() => deleteTitle(index)}>
                          X
                        </button>
                      </div>
                    </div>
                  </>
                )}
                <h1
                  ref={el => textRefs.current[index] = el}
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextBlur(index, e)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTitleIndex(index);
                  }}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  className={`w-full ${title.size} text-${title.alignment} ${isSelected ? 'border-3 border-primary-green' : isHovered ? 'border-3 border-primary-green border-dashed' : ''}`}
                  style={getTextColorStyle(title.color)}
                >
                  {title.text}
                </h1>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}