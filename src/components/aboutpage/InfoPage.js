import React from 'react';
import './infoPage.css'; // Create and style the page with your custom CSS

const InfoPage = () => {
  return (
    <div className="legal-page">
      <h1>Craft Connect Information</h1>

      <section className="legal-section">
        <h2>Returns</h2>
        <p>If you're not satisfied with your order, you can initiate a return within 30 days of receiving it. Items must be in their original condition, and customers are responsible for return shipping costs unless the item is defective or incorrect. If you have specific return-related questions or concerns, you can directly contact the seller via the chat feature on their store page for assistance.</p>
      </section>

      <section className="legal-section">
        <h2>Delivery</h2>
        <p>We aim to deliver your orders as quickly as possible. Delivery times vary depending on the seller and the destination, but most orders are processed and shipped within 2-5 business days. If you need more specific delivery information, feel free to reach out to the seller directly through the chat feature to discuss shipping options, tracking details, or expected delivery times.</p>
      </section>


      <section className="legal-section">
        <h2>Privacy Policy</h2>
        <p>Your privacy is important to us. We take necessary steps to protect the data you share with us. We collect personal information such as name, email, and shipping address to process orders and provide customer support. Your information is never sold to third parties, and we use encryption and secure methods to protect your data.</p>
      </section>

      <section className="legal-section">
        <h2>Terms of Use</h2>
        <p>
            By using our platform, you agree to abide by the{' '}
            <a href="/terms-conditions">terms and conditions</a> of Craft Connect.
        </p>
      </section>

      <section className="legal-section">
        <h2>Contact Us</h2>
        <p>If you have any questions or concerns, don't hesitate to reach out. Our customer support team is available Monday through Friday, 9 AM to 6 PM. You can contact us via email.</p>
        <a href="mailto:contact@craftconnect.com">Email Us</a>
      </section>
    </div>
  );
};

export default InfoPage;
