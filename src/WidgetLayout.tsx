// WidgetLayout.tsx (with MUI integration for widgets)
import React, {useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/store';
import { decrementEcoScore, setEcoScore } from './redux/slice';
import './WidgetLayout.css';
import Game from './Game';
import QuestionWidget from './widgets/QuestionWidget';
import LeaderboardWidget from './widgets/LeaderboardWidget';
import EcoScoreWidget from './widgets/EcoScoreWidget';
import UserNameWidget from './widgets/UserNameWidget';
import StoryWidget from './widgets/StoryWidget';
import ResourceWidget from './widgets/ResourceWidget';
import { Box, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
const MotionBox = motion(Box);

const WidgetLayout: React.FC = () => {
    // redux state
    const ecoScore = useSelector((state: RootState) => state.layout.ecoScore);
    const userName = useSelector((state: RootState) => state.layout.userName);
    const dispatch = useDispatch();

    // State to manage jitter effect
    const [jitter, setJitter] = useState(false);

    // Handle the decrement of ecoScore every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (ecoScore > 0 && userName.trim()) {
                dispatch(decrementEcoScore());
            }
        }, 2000); // Decrement every 2 seconds

        return () => clearInterval(interval); // Clear interval when component unmounts
    }, [ecoScore, dispatch, userName]); // Re-run effect when ecoScore changes

    // Function to trigger jitter effect
    const triggerJitter = () => {
        setJitter(true);
        setTimeout(() => setJitter(false), 500); // Reset jitter effect after 0.5 seconds
    };

    // shortcut for incrementing and decrementing ecoscore by 20
    useEffect(() => {
            const handleKeyPress = (event: KeyboardEvent) => {    
                 // Check if the event target is an input field or textarea
            if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
                return; // Stop execution if typing inside an input field
            }
                if (event.key === '>') {
                    dispatch(setEcoScore(ecoScore + 20));
                } else if (event.key === '<') {
                    dispatch(setEcoScore(ecoScore - 20));
                }
            };
    
            window.addEventListener('keydown', handleKeyPress);
            return () => window.removeEventListener('keydown', handleKeyPress);
        }, [dispatch, ecoScore]);

    // const renderPlaceholderBox = (text: string) => (
    //     <Paper
    //         elevation={4}
    //         sx={{
    //             p: 2,
    //             width: '500px',
    //             minHeight: '200px',
    //             borderRadius: '12px',
    //             boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    //             display: 'flex',
    //             alignItems: 'center',
    //             justifyContent: 'center',
    //             backgroundColor: 'rgba(240, 240, 240, 0.9)', // Light gray tint
    //         }}
    //     >
    //         <Typography>{text}</Typography>
    //     </Paper>
    // );

    return (
        <Box className={`layout-container ${jitter ? 'jitter-effect' : ''}`}>
            <Box className="widget-column">
                {<EcoScoreWidget ecoScore={ecoScore} triggerJitter={triggerJitter} />}
                {<QuestionWidget triggerJitter={triggerJitter} />}
                {<StoryWidget triggerJitter={triggerJitter} />}
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
                {<LeaderboardWidget triggerJitter={triggerJitter} />}
                {<ResourceWidget />}
            </Box>
        </Box>
    );
};

export default WidgetLayout;
