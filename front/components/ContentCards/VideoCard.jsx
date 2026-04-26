'use client';

import { useState, useEffect } from 'react';
import EditMenu from '@components/EditMenu';
import ColorPicker from '@components/ColorPicker';

const save_icons = {
  true: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>,
  false:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
  </svg>
};

export default function VideoCard({ videoID, background, mode, updateCard, cardId, saveContent, changesSaved }) {
  const [bgMenuVisible, setBgMenuVisible] = useState(false);
  const [localVideoID, setLocalVideoID] = useState(videoID || '');
  const [cardBg, setCardBg] = useState(background || '#FFFFFF');

  console.log('VideoCard render:', { mode, videoID, localVideoID, cardId });

  useEffect(() => {
    console.log('VideoCard useEffect videoID:', videoID);
    setLocalVideoID(videoID || '');
  }, [videoID]);

  useEffect(() => {
    setCardBg(background || '#FFFFFF');
  }, [background]);

  const link_icon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
  </svg>;

  const handleVideoIDChange = (e) => {
    const value = e.target.value;
    console.log('handleVideoIDChange:', value);
    setLocalVideoID(value);
    if (updateCard && cardId) {
      updateCard(cardId, { videoId: value });
    }
  };

  const getVideoSrc = () => {
    if (!localVideoID) return '';
    let videoId = localVideoID.trim();
    videoId = videoId.split('?')[0].split('&')[0];
    if (videoId.includes('youtube.com/watch')) {
      const params = new URLSearchParams(videoId.split('?')[1] || videoId.split('watch?')[1]);
      videoId = params.get('v') || videoId;
    } else if (videoId.includes('youtu.be/')) {
      videoId = videoId.split('youtu.be/')[1] || videoId;
    }
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleBgColorSelect = (color) => {
    setCardBg(color);
    if (updateCard && cardId) {
      updateCard(cardId, { background: color });
    }
    setBgMenuVisible(false);
  };

  const bgMenuVisibility = () => {
    setBgMenuVisible((prev) => !prev);
  };

  if (mode === 'display') {
    return (
      <div className="w-full flex items-center align-middle justify-center min-h-screen" style={{ backgroundColor: cardBg }}>
        {localVideoID && (
          <iframe
            className="w-5/6 aspect-video items-center justify-center align-middle"
            src={getVideoSrc()}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    );
  }

  return (
    <div className="w-full flex items-center align-middle justify-center relative min-h-screen" style={{ backgroundColor: cardBg }}>
      <button 
        className={`absolute top-0 left-0 z-5 flex justify-center flex-row rounded-br-lg overflow-hidden h-10 w-48 border-2 border-slate-300 ${changesSaved ? 'bg-green-300' : 'bg-red-400'}`} 
        onClick={() => saveContent && saveContent()}
      >
        {save_icons[changesSaved]}
        {changesSaved ? ' Saved' : ' Save!'}
      </button>
      <EditMenu
        menuType="corner"
        menuButtons={['BG']}
        bgMenuVisibility={bgMenuVisibility}
      />
      {bgMenuVisible && (
        <div className="absolute top-10 right-0 z-10">
          <ColorPicker color={cardBg} onChange={handleBgColorSelect} />
        </div>
      )}
      <div className="absolute top-0 right-0 mt-2 mr-2 z-5 flex justify-center flex-row rounded-bl-lg overflow-hidden h-10 w-fit border-2 border-slate-300 bg-primary-green">
        <p className="self-center p-2 bg-slate-300"> {link_icon}</p>
        <input 
          type="text" 
          className="h-10 border-primary-green pl-2"
          placeholder="Specify video link here"
          value={localVideoID}
          onChange={handleVideoIDChange}
        />
      </div>
      {localVideoID && (
        <iframe
          className="w-5/6 aspect-video items-center justify-center align-middle"
          src={getVideoSrc()}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}