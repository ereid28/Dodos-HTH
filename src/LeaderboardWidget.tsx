// LeaderboardWidget.tsx
import React from 'react';
import './WidgetLayout.css';
import { Box, Typography } from '@mui/material';

const LeaderboardWidget: React.FC = () => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #a0c4ff, #cce1ff)',
                borderRadius: '12px',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                boxSizing: 'border-box',
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 'bold',
                    marginBottom: '0.5rem',
                    color: '#1565c0',
                    textAlign: 'center',
                }}
            >
                Leaderboard Coming Soon
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    marginBottom: '1rem',
                    color: '#1e3a8a',
                    textAlign: 'center',
                }}
            >
                Your name, EcoScore, and real score will appear here!
            </Typography>
            <Box
                sx={{
                    backgroundColor: '#ffffffcc',
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    fontFamily: 'monospace',
                    fontSize: '0.95rem',
                    textAlign: 'left',
                    color: '#444',
                    lineHeight: 1.6,
                    boxSizing: 'border-box',
                }}
            >
                <Typography>1. PlayerName - EcoScore: ??? - Score: ???</Typography>
                <Typography>2. PlayerName - EcoScore: ??? - Score: ???</Typography>
                <Typography>3. PlayerName - EcoScore: ??? - Score: ???</Typography>
            </Box>
        </Box>
    );
};

export default LeaderboardWidget;
