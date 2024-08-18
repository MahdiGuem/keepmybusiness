import Contact from '@components/Contact'
import ContentCard from '@components/ContentCards/ContentCard';
import VideoCard from '@components/ContentCards/VideoCard';
import contentCards from './contentDatabase';


const Home = () => {
    const videoId = 'c9HfNg4a_Og?si=Knmerx93u7xEINAB'
    return (
            <section className="w-full flex-center flex-col" id="about-section">
                    {contentCards.map((card, index) => (
                        <ContentCard key={index} card={card} />
                    ))}
                <VideoCard videoId={videoId} />
                <div className="pt-96 pb-96" id="products-section">Products</div>
                <Contact id="contact-section"/>
            </section> 
    )
}

export default Home