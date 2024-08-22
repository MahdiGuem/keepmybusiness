import {useState} from 'react';

export default function TextCard({ titles, background, mode}) {
  const [selectedElementID, setSelectedELementID] = useState()
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
        
        {titles.map((title, index) => (
          <div className="flex flex-col">
          {index==selectedElementID ? (
            <>
            <div className='flex justify-center flex-col rounded-t-lg overflow-hidden h-10 w-80 border-2 border-primary-green'>
              <div className='flex flex-row justify-between'>
                <input type="text" className="h-10 border-primary-green"/>
                <button className='edit_btn' onClick={() => moveTitle(index, 'up')} disabled={index === 0}>
                  ↑
                </button>
                <button className='edit_btn' onClick={() => moveTitle(index, 'down')} disabled={index === titles.length - 1}>
                  ↓
                </button>
                <button className='edit_btn' onClick={deleteElement}>
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
