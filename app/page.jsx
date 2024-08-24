import Contact from '@components/Contact'
import ContentCard from '@components/ContentCards/ContentCard';
import contentCards from './contentDatabase';

const Home = () => {
    const videoId = 'c9HfNg4a_Og?si=Knmerx93u7xEINAB'
    return (
            <div className=" w-full flex-col" id="about-section">
                    {contentCards.map((card, index) => (
                        <ContentCard id={card.id} key={index} card={card} mode='display' />
                    ))}
                <Contact id="contact-section"/>
            </div> 
    )
}

export default Home