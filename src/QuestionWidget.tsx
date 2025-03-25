import React, { useState, useEffect } from 'react';
import './WidgetLayout.css';
import questions from './questions';
import { Box, Paper, Typography, List, ListItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { incrementEcoScore } from './redux/ecoScoreSlice';

interface Question {
    question: string;
    options: string[];
    answer: string;
}

const QuestionWidget = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [questionActive, setQuestionActive] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [countdown, setCountdown] = useState<number>(10);
    const [phase, setPhase] = useState<'idle' | 'question' | 'feedback' | 'wait'>('idle');
    const dispatch = useDispatch();

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
    }, [phase]);

    const startQuestion = () => {
        const question = questions[currentIndex];
        setCurrentQuestion(question);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setShowFeedback(false);
        setQuestionActive(true);
        setPhase('question');
        setCountdown(20);
    };

    const handleUpScore = () => {
        dispatch(incrementEcoScore());
    }

    const handleAnswerClick = (option: string) => {
        if (!questionActive || selectedAnswer !== null) return;

        setSelectedAnswer(option);
        setIsCorrect(option === currentQuestion?.answer);
        if (option === currentQuestion?.answer) {
            handleUpScore();
        }
        setShowFeedback(true);
        setQuestionActive(false);
        setPhase('feedback');
        setCountdown(2);
    };

    const handleTimeout = () => {
        setSelectedAnswer(null);
        setIsCorrect(false);
        setShowFeedback(true);
        setQuestionActive(false);
        setPhase('feedback');
        setCountdown(2);
    };

    const moveToNextQuestion = () => {
        const nextIndex = (currentIndex + 1) % questions.length;
        setCurrentIndex(nextIndex);
        setPhase('question');
        setCountdown(20);
        setCurrentQuestion(questions[nextIndex]);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setShowFeedback(false);
        setQuestionActive(true);
    };

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
    }, [currentQuestion, questionActive, selectedAnswer]);
    
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
};

export default QuestionWidget;