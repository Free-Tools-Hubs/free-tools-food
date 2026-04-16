import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import recipes from '../data/recipes.json';
import { Recipe, ruleBasedCalorieEstimator, calculateMacroSplit } from '../modules/foodLogic';
import { pickDeterministic } from '../utils/deterministicRandomEngine';
import RecipeCard from '../components/RecipeCard';
import SEO from '../components/SEO';
import AdSlot from '../components/AdSlot';

const TONES = ['Quick & Easy', 'Healthy & Balanced', 'Budget-Friendly', 'High-Protein', 'Family-Style', 'Gourmet-Light'];
const TIPS = [
  'Swap chicken for tofu if you’re vegan.',
  'Pro tip: add a squeeze of lemon for extra brightness.',
  'Use a non-stick pan to reduce oil usage.',
  'Meal prep this in batches to save 40 minutes on weekdays.',
  'Pairs perfectly with a side of fresh greens.',
  'Kid-friendly hack: cut vegetables into small fun shapes.'
];

const DESCRIPTIONS = [
  'A nutrient-dense meal designed to keep you full and energized throughout the day.',
  'This one-pot wonder saves you time without compromising on flavor or health.',
  'A classic favorite reimagined for those who care about their daily calorie intake.',
  'High in protein and low in fuss, this recipe is a staple for busy fitness enthusiasts.',
  'Deliciously simple ingredients come together to create a restaurant-quality experience at home.',
  'The perfect balance of macros that doesn’t feel like a “diet” meal at all.',
  'Quick to prep and even quicker to cook, ideal for those late work nights.',
  'Budget-friendly and family-approved, what more could you ask for in a daily meal?'
];

const RecipeDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const recipe = useMemo(() => {
    return (recipes as Recipe[]).find(r => r.slug === slug);
  }, [slug]);

  if (!recipe) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem' }}>
        <h2>Recipe not found</h2>
        <Link to="/" style={{ color: 'var(--primary)' }}>Return Home</Link>
      </div>
    );
  }

  // Deterministic content generation
  const tone = pickDeterministic(TONES, recipe.slug);
  const description = pickDeterministic(DESCRIPTIONS, recipe.slug);
  const tip = pickDeterministic(TIPS, recipe.slug);
  
  const nutrition = ruleBasedCalorieEstimator(recipe.ingredients);
  const macros = calculateMacroSplit(recipe.ingredients);

  const recipeSchema = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": recipe.title,
    "recipeCuisine": recipe.cuisine,
    "description": description,
    "recipeYield": "1 serving",
    "nutrition": {
      "@type": "NutritionInformation",
      "calories": `${nutrition.total} calories`,
      "proteinContent": `${macros.protein}g`,
      "fatContent": `${macros.fat}g`,
      "carbohydrateContent": `${macros.carbs}g`
    },
    "recipeIngredient": recipe.ingredients.map(i => `${i.amount}${i.unit} ${i.id}`),
    "recipeInstructions": recipe.instructions.map(step => ({
      "@type": "HowToStep",
      "text": step
    }))
  };

  return (
    <div className="recipe-detail-page">
      <SEO 
        title={`${recipe.title} - ${recipe.cuisine} Meal Idea`} 
        description={description}
        schema={recipeSchema}
      />
      <nav style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
        <Link to="/" style={{ color: 'var(--text-muted)' }}>Home</Link>
        <span style={{ margin: '0 0.5rem', color: 'var(--text-muted)' }}>/</span>
        <Link to="/what-to-cook-today" style={{ color: 'var(--text-muted)' }}>Recipes</Link>
        <span style={{ margin: '0 0.5rem', color: 'var(--text-muted)' }}>/</span>
        <span style={{ color: 'var(--primary)' }}>{recipe.title}</span>
      </nav>

      <AdSlot type="leaderboard" />

      <div className="tool-grid">
        <article>
          <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1rem' }}>{recipe.title}</h1>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <span style={{ background: 'var(--primary)', padding: '0.3rem 0.8rem', borderRadius: '2rem', fontSize: '0.8rem', fontWeight: 'bold' }}>{tone}</span>
            <span style={{ border: '1px solid var(--text-muted)', padding: '0.3rem 0.8rem', borderRadius: '2rem', fontSize: '0.8rem' }}>{recipe.cuisine}</span>
          </div>

          <p style={{ fontSize: '1.4rem', lineHeight: '1.6', color: 'var(--text-muted)', marginBottom: '3rem' }}>
            {description}
          </p>

          <section style={{ marginBottom: '4rem' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Ingredients</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {recipe.ingredients.map((ing, i) => (
                <li key={i} style={{ 
                  padding: '1rem', 
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span>{ing.id.replace('_', ' ')}</span>
                  <span style={{ fontWeight: '600' }}>{ing.amount}{ing.unit}</span>
                </li>
              ))}
            </ul>
          </section>

          <section style={{ marginBottom: '4rem' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Instructions</h2>
            <ol style={{ paddingLeft: '1.5rem' }}>
              {recipe.instructions.map((step, i) => (
                <li key={i} style={{ marginBottom: '1.5rem', lineHeight: '1.6', paddingLeft: '0.5rem' }}>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <div style={{ background: 'rgba(249, 115, 22, 0.05)', padding: '2rem', borderRadius: '1rem', border: '1px dashed var(--primary)' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Real Home-Cook Tip:</h3>
            <p>{tip}</p>
          </div>
        </article>

        <aside>
          <div style={{ position: 'sticky', top: '100px' }}>
            <div style={{ background: 'var(--panel)', padding: '2rem', borderRadius: '1rem', marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Nutrition Facts</h3>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--primary)' }}>{nutrition.total}</div>
                <div style={{ color: 'var(--text-muted)' }}>CALORIES</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', textAlign: 'center' }}>
                <div>
                  <div style={{ fontWeight: 'bold' }}>{macros.protein}g</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>PROTEIN</div>
                </div>
                <div>
                  <div style={{ fontWeight: 'bold' }}>{macros.carbs}g</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>CARBS</div>
                </div>
                <div>
                  <div style={{ fontWeight: 'bold' }}>{macros.fat}g</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>FAT</div>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--panel)', padding: '2rem', borderRadius: '1rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Related Food Tools</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><Link to="/meal-planner" style={{ display: 'block', padding: '0.8rem 0', color: 'var(--text-muted)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>→ Meal Planner</Link></li>
                <li><Link to="/calorie-estimator" style={{ display: 'block', padding: '0.8rem 0', color: 'var(--text-muted)', textDecoration: 'none' }}>→ Calorie Estimator</Link></li>
              </ul>
            </div>
          </div>
        </aside>
      </div>

      <section style={{ marginTop: '6rem' }}>
        <h2 style={{ marginBottom: '2rem' }}>Similar Recipes to Try</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {recipes.slice(0, 3).map((r: any) => (
            <Link key={r.slug} to={`/recipe/${r.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <RecipeCard recipe={r} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RecipeDetail;
