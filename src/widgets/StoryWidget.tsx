import React, { useState, useEffect, useCallback } from 'react';
import '../WidgetLayout.css';
import { Box, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import story from '../utils/story';

interface StoryWidgetProps {
    triggerJitter: () => void; // Accept triggerJitter as a prop
}

const StoryWidget: React.FC<StoryWidgetProps> = ( {triggerJitter} ) => {
    // local state
    const [index, setIndex] = useState(0);
    const [currentScript, setCurrentScript] = useState(story[0].script);

    // redux state
    const userName = useSelector((state: RootState) => state.layout.userName);

    const handleNextScript = useCallback(() => {
        // mover forward through story
        if (index < 11) {
            setCurrentScript(story[index + 1].script);
            setIndex(index + 1);
        }
    }, [index]);

    const handlePrevScript = useCallback(() => { 
        // move backwards through story
        if (index > 0) {
            setCurrentScript(story[index - 1].script);
            setIndex(index - 1);
        }
    }, [index]);

    // Navigate story
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            // Check if the event target is an input field or textarea
            if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
                return; // Stop execution if typing inside an input field
            }

            if (event.key === '4') {
                handlePrevScript();
            } else if (event.key === '5') {
                handleNextScript();
            }
        };

            window.addEventListener('keydown', handleKeyPress);
            return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleNextScript, handlePrevScript]);

    return (
        <Paper
            elevation={4}
            sx={{
                p: 2,
                width: '500px',
                minHeight: '200px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                backgroundColor: 'rgba(240, 240, 240, 0.9)', // Light gray tint
            }}
        >
            {!userName.trim() ? (
                <Box
                sx={{
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    sx={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}
                >
                    Enter a username to open story
                </Typography>
            </Box>
            ) : ( // Show feedback message when answer is selected
                <Box
                    sx={{
                        height: '200px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography
                        sx={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}
                    >
                        {currentScript}
                    </Typography>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 2,
                        }}
                    >
                        <Typography sx={{ fontSize: '16px', color: 'gray' }}>
                            ← 4
                        </Typography>
                        <Typography sx={{ fontSize: '16px', color: 'gray' }}>
                            5 →
                        </Typography>
                    </Box>
                </Box>
            )}
        </Paper>
    );
};

export default StoryWidget;