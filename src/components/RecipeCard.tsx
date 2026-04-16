import React from 'react';
import { Recipe } from '../modules/foodLogic';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const { savedRecipes, toggleSaveRecipe } = useStore();
  const isSaved = savedRecipes.includes(recipe.slug);

  return (
    <div className="recipe-card" style={{
      background: 'var(--panel)',
      borderRadius: '1rem',
      overflow: 'hidden',
      border: isSaved ? '1px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.2s',
      position: 'relative'
    }}>
      <div className="recipe-header" style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem' }}>{recipe.cuisine}</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{recipe.baseCalories} kcal</span>
        </div>
        <Link to={`/recipe/${recipe.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 style={{ marginTop: '0.5rem', cursor: 'pointer' }}>{recipe.title}</h3>
        </Link>
      </div>

      <div className="recipe-body" style={{ padding: '1.5rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Ingredients:</h4>
          <ul style={{ listStyle: 'none', fontSize: '0.9rem' }}>
            {(isExpanded ? recipe.ingredients : recipe.ingredients.slice(0, 3)).map((ing, i) => (
              <li key={i}>• {ing.amount}{ing.unit} {ing.id.replace('_', ' ')}</li>
            ))}
            {!isExpanded && recipe.ingredients.length > 3 && (
              <li
                onClick={() => setIsExpanded(true)}
                style={{ opacity: 0.6, cursor: 'pointer', color: 'var(--primary)', fontWeight: 'bold' }}
              >
                + {recipe.ingredients.length - 3} more...
              </li>
            )}
            {isExpanded && (
              <li
                onClick={() => setIsExpanded(false)}
                style={{ opacity: 0.6, cursor: 'pointer', color: 'var(--primary)', fontWeight: 'bold', marginTop: '0.5rem' }}
              >
                Show less
              </li>
            )}
          </ul>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {recipe.tags.map(tag => (
            <span key={tag} style={{
              background: 'rgba(139, 92, 246, 0.1)',
              color: 'var(--accent)',
              padding: '0.2rem 0.6rem',
              borderRadius: '1rem',
              fontSize: '0.75rem',
              fontWeight: '600'
            }}>{tag}</span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to={`/recipe/${recipe.slug}`} style={{ flex: 1, textDecoration: 'none' }}>
            <button style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', color: 'white' }}>
              Details
            </button>
          </Link>
          <button
            onClick={() => toggleSaveRecipe(recipe.slug)}
            style={{
              flex: 1,
              background: isSaved ? 'transparent' : 'var(--primary)',
              border: isSaved ? '1px solid var(--primary)' : 'none',
              color: 'white'
            }}
          >
            {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
