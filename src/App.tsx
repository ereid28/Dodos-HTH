import React from 'react';
import './App.css'; // Ensure you import the CSS for animations
import WidgetLayout from './WidgetLayout';
import healthyBackground from './good_background.jpg'; // import the image
import depricatedBackground from './bad-background.png';
import { RootState } from './redux/store';
import { useSelector, useDispatch } from 'react-redux';

function App() {
    const ecoScore = useSelector((state: RootState) => state.layout.ecoScore);
  
  return (
    <div
      className="app"
      style={{
        backgroundImage: ecoScore > 20 ? `url(${healthyBackground})` : `url(${depricatedBackground})`,
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
