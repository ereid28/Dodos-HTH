// WidgetLayout.tsx (with MUI integration for widgets)
import React, { useState, useEffect } from 'react';
import Game from './Game';
import './WidgetLayout.css';
import QuestionWidget from './QuestionWidget';
import LeaderboardWidget from './LeaderboardWidget';
import EcoScoreWidget from './EcoScoreWidget';
import { Box, Paper, Typography, List, ListItem } from '@mui/material';

const WidgetLayout: React.FC = () => {

    const renderPlaceholderBox = (text: string) => (
        <Paper
            elevation={4}
            sx={{
                p: 2,
                width: '500px',
                minHeight: '200px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(240, 240, 240, 0.9)', // Light gray tint
            }}
        >
            <Typography>{text}</Typography>
        </Paper>
    );

    return (
        <Box className="layout-container">
            <Box className="widget-column">
                {<EcoScoreWidget ecoScore={95}/>}
                {<QuestionWidget/>}
                {renderPlaceholderBox("Left Widget 3")}
            </Box>

            <Box className="game-section">
                <Box className="game-header">Game Header</Box>
                <Box className="game-container">
                    <Game />
                </Box>
                <Box className="game-footer">Game Footer</Box>
            </Box>

            <Box className="widget-column">
                {<LeaderboardWidget/>}
                {renderPlaceholderBox("Right Widget 3")}
            </Box>
        </Box>
    );
};

export default WidgetLayout;
