// EcoScoreWidget.tsx
import React from 'react';
import './EcoScoreWidget.css';

interface EcoScoreWidgetProps {
    ecoScore: number;
}

const EcoScoreWidget: React.FC<EcoScoreWidgetProps> = ({ ecoScore }) => {
    const getEcoScoreColor = (score: number) => {
        if (score < 20) return '#ff0000';
        if (score < 40) return '#ff4500';
        if (score < 60) return '#ffa500';
        if (score < 80) return '#9acd32';
        return '#00ff00';
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

    return (
        <div
            style={{
                width: '100%',
                maxWidth: '500px',
                height: '100%',
                minHeight: '200px',
                boxSizing: 'border-box',
                padding: '1rem',
                borderRadius: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            }}
        >
            <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Eco-Score</div>

            <div
                style={{
                    width: '100%',
                    height: '50px',
                    backgroundColor: '#444',
                    borderRadius: '5px',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        width: ecoScore > 100 ? '100%' : `${ecoScore}%`,
                        height: '100%',
                        backgroundColor: getEcoScoreColor(ecoScore),
                        transition: 'width 0.3s ease, background-color 0.3s ease',
                    }}
                />
            </div>

            <div style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>{ecoScore}</div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    marginTop: '0.75rem',
                }}
            >
                {dotColors.map((color, index) => (
                    <div
                        key={index}
                        style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            backgroundColor: color,
                            transition: 'background-color 0.3s ease',
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default EcoScoreWidget;
