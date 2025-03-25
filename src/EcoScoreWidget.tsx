import "./EcoScoreWidget.css";
import React from 'react';

interface EcoScoreWidgetProps {
    ecoScore: number;
}
  
  const EcoScoreWidget: React.FC<EcoScoreWidgetProps> = ({ ecoScore }) => {

    const getEcoScoreColor = (score: number) => {
        if (score < 20) return '#ff0000'; // Red
        if (score < 40) return '#ff4500'; // Orange-Red
        if (score < 60) return '#ffa500'; // Orange
        if (score < 80) return '#9acd32'; // Yellow-Green
        return '#00ff00'; // Green
    };

    const getDotColors = (score: number) => {
        const colors = [];
        for (let i = 0; i < 5; i++) {
          if (score >= (i + 1) * 20) {
            colors.push(getEcoScoreColor((i + 1) * 20)); // Color based on the range
          } else {
            colors.push('#444'); // Gray for inactive dots
          }
        }
        return colors;
      };
    
      const dotColors = getDotColors(ecoScore);

    return (
          <div className="menu-screen">
            {/* Eco Score Bar */}
            <div className="eco-score-container">
              <div className="eco-score-label">Eco-Score</div>
              <div className="eco-score-bar">
                <div
                  className="eco-score-fill"
                  style={{ 
                    width: ecoScore > 100 ? `100%` : `${ecoScore}%`, // Set the width based on the score
                    backgroundColor: getEcoScoreColor(ecoScore), // Dynamic color
                  }}
                ></div>
              </div>
              <div className="eco-score-value">{ecoScore}</div>
    
              {/* Eco Score Dots */}
              <div className="eco-score-dots">
                {dotColors.map((color, index) => (
                  <div
                    key={index}
                    className="eco-score-dot"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
      );
}

export default EcoScoreWidget;