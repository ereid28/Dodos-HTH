import React from 'react';
import './App.css'; // Ensure you import the CSS for animations
import WidgetLayout from './WidgetLayout';
import backgroundImage from './placeholder_background.jpg'; // import the image

function App() {
  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${backgroundImage})`,
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
