import React from "react";
import "./Homepage.css";
import Menu from "../menu/Menu";
import Footer from "../footer/Foooter";
import { ReadySell } from "../aboutpage/ReadySell";
import shoppic from "./pics/Group 110.png"
import support from "../aboutpage/pics/community.jpg"
import analytics from "./pics/analytics.png"
import { AnimatedSection } from "../animation/AnimatedSection";
import profile from "./pics/pic.png"
import profile2 from "./pics/profile.jpg"
const HomePage = () => {
  return (
    <div className="home-container">
      <Menu/>
      <AnimatedSection>

      {/* Hero Section */}
      <section className="hero-section">
        <h2>Everything you need to start selling your art and craft online.</h2>
        <p>When you sign up for your Craft Connect account, you get:</p>
      </section>
      </AnimatedSection>

<AnimatedSection>

      {/* Features Section */}
      <section className="features-section">
  <div className="feature left">
    <img src={shoppic} alt="Your shop" />
    <div className="feature-info">

    <h3>Your own shop</h3>
    <p>An online store ready to fill up with your hand-crafted items, which you can personalise with your own banner or use one of our templates</p>
    </div>
  </div>
  
  <div className="feature right">
    <div className="feature-info">

    <h3>Fast and Friendly Support</h3>
    <p>Our support team is on hand to help you with any questions. Based in the Canada, they get back to 80% of enquiries within a day</p>
    </div>
    <img src={support} alt="Support" />
  </div>
  
  <div className="feature left">
    <img src={analytics} alt="Shop analytics" />
    <div className="feature-info">

    <h3>Shop analytics</h3>
    <p>Keep track of your views and which items are performing best with our simple-to-use shop analytics</p>
    </div>
  </div>
</section>
</AnimatedSection>

<AnimatedSection>

    <ReadySell/>
</AnimatedSection>
      {/* Testimonials Section */}
      <AnimatedSection>

      <section className="testimonials-section">
      <h3>Loved by Crafters</h3>
<p>We're really proud of Craft Connect and here’s what makers have to say about us:</p>
<div className="reviews-crafters">
  <div className="reviews-crafters-item">
    <p>Thanks for making it possible for people like me to sell online and be part of a lovely, supportive community</p>
    <div className="line-2"></div>
    <div className="reviews-crafters-item-by">
      <p>Jeweller Helen Duncan Silver Nutmeg</p>
      <img src={support} alt="profile" />
    </div>
  </div>

  <div className="reviews-crafters-item">
    <p>Craft Connect has been a game-changer for my business. The platform is easy to use, and I've been able to connect with so many new customers!</p>
    <div className="line-2"></div>
    <div className="reviews-crafters-item-by">
      <p>Artist Emma Brooks Creative Blooms</p>
      <img src={profile2} alt="profile" />
    </div>
  </div>

  <div className="reviews-crafters-item">
    <p>I love the sense of community here. It’s more than just a platform—it’s a place where makers truly support one another.</p>
    <div className="line-2"></div>
    <div className="reviews-crafters-item-by">
      <p>Crafter Sarah Lee The Stitchery</p>
      <img src={profile} alt="profile" />
    </div>
  </div>
</div>

      </section>
      </AnimatedSection>
<AnimatedSection>

      <div className="section-faqs-sell">
      <p className="section-offer-title-sell">FAQs</p>
      <p>
        If you have a question that isn’t answered here, ask our friendly Craft
        Connect support team.
      </p>
      <div className="faq-grid">
        <div className="faq-item">
          <p className="faq-question">How does Craft Connect work?</p>
          <p>
            Craft Connect is an online marketplace where you can have your own
            shop and list your items for sale. When you sell something, you
            receive a notification and the payment for that order goes directly
            into either your Paypal or Stripe account. You then send the order
            to your customer.
          </p>
        </div>

        <div className="faq-item">
          <p className="faq-question">What can I sell on Craft Connect?</p>
          <p>
            You can sell items you have made yourself or designed yourself, and
            you can sell craft supplies that other people can use in their
            creations.
          </p>
        </div>

        <div className="faq-item">
          <p className="faq-question">Is my work good enough?</p>
          <p>
            We believe craft is beneficial for our health and well-being and
            want to encourage as many people to make and create as possible.
            That’s why we ‘do’ Craft Connect and why we choose not to have any
            gatekeepers deciding whether your work is “good enough”. On Craft
            Connect, pieces made at a kitchen table sit next to pieces
            hand-crafted by professional artisans in their studio - and we love
            it that way. So yes, if your work is made by you within Canada, it
            is absolutely good enough!
          </p>
        </div>

        <div className="faq-item">
          <p className="faq-question">
            Who will see my products and how do you promote your sellers?
          </p>
          <p>
            Customers find products on Craft Connect via our ‘Search’ facility,
            departments, and featured sections. Your products may also appear in
            curated features such as our Craft Connect Recommended and Gift
            Guides, in our social media posts, and in our email marketing
            campaigns. We also run free Google Shopping Ads for all products on
            Craft Connect that meet Google’s criteria, and we regularly run
            social media ads aimed at customers.
          </p>
        </div>
      </div>
    </div>
</AnimatedSection>

<AnimatedSection>

      {/* Footer */}
     <Footer/>
</AnimatedSection>
    </div>
  );
};

export default HomePage;
