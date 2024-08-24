'use client';

import {useState} from 'react';

export default function TextCard({ titles, background, mode}) {
  const [selectedElementID, setSelectedELementID] = useState(null);
  const moveCard = (index, direction) => {
    const newCards = [...contentCards];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    [newCards[index], newCards[targetIndex]] = [newCards[targetIndex], newCards[index]];
    setContentCards(newCards);
  };
  const editElement = (index) => {
    setSelectedELementID(index)
  }
  const moveTitle = (index, direction) =>{

  }
  const deleteElement = (index) =>{

  }
  const handleTextChange = (e,index) =>{

  }
  return (
    <>
        {mode=="display" ? (
      <div className={`w-full h-screen flex-center flex-col p-4 ${background}`}>
        {titles.map((title, index) => (
          <h1
            key={index}
            className={` ${title.size} ${title.color} text-${title.alignment}`}
          >
            {title.text}
          </h1>
        ))}
      </div>
      ) : (
        <div className={`w-full h-screen flex-center flex-col ${background}`}>
            <div className='absolute top-0 right-0 mt-2 mr-2 z-5 flex justify-center flex-row rounded-bl-lg overflow-hidden h-10 w-fit border-2 border-slate-300 bg-slate-300'>
                <button className='edit_btn w-10 ' onClick={() => moveTitle('up')}>
                  BG
                </button>
                <p className="self-center pl-2 mr-2"> Add:</p>
                <button className='edit_btn w-10' onClick={() => moveTitle('up')}>
                  T0
                </button>
                <button className='edit_btn w-10' onClick={() => moveTitle('down')}>
                  T1
                </button>
                <button className='edit_btn w-10' onClick={deleteElement}>
                  t
                </button>
            </div>
        {titles.map((title, index) => (
          <div className="flex flex-col">
          {index==selectedElementID ? (
            <>
            <div className='z-5 flex justify-center flex-col rounded-t-lg overflow-hidden h-10 w-80 border-2 border-primary-green'>
              <div className='flex flex-row'>
                <input 
                  type="text" className="h-10 border-primary-green w-full"
                  placeholder="Search..."
                  value={title.text}
                  onChange={(e) => handleTextChange(e,index)}
                />
                <button className='edit_btn w-10 ' onClick={() => moveTitle(index, 'up')} disabled={index === 0}>
                  C
                </button>
                <button className='edit_btn w-10' onClick={() => moveTitle(index, 'up')} disabled={index === 0}>
                  ↑
                </button>
                <button className='edit_btn w-10' onClick={() => moveTitle(index, 'down')} disabled={index === titles.length - 1}>
                  ↓
                </button>
                <button className='edit_btn w-10' onClick={deleteElement}>
                  X
                </button>
              </div>
            </div>
            <h1
            onClick={() => editElement(index)}
            key={index}
            className={`${title.size} ${title.color} text-${title.alignment} border-3 border-primary-green`}
            >
            {title.text}
            </h1>
            </>
            
          ) : (
            <h1
            onClick={() => editElement(index)}
            key={index}
            className={`${title.size} ${title.color} text-${title.alignment} hover:border-3 border-primary-green `}
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
