import React from 'react';
import EngineeringCalculator from './EngineeringCalculator';

function App() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#111827' 
    }}>
      <EngineeringCalculator />
    </div>
  );
}

export default App;