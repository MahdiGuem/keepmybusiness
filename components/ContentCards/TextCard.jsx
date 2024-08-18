import React from 'react';

export default function TextCard({ titles, background }) {
  return (
    <div className={`w-full h-screen flex-center flex-col p-4 ${background}`}>
      {titles.map((title, index) => (
        <h1
          key={index}
          className={`w-full ${title.size} ${title.color} text-${title.alignment}`}
        >
          {title.text}
        </h1>
      ))}
    </div>
  );
}
