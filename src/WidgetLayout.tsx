// WidgetLayout.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/store';
import { incrementEcoScore } from './redux/ecoScoreSlice';
import Game from './Game';
import './WidgetLayout.css';
import QuestionWidget from './QuestionWidget';
import LeaderboardWidget from './LeaderboardWidget';
import EcoScoreWidget from './EcoScoreWidget';
import { Box, Paper, Typography } from '@mui/material';

const WidgetLayout: React.FC = () => {
    const ecoScore = useSelector((state: RootState) => state.ecoScore.ecoScore);
    const dispatch = useDispatch();

    const handleIncrement = () => {
        dispatch(incrementEcoScore());
    };

    const renderPlaceholderBox = (text: string) => (
        <Paper
            elevation={4}
            sx={{
                p: 2,
                width: '100%',
                maxWidth: '100%',
                minHeight: '20%',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(240, 240, 240, 0.9)',
                boxSizing: 'border-box',
                margin: '0.5rem 0',
                flexShrink: 0,
            }}
        >
            <Typography>{text}</Typography>
        </Paper>
    );

    return (
        <Box className="layout-container">
            {/* Left Widget Column */}
            <Box className="widget-column">
                <Box className="widget-box">
                    <EcoScoreWidget ecoScore={ecoScore} />
                </Box>
                <Box className="widget-box">
                    <QuestionWidget />
                </Box>
                <Box className="widget-box">
                    {renderPlaceholderBox("Left Widget 3")}
                </Box>
            </Box>

            {/* Game Section */}
            <Box className="game-section">
                <Box className="game-header">DODO'S HIGH TIDE HUSTLE</Box>
                <Box className="game-container">
                    <Game />
                </Box>
                <Box className="game-footer">Game Footer</Box>
            </Box>

            {/* Right Widget Column */}
            <Box className="widget-column">
                <Box className="widget-box">
                    <LeaderboardWidget />
                </Box>
                <Box className="widget-box">
                    {renderPlaceholderBox("Right Widget 3")}
                </Box>
            </Box>
        </Box>
    );
};

export default WidgetLayout;
