// WidgetLayout.tsx (with MUI integration for widgets)
import React, {useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/store';
import {decrementEcoScore} from './redux/ecoScoreSlice';
import Game from './Game';
import './WidgetLayout.css';
import QuestionWidget from './QuestionWidget';
import LeaderboardWidget from './LeaderboardWidget';
import EcoScoreWidget from './EcoScoreWidget';
import { Box, Paper, Typography } from '@mui/material';

const WidgetLayout: React.FC = () => {
    const ecoScore = useSelector((state: RootState) => state.ecoScore.ecoScore);
    const dispatch = useDispatch();

    // Handle the decrement of ecoScore every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (ecoScore > 0) {
                dispatch(decrementEcoScore());
            }
        }, 2000); // Decrement every 2 seconds

        return () => clearInterval(interval); // Clear interval when component unmounts
    }, [ecoScore, dispatch]); // Re-run effect when ecoScore changes

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
                {<EcoScoreWidget ecoScore={ecoScore}/>}
                {<QuestionWidget/>}
                {renderPlaceholderBox("Left Widget 3")}
            </Box>

            <Box className="game-section">
                <Box className="game-header">DODO'S HIGH TIDE HUSTLE</Box>
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
