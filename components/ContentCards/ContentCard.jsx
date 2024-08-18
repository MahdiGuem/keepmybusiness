import TextCard from "@components/ContentCards/TextCard";

export default function ContentCard({ card }) {
  switch (card.cardType) {
    case 'TextCard':
      return <TextCard {...card} />;
    default:
      return null;
  }
}
