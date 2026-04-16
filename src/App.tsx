import React, { Suspense, lazy } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useStore } from './store/useStore';

// Lazy load components/pages
const Home = lazy(() => import('./pages/Home'));
const MealPlanner = lazy(() => import('./pages/MealPlanner'));
const RecipePicker = lazy(() => import('./pages/RecipePicker'));
const CalorieEstimator = lazy(() => import('./pages/CalorieEstimator'));
const RecipeDetail = lazy(() => import('./pages/RecipeDetail'));
const About = lazy(() => import('./pages/About'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App: React.FC = () => {
  const incrementStreak = useStore(state => state.incrementStreak);

  React.useEffect(() => {
    incrementStreak();
  }, [incrementStreak]);

  return (
    <div className="app-container">
      <header className="main-header">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/what-to-cook-today">What to Cook</Link>
          <Link to="/meal-planner">Meal Planner</Link>
          <Link to="/calorie-estimator">Calorie Estimator</Link>
        </nav>
      </header>

      <main>
        <Suspense fallback={<div className="loading-state">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/what-to-cook-today" element={<RecipePicker />} />
            <Route path="/meal-planner" element={<MealPlanner />} />
            <Route path="/calorie-estimator" element={<CalorieEstimator />} />
            <Route path="/recipe/:slug" element={<RecipeDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/terms-and-conditions" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-info">
            <h3 style={{ color: 'var(--primary)' }}>Food Tools Hub</h3>
            <p style={{ fontSize: '0.85rem' }}>100% Offline-first meal planning and nutrition tools. Privacy-focused, fast, and free.</p>
          </div>
          <div className="footer-links">
            <h4 style={{ color: 'white' }}>Quick Links</h4>
            <Link to="/what-to-cook-today">Recipe Picker</Link>
            <Link to="/meal-planner">Meal Planner</Link>
            <Link to="/calorie-estimator">Calorie Estimator</Link>
          </div>
          <div className="footer-links">
            <h4 style={{ color: 'white' }}>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-and-conditions">Terms & Conditions</Link>
          </div>
        </div>
        <div style={{ marginTop: '3rem', textAlign: 'center', fontSize: '0.75rem', opacity: 0.6 }}>
          &copy; {new Date().getFullYear()} Food Tools Hub. All rights reserved. 
          <br />
          Disclaimer: Not a substitute for professional medical or nutrition advice.
        </div>
      </footer>
    </div>
  );
};

export default App;
