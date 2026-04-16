import React from 'react';
import EngagementBanner from '../components/EngagementBanner';
import AdSlot from '../components/AdSlot';
import SEO from '../components/SEO';
import { useStore } from '../store/useStore';
import recipes from '../data/recipes.json';
import RecipeCard from '../components/RecipeCard';
import { Recipe } from '../modules/foodLogic';

const Home: React.FC = () => {
  const { savedRecipes } = useStore();
  const bookmarkedRecipes = recipes.filter(r => savedRecipes.includes(r.slug)) as Recipe[];
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Food Tools Hub",
    "url": "https://food.freetoolshubs.com",
    "description": "100% Offline Meal Planner & Calorie Estimator",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://food.freetoolshubs.com/recipe/{search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="home-page">
      <SEO 
        title="100% Offline Meal Planner & Calorie Estimator" 
        description="Instant, rule-based meal planning and calorie estimation. No sign-up, no internet required. Privacy-first food tools for dieters and cooks."
        schema={homeSchema}
      />
      <EngagementBanner />
      <h1>Meal Planning Made Simple & Offline</h1>
      <AdSlot type="leaderboard" />
      <p>Instant, rule-based meal planning and calorie estimation. No sign-up, no internet required.</p>
      
      <div className="tools-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
        <div style={{ background: 'var(--panel)', padding: '2rem', borderRadius: '1rem' }}>
          <h3>What to Cook Today?</h3>
          <p>Get a random recipe based on your diet and target calories.</p>
        </div>
        <div style={{ background: 'var(--panel)', padding: '2rem', borderRadius: '1rem' }}>
          <h3>Daily Meal Planner</h3>
          <p>Drag and drop meals to build your perfect day.</p>
        </div>
        <div style={{ background: 'var(--panel)', padding: '2rem', borderRadius: '1rem' }}>
          <h3>Calorie Estimator</h3>
          <p>Quick, rule-based estimation for your custom ingredients.</p>
        </div>
      </div>

      {bookmarkedRecipes.length > 0 && (
        <section style={{ marginTop: '5rem' }}>
          <h2 style={{ marginBottom: '2rem' }}>Your Saved Recipes</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {bookmarkedRecipes.map(recipe => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        </section>
      )}

      <section style={{ marginTop: '5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '3rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Frequently Asked Questions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div>
            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Do I need an account?</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>No. Food Tools Hub is completely open. No sign-ups, no logins, no personal data collection.</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Does it work without internet?</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Yes! Once you visit the site, it caches all recipes and logic on your device, working 100% offline.</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Where is my data stored?</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Everything is stored locally in your browser's IndexedDB. Total privacy, total control.</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>What diets are supported?</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>We support Vegan, Keto, High-Protein, Low-Carb, and Balanced diets out of the box with over 1,000+ recipes.</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>How accurate are the calories?</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>We use a rule-based engine using verified ingredient averages. It's a high-accuracy estimation designed for daily consistency.</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Is this tool free forever?</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Yes. Food Tools Hub is an ad-supported free project. We aim to keep these tools accessible to everyone without subscriptions.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
