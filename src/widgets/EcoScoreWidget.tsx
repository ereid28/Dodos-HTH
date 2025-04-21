import React, { useEffect } from 'react';
import './EcoScoreWidget.css';

interface EcoScoreWidgetProps {
    ecoScore: number;
    triggerJitter: () => void;  // Add triggerJitter prop
}

const EcoScoreWidget: React.FC<EcoScoreWidgetProps> = ({ ecoScore, triggerJitter }) => {
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
                colors.push(getEcoScoreColor((i + 1) * 20));
            } else {
                colors.push('#444');
            }
        }
        return colors;
    };

    const dotColors = getDotColors(ecoScore);

    // You can trigger jitter when certain conditions are met, e.g., low ecoScore
    // Use a useEffect to trigger jitter when ecoScore is low
    useEffect(() => {
        if (ecoScore < 20) {
            triggerJitter(); // Trigger jitter when ecoScore is below 20
        }
    }, [ecoScore, triggerJitter]); // Depend on ecoScore, so it triggers when it changes

    return (
        <div className="eco-score-wrapper">
            <div className="eco-score-container">
                <div className="eco-score-label">Eco-Score</div>

                <div className="eco-score-bar">
                    <div
                        className="eco-score-fill"
                        style={{
                            width: ecoScore > 100 ? '100%' : `${ecoScore}%`,
                            backgroundColor: getEcoScoreColor(ecoScore),
                        }}
                    />
                </div>

                <div className="eco-score-value">{ecoScore}</div>

                <div className="eco-score-dots">
                    {dotColors.map((color, index) => (
                        <div
                            key={index}
                            className="eco-score-dot"
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EcoScoreWidget;
