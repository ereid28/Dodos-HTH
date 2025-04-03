import React, { useState, useEffect, useCallback } from 'react';
import './WidgetLayout.css';
import questions from './questions';
import { Box, Paper, Typography, List, ListItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { incrementEcoScore, decrementEcoScore } from './redux/slice';

const QuestionWidget = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null); // 'Correct!' or 'Wrong!'
    const [countdown, setCountdown] = useState<number>(20); // Timer for question display (20 seconds)
    const [nextQuestionCountdown, setNextQuestionCountdown] = useState<number>(10); // Countdown for next question
    const [showNextQuestionScreen, setShowNextQuestionScreen] = useState<boolean>(false); // Show next question countdown screen
    const dispatch = useDispatch();

    // Handle moving to the next question after a feedback message is shown
    const startNextQuestion = () => {
        setTimeout(() => {
            setFeedback(null);
            setSelectedAnswer(null);
            setIsCorrect(null);
            setCountdown(20); // Reset countdown for next question
            setShowNextQuestionScreen(true); // Show the "Next Question in X seconds..." screen
        }, 1000); // Wait 1 second after feedback before moving to the next question
    };

    // Handle correct answer selection (increment EcoScore)
    const handleUpScore = useCallback(() => {
        dispatch(incrementEcoScore());
        dispatch(incrementEcoScore());
        dispatch(incrementEcoScore());
        dispatch(incrementEcoScore());
        dispatch(incrementEcoScore());
    }, [dispatch]);

    // Handle wrong answer selection (decrement EcoScore)
    const handleDownScore = useCallback(() => {
        dispatch(decrementEcoScore());
        dispatch(decrementEcoScore());
        dispatch(decrementEcoScore());
        dispatch(decrementEcoScore());
        dispatch(decrementEcoScore());
    }, [dispatch]);

    // Handle timeout if no answer is selected within the time limit
    const handleTimeout = useCallback(() => {
        setFeedback('Wrong!');
        handleDownScore(); 
        startNextQuestion(); 
    }, [handleDownScore]);

    // Handle answer click, check correctness, and display feedback
    const handleAnswerClick = useCallback((option: string) => {
        if (selectedAnswer !== null) return;

        setSelectedAnswer(option);
        const correct = option === questions[currentIndex].answer;
        setIsCorrect(correct);
        setFeedback(correct ? 'Correct!' : 'Wrong!');
        if (correct) handleUpScore();
        else handleDownScore();
        startNextQuestion();
    }, [selectedAnswer, currentIndex, handleUpScore, handleDownScore]);

    // Move to the next question (after feedback and countdown)
    const moveToNextQuestion = () => {
        setShowNextQuestionScreen(false); // Hide "Next Question in X seconds..." screen
        setNextQuestionCountdown(10); // Reset next question countdown
        setCurrentIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;
            if (nextIndex >= questions.length) {
                return 0; // Loop back to the first question after the last one
            }
            return nextIndex;
        });
    };

    // Get the current question
    const currentQuestion = questions[currentIndex];

    
    // Timer logic for countdown
    useEffect(() => {
        if (showNextQuestionScreen) {
            // Countdown for the "Next Question in X seconds..."
            const timer = setInterval(() => {
                setNextQuestionCountdown(prev => {
                    if (prev > 1) return prev - 1;
                    else {
                        clearInterval(timer);
                        moveToNextQuestion(); // Move to the next question after countdown ends
                        return 0;
                    }
                });
            }, 1000);
            return () => clearInterval(timer);
        } else {
            // Question countdown logic
            const timer = setInterval(() => {
                setCountdown(prev => {
                    if (prev > 1) return prev - 1;
                    else {
                        if (!feedback) {
                            handleTimeout(); // Show 'Wrong!' if time runs out
                        }
                        return 0;
                    }
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [countdown, feedback, showNextQuestionScreen, handleTimeout]);

    // Listen for key presses (1, 2, or 3) to select an answer
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (selectedAnswer !== null) return; // Prevent changing the answer after it's selected

             // Check if the event target is an input field or textarea
        if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
            return; // Stop execution if typing inside an input field
        }

            if (event.key === '1' && currentQuestion.options[0]) {
                handleAnswerClick(currentQuestion.options[0]);
            } else if (event.key === '2' && currentQuestion.options[1]) {
                handleAnswerClick(currentQuestion.options[1]);
            } else if (event.key === '3' && currentQuestion.options[2]) {
                handleAnswerClick(currentQuestion.options[2]);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [selectedAnswer, currentQuestion, handleAnswerClick]);

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
            {showNextQuestionScreen ? ( // Show next question countdown screen
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
                        Next question in {nextQuestionCountdown} seconds...
                    </Typography>
                </Box>
            ) : feedback === null ? ( // Show question if no feedback yet
                <Box>
                    <Typography variant="h6" fontWeight="bold" mt={1}>
                        {currentQuestion.question}
                    </Typography>
                    <List>
                        {currentQuestion.options.map((option, index) => (
                            <ListItem
                                key={index}
                                onClick={() => handleAnswerClick(option)}
                                sx={{
                                    cursor: selectedAnswer === null ? 'pointer' : 'default',
                                    color:
                                        selectedAnswer === option
                                            ? isCorrect
                                                ? 'green'
                                                : 'red'
                                            : 'black',
                                }}
                            >
                                {option}
                            </ListItem>
                        ))}
                    </List>
                    <Typography variant="body2" textAlign="center">
                        Time left: {countdown} seconds
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
                        color={feedback === 'Correct!' ? 'green' : 'red'}
                    >
                        {feedback}
                    </Typography>
                </Box>
            )}
        </Paper>
    );
};

export default QuestionWidget;
