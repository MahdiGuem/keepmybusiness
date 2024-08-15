import Contact from '@components/Contact'

const Home = () => {
    return (
            <section className="w-full flex-center flex-col" id="about-section">
                <h1 className="head_text text-center">
                    Keep My Business
                    <br/>
                    <p className="green_gradient text-center">
                        ERP Landing site creator
                    </p>
                </h1>
                <p className="desc text-center">
                    Create and customize your landing page for your ERP!
                </p>
                <div className="pt-96 pb-96" id="preview-section">Preview</div>
                <div className="pt-96 pb-96" id="products-section">Products</div>
                <Contact id="contact-section"/>
            </section> 
    )
}

export default Home