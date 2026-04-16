import React from 'react';
import SEO from '../components/SEO';

const Terms: React.FC = () => {
  return (
    <div className="legal-content">
      <SEO 
        title="Terms and Conditions" 
        description="Terms and conditions for using Food Tools Hub. Professional health advice disclaimer and usage rules."
      />
      <h1>Terms and Conditions</h1>
      <p>Last updated: April 16, 2026</p>

      <h2>1. Acceptance of Terms</h2>
      <p>By accessing or using Food Tools Hub, you agree to be bound by these Terms and Conditions.</p>

      <h2>2. Use Disclaimer (Not Medical Advice)</h2>
      <p>The content provided by Food Tools Hub, including meal plans and calorie estimations, is for informational purposes only. It is NOT intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or diet.</p>

      <h2>3. Limitation of Liability</h2>
      <p>Food Tools Hub and its creators shall not be liable for any damages resulting from the use or inability to use our tools or information.</p>

      <h2>4. Intellectual Property</h2>
      <p>The code, design, and certain data assets of Food Tools Hub are protected by copyright and other intellectual property laws.</p>

      <h2>5. Governing Law</h2>
      <p>These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the site operator resides.</p>
    </div>
  );
};

export default Terms;
