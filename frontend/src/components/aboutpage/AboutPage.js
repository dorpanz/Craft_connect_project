import Menu from '../menu/Menu'
import './AboutPage.css'
import aboutbanner from "./pics/banner-about.jpg"
import product from "./pics/product.jpg"
import community from "./pics/community.jpg"
import solution from "./pics/solution.jpg"
import price from "./pics/price.jpg"
import { ReadySell } from './ReadySell'
import Footer from '../footer/Foooter'
import { AnimatedSection } from '../animation/AnimatedSection'
import { useEffect } from 'react'


export const AboutPage = () =>{
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return(
        <div>
            <Menu />
            <AnimatedSection>
            <div className='header-about'>
                <img src={ aboutbanner } alt='banner-about-craft' className='banner-img'/>
                <div className='banner-about-desc'>
                    <p className='banner-title'>Craft Connect</p>
                    <p className='banner-desc'>Empowering Local Artisans, Connecting the World</p>
                </div>
            </div>
            </AnimatedSection>

    <AnimatedSection>
            <div className="section-about-us">
                <p className='section-about-us-title'>Welcome to Craft Connect—your gateway to discovering the world of local artistry.</p>
                <p className='section-about-us-text'>
                At Craft Connect, we believe in the power of creativity, tradition, and community. Our mission is to empower skilled artisans by providing them with a dedicated platform to showcase their handcrafted creations and connect with a global audience.
                </p>
                <p className='section-about-us-text'>
                We celebrate the diversity of craftsmanship—from intricate handwoven textiles to finely sculpted ceramics, from exquisite jewelry to beautifully carved wooden artifacts. Each piece tells a story, carrying the rich heritage, culture, and passion of its creator.
                </p>
                <p className='section-about-us-text'>
                By supporting independent artists, you become part of a movement that champions ethical trade, fair wages, and cultural preservation. Whether you're an artisan looking to reach a wider audience or a craft lover searching for something truly unique, Craft Connect is here to bring you closer to the heart of handmade excellence.
                </p>
            </div>

            <div className='section-offer'>
                <p className='section-offer-title '>What we offer?</p>
                <div className='section-offer-items-list'>

                <div className='section-offer-item'>
                    <img src={ product } alt='products'/>
                    <div className='section-offer-item-about'>
                        <p className='section-offer-item-about-title'>Products</p>
                        <p className='section-offer-item-about-desc'>Explore a curated selection of handcrafted items, each embodying the skill, culture, and heritage of its creator</p>
                    </div>
                </div>

                <div className='section-offer-item'>
                    <img src={ community } alt='community'/>
                    <div className='section-offer-item-about'>
                        <p className='section-offer-item-about-title'>Community</p>
                        <p className='section-offer-item-about-desc'>Join a network of creators and supporters who celebrate the artistry and uniqueness of each craft</p>
                    </div>
                </div>

                <div className='section-offer-item'>
                    <img src={ solution } alt='solution'/>
                    <div className='section-offer-item-about'>
                        <p className='section-offer-item-about-title'>Solutions</p>
                        <p className='section-offer-item-about-desc'>Access tools and resources tailored to help artisans thrive, including digital storefronts, marketing support, and more.</p>
                    </div>
                </div>

                <div className='section-offer-item'>
                    <img src={ price } alt='pricing handmade'/>
                    <div className='section-offer-item-about'>
                        <p className='section-offer-item-about-title'>Pricing</p>
                        <p className='section-offer-item-about-desc'>We offer accessible options that empower artisans of all sizes to share their work with the world.</p>
                    </div>
                </div>
                </div>
            </div>

    </AnimatedSection>

    <AnimatedSection>

            <div className='section-faqs section-offer'>
                <p className='section-offer-title'>FAQs</p>
                <div className='section-faqs-list'>
                    <div className='section-faqs-list-artisan'>
                        <p className='section-faqs-list-title'>For Artisans</p>
                        <ol>
                            <li>How can I start selling on Craft Connect?</li>
                            <p>Simply sign up for a seller account, create your artisan profile, and upload your products. Our platform makes it easy to list, manage, and showcase your handmade creations.</p>

                            <li>Are there any fees for selling on Craft Connect?</li>
                            <p>Craft Connect charges a small commission on each sale to cover platform maintenance and marketing efforts. There are no upfront listing fees.</p>

                            <li>How do I get paid for my sales?</li>
                            <p>Payments are processed securely through our platform and transferred to your linked bank account or payment method within 7 business days after an order is completed.</p>

                            <li>Can I customize my store page?</li>
                            <p>Yes! Craft Connect allows artisans to personalize their store with a bio, logo, and banner to showcase their unique identity.</p>

                            <li>What kind of products can I sell?</li>
                            <p>We accept a wide range of handmade items, including jewelry, home decor, clothing, artwork, and more. Products must comply with our guidelines for authenticity and quality.</p>
                        </ol>
                    </div>

                    <div className='line-vert'></div>
                    <div className='section-faqs-list-customers'>
                        <p className='section-faqs-list-title'>For Customers</p>
                        <ol>
                            <li>How do I place an order?</li>
                            <div>Browse products, add your favorites to the cart, and proceed to checkout. We’ll take care of the rest!</div>

                            <li>What payment methods are accepted?</li>
                            <p>We accept all major credit/debit cards, PayPal, and other secure payment options.</p>

                            <li>Can I contact artisans directly?</li>
                            <p>Yes! You can message artisans through their profile page to ask questions about their products or request custom orders.</p>

                            <li>What is the return policy?</li>
                            <p>Returns are accepted for damaged or defective items within 14 days of delivery. Custom orders are typically non-returnable unless specified by the artisan.</p>

                            <li>How can I track my order?</li>
                            <p>Once your order ships, you’ll receive a tracking number to follow its journey.</p>
                        </ol>
                    </div>
                </div>
            </div>
    </AnimatedSection>

    <AnimatedSection>
            <ReadySell/>
    </AnimatedSection>

    <AnimatedSection>
            <Footer/>
    </AnimatedSection>
        </div>
    )
}