'use client';

import TextCard from "@components/ContentCards/TextCard";
import VideoCard from "@components/ContentCards/VideoCard";
import ProductsCard from "@components/ContentCards/ProductsCard";


export default function ContentCard({ card, mode }) {

  switch (card.cardType) {
    case 'TextCard':
      return <TextCard {...card} mode={mode}/>;
    case 'VideoCard':
      return <VideoCard {...card} mode={mode}/>;
    case 'ProductsCard':
      return <ProductsCard {...card} mode={mode}/>;
    default:
      return null;
  }
}
