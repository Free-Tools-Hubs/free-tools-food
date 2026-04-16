import React, { useState, useMemo } from 'react';
import { ruleBasedCalorieEstimator, Ingredient, calculateMacroSplit } from '../modules/foodLogic';
import ingredientDatabase from '../data/ingredientDatabase.json';
import SEO from '../components/SEO';
import AdSlot from '../components/AdSlot';

const CalorieEstimator: React.FC = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([
    { id: 'chicken_breast', amount: 200, unit: 'g' },
    { id: 'brown_rice', amount: 150, unit: 'g' }
  ]);

  const estimatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Rule-Based Calorie Estimator",
    "operatingSystem": "Web, Offline",
    "applicationCategory": "HealthApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const estimation = useMemo(() => ruleBasedCalorieEstimator(selectedIngredients), [selectedIngredients]);
  const macros = useMemo(() => calculateMacroSplit(selectedIngredients), [selectedIngredients]);

  const addIngredient = (id: string) => {
    setSelectedIngredients([...selectedIngredients, { id, amount: 100, unit: 'g' }]);
  };

  const updateAmount = (index: number, amount: number) => {
    const next = [...selectedIngredients];
    next[index].amount = amount;
    setSelectedIngredients(next);
  };

  const removeIngredient = (index: number) => {
    setSelectedIngredients(selectedIngredients.filter((_, i) => i !== index));
  };

  return (
    <div className="calorie-estimator-page">
      <SEO 
        title="Offline Calorie Estimator - Quick & Rule-Based" 
        description="Estimate any meal's calories instantly without an internet connection. Rule-based calculations for accurate macro breakdowns."
        schema={estimatorSchema}
      />
      <h1 style={{ marginBottom: '2rem' }}>Rule-Based Calorie Estimator</h1>
      
      <AdSlot type="leaderboard" />

      <div className="tool-grid">
        <div className="input-section">
          <div style={{ background: 'var(--panel)', padding: '2rem', borderRadius: '1rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Ingredients List</h3>
            {selectedIngredients.map((ing, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                marginBottom: '1rem',
                padding: '1rem',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '0.5rem'
              }}>
                <span style={{ flex: 1, fontWeight: '500' }}>{ing.id.replace('_', ' ')}</span>
                <input 
                  type="number" 
                  value={ing.amount} 
                  onChange={(e) => updateAmount(index, parseInt(e.target.value) || 0)}
                  style={{ width: '80px', background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '0.4rem', borderRadius: '0.3rem' }}
                />
                <span style={{ color: 'var(--text-muted)' }}>{ing.unit}</span>
                <button 
                  onClick={() => removeIngredient(index)}
                  style={{ background: 'transparent', color: '#ef4444', fontSize: '1.2rem' }}
                >
                  ×
                </button>
              </div>
            ))}

            <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Add Quick Items:</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {ingredientDatabase.slice(0, 10).map((item) => (
                  <button 
                    key={item.id} 
                    onClick={() => addIngredient(item.id)}
                    style={{ background: 'rgba(255,255,255,0.05)', fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                  >
                    + {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="results-section">
          <div className="sticky-sidebar" style={{ 
            background: 'var(--panel)', 
            padding: '2rem', 
            borderRadius: '1rem', 
            border: '2px solid var(--primary)'
          }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Total Calories</h2>
            <div style={{ 
              fontSize: '4rem', 
              fontWeight: '900', 
              textAlign: 'center', 
              color: 'var(--primary)',
              lineHeight: 1
            }}>
              {estimation.total}
            </div>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '0.5rem' }}>kcal estimated</p>

            <div style={{ marginTop: '3rem' }}>
              <h4 style={{ marginBottom: '1rem' }}>Macro Breakdown:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Protein</span>
                  <span style={{ color: '#10b981' }}>{macros.protein}g</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Carbs</span>
                  <span style={{ color: '#0ea5e9' }}>{macros.carbs}g</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Fat</span>
                  <span style={{ color: '#f59e0b' }}>{macros.fat}g</span>
                </div>
              </div>
            </div>

            <button style={{ width: '100%', background: 'var(--primary)', color: 'white', marginTop: '2.5rem', padding: '1rem' }}>
              Save Calculation
            </button>
            <div style={{ marginTop: '2rem' }}>
              <AdSlot type="rectangle" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalorieEstimator;
