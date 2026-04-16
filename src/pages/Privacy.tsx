import React from 'react';
import SEO from '../components/SEO';

const Privacy: React.FC = () => {
  return (
    <div className="legal-content">
      <SEO 
        title="Privacy Policy" 
        description="Our privacy policy explains how we handle your data. Spoiler: we don't collect anything. Everything stays on your device."
      />
      <h1>Privacy Policy</h1>
      <p>Last updated: April 16, 2026</p>
      
      <p>At Food Tools Hub, we take your privacy seriously. This policy describes how we handle information when you use our website.</p>

      <h2>1. No Data Collection</h2>
      <p>Food Tools Hub is a 100% client-side application. We do not collect, store, or transmit any of your personal data, meal plans, or calorie logs to our servers. All information you enter is stored locally in your browser (LocalStorage and IndexedDB).</p>

      <h2>2. Third-Party Services</h2>
      <p>We use Google AdSense to serve advertisements. AdSense may use cookies to serve ads based on your previous visits to our website or other websites. You can opt out of personalized advertising by visiting Google's Ads Settings.</p>

      <h2>3. Analytics</h2>
      <p>We do not use invasive analytics tracking. Any basic performance monitoring we might use is designed to be anonymous and privacy-respecting.</p>

      <h2>4. Cookies</h2>
      <p>Our application uses local storage to save your preferences and meal history. This is essential for the functionality of the tools and does not involve tracking across other websites.</p>

      <h2>5. Changes to This Policy</h2>
      <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
    </div>
  );
};

export default Privacy;
