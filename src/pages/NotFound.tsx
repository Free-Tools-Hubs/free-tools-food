import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const NotFound: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
      <SEO title="404 - Page Not Found" description="The page you are looking for does not exist." />
      <h1 style={{ fontSize: '6rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '1rem' }}>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p style={{ color: 'var(--text-muted)', marginTop: '1rem', marginBottom: '3rem' }}>
        The recipe or tool you're looking for might have moved or doesn't exist.
      </p>
      <Link to="/" style={{ 
        background: 'var(--primary)', 
        color: 'white', 
        padding: '1rem 2rem', 
        borderRadius: '0.75rem', 
        textDecoration: 'none',
        fontWeight: 'bold'
      }}>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
