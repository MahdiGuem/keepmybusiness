'use client'
import { useState, useEffect } from 'react';
import Contact from '@components/Contact';
import TextCard from "@components/ContentCards/TextCard";
import VideoCard from "@components/ContentCards/VideoCard";
import ProductsCard from "@components/ContentCards/ProductsCard";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true); 
  const [contentCards, setContentCards] = useState([]);

  
  const getContentCard= ( card, mode ) => {
  switch (card.cardType) {
    case 'TextCard':
      return <TextCard card={card} mode={mode}/>;
    case 'VideoCard':
      return <VideoCard {...card} mode={mode}/>;
    case 'ProductsCard':
      return <ProductsCard {...card} mode={mode}/>;
    default:
      return null;
  }
}

  const fetchContent = async () => {
    try {
      const res = await fetch('http://localhost:8080/content');
      const data = await res.json();
      setContentCards(data);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-full">
          {/* Loading Spinner */}
          <svg
            className="animate-spin h-8 w-8 text-primary-green"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
        </div>
      ) : (
        <div className="w-full flex-col" id="about-section">
          {contentCards.map((card, index) => (
            <div key={index}>
              {getContentCard(card, "display")}
              <div className="overflow-visible h-0 flex items-center">
                <div
                  className={`w-[110vw] h-10 bg-gradient-to-r from-blue-500 to-green-500 transform z-10 shadow-lg ${
                    index % 2 === 0 ? 'rotate-1' : '-rotate-1'
                  }`}
                />
              </div>
            </div>
          ))}

          <Contact />
        </div>
      )}
    </>
  );
};

export default Home;
