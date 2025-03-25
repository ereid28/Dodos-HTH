// App.tsx
import React from 'react';
import './App.css';
import WidgetLayout from './WidgetLayout';
import backgroundImage from './tester-bg-pic.jpg'; // import the image

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
