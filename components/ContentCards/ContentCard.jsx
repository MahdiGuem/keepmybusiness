'use client';

import TextCard from "@components/ContentCards/TextCard";
import VideoCard from "@components/ContentCards/VideoCard";
import ProductsCard from "@components/ContentCards/ProductsCard";

export default function ContentCard({ card }) {
  switch (card.cardType) {
    case 'TextCard':
      return <TextCard {...card} />;
    case 'VideoCard':
      return <VideoCard {...card}/>;
    case 'ProductsCard':
      return <ProductsCard {...card}/>;
    default:
      return null;
  }
}
