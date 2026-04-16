import React from 'react';
import SEO from '../components/SEO';
import AdSlot from '../components/AdSlot';

const About: React.FC = () => {
  return (
    <div className="legal-content">
      <SEO 
        title="About Us" 
        description="Learn more about Food Tools Hub, our mission to provide offline-first meal planning tools, and how we help you achieve your health goals."
      />
      <h1>About Food Tools Hub</h1>
      <p>Welcome to Food Tools Hub, your ultimate destination for privacy-first, offline-capable food and nutrition tools.</p>
      
      <AdSlot type="leaderboard" />

      <h2>Our Mission</h2>
      <p>In a world of constant connectivity, we believe that basic health tools like meal planners and calorie estimators should work whenever and wherever you need them. Whether you're in a grocery store basement or traveling without data, Food Tools Hub ensures you stay on track with your goals.</p>

      <h2>100% Client-Side & Privacy-First</h2>
      <p>We don't store your data on our servers. In fact, we don't even have a database server for your personal info. Everything stays in your browser's local storage or IndexedDB. This makes our tools incredibly fast and completely private.</p>

      <h2>How It Works</h2>
      <p>Our tools use rule-based engines and a pre-packaged database of over 1,000 recipes and 400+ ingredients. All calculations are performed instantly on your device, ensuring a seamless experience without network lag.</p>
      
      <AdSlot type="rectangle" />
    </div>
  );
};

export default About;
