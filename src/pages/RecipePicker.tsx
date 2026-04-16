import React, { useState, useEffect } from 'react';
import { randomRecipePicker, Recipe } from '../modules/foodLogic';
import RecipeCard from '../components/RecipeCard';
import AdSlot from '../components/AdSlot';
import SEO from '../components/SEO';
import { useStore } from '../store/useStore';

const RecipePicker: React.FC = () => {
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spins, setSpins] = useState(0);
  const userPreferences = useStore(state => state.userPreferences);
  const trackAction = useStore(state => state.trackAction);
  
  const recipeSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "What Should I Cook Today Picker",
    "operatingSystem": "Web, Offline",
    "applicationCategory": "HealthApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const handleSpin = () => {
    setIsSpinning(true);
    setSpins(s => s + 1);
    trackAction('recipe');
    // Simulate spin animation
    setTimeout(() => {
      const recipe = randomRecipePicker({ 
        tag: userPreferences.diet !== 'Balanced' ? userPreferences.diet : undefined,
        maxCalories: userPreferences.calorieGoal / 3 
      });
      setCurrentRecipe(recipe);
      setIsSpinning(false);
    }, 800);
  };

  useEffect(() => {
    handleSpin();
  }, []);

  return (
    <div className="recipe-picker-page">
      <SEO 
        title="What Should I Cook Today? Random Recipe Generator" 
        description="Stop overthinking dinner. Get a random, healthy recipe based on your diet and calorie goals perfectly every time. 100% offline."
        schema={recipeSchema}
      />
      <section className="hero-section" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(to right, #f97316, #fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          What Should I Cook Today?
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '1rem auto' }}>
          Discover nutrient-packed meals tailored to your diet goals. 100% offline. Instant results.
        </p>
        <button 
          onClick={handleSpin} 
          disabled={isSpinning}
          style={{ 
            marginTop: '2rem', 
            padding: '1rem 2.5rem', 
            fontSize: '1.1rem', 
            background: 'var(--primary)', 
            color: 'white',
            boxShadow: '0 10px 15px -3px rgba(249, 115, 22, 0.3)',
            opacity: isSpinning ? 0.7 : 1
          }}
        >
          {isSpinning ? 'Picking your meal...' : 'Spin Again!'}
        </button>
        {spins >= 5 && <p style={{ color: 'var(--primary)', marginTop: '1rem', fontWeight: 'bold' }}>You've found {spins} options! Found "The One" yet? 🔥</p>}
      </section>

      <div className="recipe-picker-container">
        <div style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '450px' }}>
          {isSpinning ? (
            <div className="spinner-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="spinner" style={{ 
                width: '60px', 
                height: '60px', 
                border: '4px solid rgba(249, 115, 22, 0.1)', 
                borderTopColor: 'var(--primary)', 
                borderRadius: '50%', 
                animation: 'spin 0.8s linear infinite' 
              }} />
              <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Analyzing 1,000+ combinations...</p>
            </div>
          ) : (
            currentRecipe && <RecipeCard recipe={currentRecipe} />
          )}
        </div>
        <div className="sidebar-ads" style={{ width: '100%', maxWidth: '300px' }}>
          <AdSlot type="rectangle" />
          <div style={{ marginTop: '1rem' }} className="desktop-only">
             <AdSlot type="rectangle" />
          </div>
        </div>
      </div>

      {spins > 0 && <AdSlot type="mobile-sticky" />}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default RecipePicker;
