import Contact from '@components/Contact'

const Home = () => {
    return (
            <section className="w-full flex-center flex-col">
                <h1 className="head_text text-center" id="about-section">
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
                <div className="pt-96 pb-96" id="contact-section">Contact</div>
                <Contact/>
            </section> 
    )
}

export default Home