import React, { useEffect } from "react";

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>Craft Connect Seller Terms and Conditions</h1>
      <p>
        Welcome to Craft Connect! By registering as a seller on our platform,
        you agree to the following terms and conditions. Please read them
        carefully before proceeding with your shop registration.
      </p>

      <h2>1. Introduction</h2>
      <p>
        Craft Connect is an e-commerce platform designed to help artisans
        showcase and sell their handmade products. These Terms and Conditions
        govern your use of our platform as a seller.
      </p>

      <h2>2. Seller Eligibility</h2>
      <ul>
        <li>You must be at least 18 years old to register as a seller.</li>
        <li>You must provide accurate and complete registration information.</li>
        <li>You must be a resident of Canada, as Craft Connect is specifically for Canadian sellers.</li>
        <li>
          You are responsible for ensuring compliance with local, state, and
          national laws regarding your products and business operations.
        </li>
      </ul>

      <h2>3. Product Listings</h2>
      <ul>
        <li>Products listed on Craft Connect must be handmade, crafted, or designed by you.</li>
        <li>You must provide clear, accurate descriptions and images of your products.</li>
        <li>Counterfeit, illegal, or prohibited items are not allowed.</li>
        <li>You are responsible for managing inventory and fulfilling orders promptly.</li>
      </ul>

      <h2>4. Fees and Payments</h2>
      <ul>
        <li>
          Craft Connect may charge a commission or listing fee for products
          sold on the platform. Specific fee details will be provided
          separately.
        </li>
        <li>Payments will be processed through integrated third-party services like PayPal or Stripe.</li>
        <li>Sellers are responsible for any applicable taxes on their sales.</li>
      </ul>

      <h2>5. Order Fulfillment and Shipping</h2>
      <ul>
        <li>Sellers must process and ship orders within the timeframe specified in their listings.</li>
        <li>Shipping costs and delivery times must be clearly stated.</li>
        <li>Sellers are responsible for handling returns and exchanges in accordance with the platform’s policies.</li>
      </ul>

      <h2>6. Customer Interaction and Dispute Resolution</h2>
      <ul>
        <li>Sellers must maintain professional communication with customers.</li>
        <li>Any disputes with buyers should be resolved in good faith.</li>
        <li>
          Craft Connect reserves the right to mediate disputes but does not
          guarantee a resolution.
        </li>
      </ul>

      <h2>7. Compliance and Intellectual Property</h2>
      <ul>
        <li>Sellers must ensure they have the rights to sell all listed products.</li>
        <li>Any intellectual property violations (e.g., unauthorized use of trademarks) may result in account suspension or termination.</li>
        <li>Content submitted (e.g., images, descriptions) grants Craft Connect a non-exclusive right to use it for promotional purposes.</li>
      </ul>

      <h2>8. Account Suspension and Termination</h2>
      <ul>
        <li>Craft Connect reserves the right to suspend or terminate seller accounts for violations of these terms.</li>
        <li>Reasons for termination include, but are not limited to, fraudulent activity, repeated policy violations, and failure to fulfill orders.</li>
        <li>Sellers may request account closure at any time, subject to the completion of any outstanding transactions.</li>
      </ul>

      <h2>9. Liability and Indemnification</h2>
      <ul>
        <li>Craft Connect is not responsible for any direct or indirect losses related to selling on the platform.</li>
        <li>Sellers agree to indemnify and hold Craft Connect harmless from claims related to their products and business practices.</li>
      </ul>

      <h2>10. Amendments and Updates</h2>
      <ul>
        <li>Craft Connect reserves the right to update these Terms and Conditions at any time.</li>
        <li>Sellers will be notified of significant changes, and continued use of the platform constitutes agreement to the updated terms.</li>
      </ul>

      <p>
        By proceeding with your shop registration, you acknowledge that you have
        read, understood, and agreed to these Terms and Conditions.
      </p>

      <p>
        For any questions or support, please contact us at{" "}
        <strong>[Insert Contact Information]</strong>.
      </p>
    </div>
  );
};

export default TermsAndConditions;
