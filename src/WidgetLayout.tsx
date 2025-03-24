import React, { useState, useEffect, useCallback } from 'react';
import Game from './Game';
import './WidgetLayout.css';
import questions from './questions';
import { Box, Paper, Typography, List, ListItem } from '@mui/material';

interface Question {
    question: string;
    options: string[];
    answer: string;
}

const WidgetLayout: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [questionActive, setQuestionActive] = useState(false);
    const setShowFeedback = useState(false)[1];
    const [countdown, setCountdown] = useState<number>(10);
    const [phase, setPhase] = useState<'idle' | 'question' | 'feedback' | 'wait'>('idle');

    const startQuestion = useCallback(() => {
        const question = questions[currentIndex];
        setCurrentQuestion(question);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setShowFeedback(false);
        setQuestionActive(true);
        setPhase('question');
        setCountdown(20);
    }, [currentIndex]);

    const handleAnswerClick = useCallback((option: string) => {
        if (!questionActive || selectedAnswer !== null) return;

        setSelectedAnswer(option);
        setIsCorrect(option === currentQuestion?.answer);
        setShowFeedback(true);
        setQuestionActive(false);
        setPhase('feedback');
        setCountdown(2);
    }, [questionActive, selectedAnswer, currentQuestion]);

    const handleTimeout = useCallback(() => {
        setSelectedAnswer(null);
        setIsCorrect(false);
        setShowFeedback(true);
        setQuestionActive(false);
        setPhase('feedback');
        setCountdown(2);
    }, []);

    const moveToNextQuestion = useCallback(() => {
        const nextIndex = (currentIndex + 1) % questions.length;
        setCurrentIndex(nextIndex);
        setPhase('question');
        setCountdown(20);
        setCurrentQuestion(questions[nextIndex]);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setShowFeedback(false);
        setQuestionActive(true);
    }, [currentIndex]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev > 1) return prev - 1;

                clearInterval(timer);

                if (phase === 'idle') {
                    startQuestion();
                } else if (phase === 'question') {
                    handleTimeout();
                } else if (phase === 'feedback') {
                    setPhase('wait');
                    setCountdown(20);
                } else if (phase === 'wait') {
                    moveToNextQuestion();
                }

                return 0;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [phase, startQuestion, handleTimeout, moveToNextQuestion]);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (!questionActive || !currentQuestion || selectedAnswer !== null) return;
            const key = event.key;
            if (key >= '1' && key <= '3') {
                const index = parseInt(key) - 1;
                if (currentQuestion.options[index]) {
                    handleAnswerClick(currentQuestion.options[index]);
                }
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [currentQuestion, questionActive, selectedAnswer, handleAnswerClick]);

    const renderQuestionWidget = () => (
        <Paper
            elevation={4}
            sx={{
                p: 2,
                width: '500px',
                minHeight: '200px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                backgroundColor: 'rgba(240, 240, 240, 0.9)',
            }}
        >
            {phase === 'idle' || phase === 'wait' ? (
                <Typography>Next question in {countdown} seconds...</Typography>
            ) : phase === 'question' ? (
                <>
                    <Typography>Marking question wrong in {countdown} seconds...</Typography>
                    {currentQuestion && (
                        <>
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
                        </>
                    )}
                </>
            ) : (
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
                        color={isCorrect ? 'green' : 'red'}
                    >
                        {isCorrect ? 'Correct!' : 'Wrong!'}
                    </Typography>
                </Box>
            )}
        </Paper>
    );

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
                backgroundColor: 'rgba(240, 240, 240, 0.9)',
            }}
        >
            <Typography>{text}</Typography>
        </Paper>
    );

    const renderLeaderboard = () => (
        <Paper
            elevation={4}
            sx={{
                p: 2,
                width: '500px',
                height: '420px',
                background: 'linear-gradient(135deg, #a0c4ff, #cce1ff)',
                borderRadius: '12px',
            }}
        >
            <Typography
                variant="h6"
                color="#1565c0"
                fontWeight="bold"
                textAlign="center"
            >
                Leaderboard Coming Soon
            </Typography>
            <Typography
                variant="body2"
                color="#1e3a8a"
                textAlign="center"
                mb={2}
            >
                Your name, EcoScore, and real score will appear here!
            </Typography>
            <Box
                sx={{
                    backgroundColor: '#ffffffcc',
                    borderRadius: 2,
                    p: 2,
                    fontFamily: 'monospace',
                }}
            >
                <Typography>1. PlayerName - EcoScore: ??? - Score: ???</Typography>
                <Typography>2. PlayerName - EcoScore: ??? - Score: ???</Typography>
                <Typography>3. PlayerName - EcoScore: ??? - Score: ???</Typography>
            </Box>
        </Paper>
    );

    return (
        <Box className="layout-container">
            <Box className="widget-column">
                {renderPlaceholderBox("Left Widget 1")}
                {renderQuestionWidget()}
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
                {renderLeaderboard()}
                {renderPlaceholderBox("Right Widget 3")}
            </Box>
        </Box>
    );
};

export default WidgetLayout;
