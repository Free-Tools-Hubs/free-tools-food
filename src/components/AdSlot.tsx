import React from 'react';

interface AdSlotProps {
  type: 'leaderboard' | 'rectangle' | 'sidebar' | 'mobile-sticky';
}

const AdSlot: React.FC<AdSlotProps> = ({ type }) => {
  const styles: Record<string, React.CSSProperties> = {
    leaderboard: { width: '970px', height: '90px', margin: '2rem auto' },
    rectangle: { width: '300px', height: '250px', margin: '1rem auto' },
    sidebar: { width: '300px', height: '600px', margin: '0' },
    'mobile-sticky': { width: '320px', height: '100px', position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }
  };

  return (
    <div 
      className={`ad-placeholder ad-${type}`} 
      style={{
        ...styles[type],
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px dashed rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.7rem',
        color: 'var(--text-muted)',
        maxWidth: '100%'
      }}
    >
      ADVERTISEMENT ({type.toUpperCase()})
    </div>
  );
};

export default AdSlot;
