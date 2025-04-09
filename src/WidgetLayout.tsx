// WidgetLayout.tsx (with MUI integration for widgets)
import React, {useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/store';
import { decrementEcoScore } from './redux/slice';
import Game from './Game';
import './WidgetLayout.css';
import QuestionWidget from './QuestionWidget';
import LeaderboardWidget from './LeaderboardWidget';
import EcoScoreWidget from './EcoScoreWidget';
import { Box, Paper, Typography } from '@mui/material';
import UserNameWidget from './UserNameWidget';
import { motion } from 'framer-motion';
const MotionBox = motion(Box);

const WidgetLayout: React.FC = () => {
    // redux state
    const ecoScore = useSelector((state: RootState) => state.layout.ecoScore);
    const userName = useSelector((state: RootState) => state.layout.userName);
    const dispatch = useDispatch();

    // Handle the decrement of ecoScore every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (ecoScore > 0 && userName.trim()) {
                dispatch(decrementEcoScore());
            }
        }, 2000); // Decrement every 2 seconds

        return () => clearInterval(interval); // Clear interval when component unmounts
    }, [ecoScore, dispatch, userName]); // Re-run effect when ecoScore changes

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
                    {userName && (
                        <MotionBox
                            className="game-container"
                            initial={{ opacity: 0, y: '-100%' }}
                            animate={{ opacity: 1, y : '0%' }}
                            transition={{ duration: 0.4 }}
                        >
                            <Game/>
                        </MotionBox>
                    )}
                    {!userName ? (
                        <motion.div
                            initial={{ y: '-100%' }}
                            animate={{ y: userName.trim() ? '0%' : 0 }}
                            transition={{ type: 'spring', stiffness: 100 }}
                        >
                            <UserNameWidget userName={userName}/>
                        </motion.div> 
                        ) : (
                        <Box className="game-footer">{userName}</Box> 
                    )}
            </Box>

            <Box className="widget-column">
                {<LeaderboardWidget/>}
                {renderPlaceholderBox("Right Widget 3")}
            </Box>
        </Box>
    );
};

export default WidgetLayout;
