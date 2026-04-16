import React, { useState } from 'react';
import { generateMealPlan, MealPlanDay } from '../modules/foodLogic';
import { useStore } from '../store/useStore';
import RecipeCard from '../components/RecipeCard';
import SEO from '../components/SEO';
import AdSlot from '../components/AdSlot';

const MealPlanner: React.FC = () => {
  const [plan, setPlan] = useState<MealPlanDay | null>(null);
  const userPreferences = useStore(state => state.userPreferences);
  const { setDiet, setCalorieGoal, trackAction } = useStore();

  const plannerSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Daily Meal Planner Tool",
    "operatingSystem": "Web, Offline",
    "applicationCategory": "HealthApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const handleGenerate = () => {
    const newPlan = generateMealPlan({ 
      diet: userPreferences.diet !== 'Balanced' ? userPreferences.diet : undefined,
      targetCalories: userPreferences.calorieGoal 
    }, 1);
    setPlan(newPlan[0]);
    trackAction('plan');
  };

  return (
    <div className="meal-planner-page">
      <SEO 
        title="Free Daily Meal Planner - 100% Offline & Private" 
        description="Build your perfect day of eating. Drag and drop meals, filter by diet, and hit your calorie goals. Works completely offline."
        schema={plannerSchema}
      />
      <section className="planner-header" style={{ marginBottom: '3rem' }}>
        <h1>Personalized Daily Planner</h1>
        <div style={{ 
          display: 'flex', 
          gap: '2rem', 
          background: 'var(--panel)', 
          padding: '2rem', 
          borderRadius: '1rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Diet Goal</label>
            <select 
              value={userPreferences.diet}
              onChange={(e) => setDiet(e.target.value)}
              style={{ 
                width: '100%', 
                background: 'rgba(0,0,0,0.2)', 
                color: 'white', 
                padding: '0.8rem', 
                borderRadius: '0.5rem',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <option>Balanced</option>
              <option>High-Protein</option>
              <option>Vegan</option>
              <option>Keto</option>
              <option>Low-Carb</option>
            </select>
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Daily Calorie Goal</label>
            <input 
              type="number" 
              value={userPreferences.calorieGoal}
              onChange={(e) => setCalorieGoal(parseInt(e.target.value))}
              style={{ 
                width: '100%', 
                background: 'rgba(0,0,0,0.2)', 
                color: 'white', 
                padding: '0.8rem', 
                borderRadius: '0.5rem',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button 
              onClick={handleGenerate}
              style={{ background: 'var(--primary)', color: 'white', padding: '0.8rem 2rem' }}
            >
              Generate Plan
            </button>
          </div>
        </div>
      </section>

      {plan && (
        <div className="plan-results">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2>Today's Plan</h2>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              Total: <span style={{ color: 'var(--primary)' }}>{plan.totalCalories}</span> / {userPreferences.calorieGoal} kcal
            </span>
          </div>

          <AdSlot type="leaderboard" />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="meal-slot">
              <span style={{ display: 'block', marginBottom: '1rem', fontWeight: '600', color: 'var(--text-muted)' }}>BREAKFAST</span>
              <RecipeCard recipe={plan.meals.breakfast} />
            </div>
            <div className="meal-slot">
              <span style={{ display: 'block', marginBottom: '1rem', fontWeight: '600', color: 'var(--text-muted)' }}>LUNCH</span>
              <RecipeCard recipe={plan.meals.lunch} />
            </div>
            <div className="meal-slot">
              <span style={{ display: 'block', marginBottom: '1rem', fontWeight: '600', color: 'var(--text-muted)' }}>DINNER</span>
              <RecipeCard recipe={plan.meals.dinner} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;
