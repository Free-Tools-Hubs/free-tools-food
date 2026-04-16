import React from 'react';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';

const EngagementBanner: React.FC = () => {
  const { streak, history } = useStore();
  
  if (streak.count === 0 && history.recipesSearched === 0) return null;

  return (
    <div className="engagement-banner" style={{
      background: 'linear-gradient(90deg, #f97316 0%, #fb923c 100%)',
      padding: '1rem 2rem',
      borderRadius: '1rem',
      marginBottom: '2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 4px 20px rgba(249, 115, 22, 0.2)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {streak.count > 0 && (
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: '900' }}>🔥 {streak.count}</span>
            <div style={{ fontSize: '0.6rem', fontWeight: 'bold', opacity: 0.8 }}>DAY STREAK</div>
          </div>
        )}
        <div style={{ height: '30px', width: '1px', background: 'rgba(255,255,255,0.2)' }} />
        <div>
          <h4 style={{ margin: 0 }}>Welcome back!</h4>
          <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.9 }}>
            {history.lastPlanDate 
              ? `Your last plan was created on ${new Date(history.lastPlanDate).toLocaleDateString()}. Continue where you left off?`
              : "Ready to find your next healthy meal?"}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/meal-planner" style={{ 
          background: 'white', 
          color: 'var(--primary)', 
          padding: '0.5rem 1rem', 
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '0.85rem'
        }}>
          Open Planner
        </Link>
      </div>
    </div>
  );
};

export default EngagementBanner;
