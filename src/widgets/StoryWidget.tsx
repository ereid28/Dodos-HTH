import React, { useState, useEffect, useCallback } from 'react';
import '../WidgetLayout.css';
import { Box, Paper, Typography, List, ListItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
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
    const dispatch = useDispatch();

    const handleNextScript = () => {
        // mover forward through story
        if (index < 11) {
            setCurrentScript(story[index + 1].script);
            setIndex(index + 1);
        }
    };

    const handlePrevScript = () => { 
        // move backwards through story
        if (index > 0) {
            setCurrentScript(story[index - 1].script);
            setIndex(index - 1);
        }
    };

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
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                        sx={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}
                    >
                        {currentScript}
                    </Typography>
                </Box>
            )}
        </Paper>
    );
};

export default StoryWidget;