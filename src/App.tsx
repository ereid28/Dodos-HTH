import React from 'react';
import './App.css'; // Ensure you import the CSS for animations
import WidgetLayout from './WidgetLayout';
import { RootState } from './redux/store';
import { useSelector } from 'react-redux';

function App() {
    const ecoScore = useSelector((state: RootState) => state.layout.ecoScore);
  
  return (
    <div
      className="app"
      style={{
        backgroundImage: ecoScore > 20 ? `url(${process.env.PUBLIC_URL}/good_background.jpg)` : `url(${process.env.PUBLIC_URL}/bad_background.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100vw',
      }}
    >
      <WidgetLayout />
    </div>
  );
}

export default App;
