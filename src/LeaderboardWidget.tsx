import './WidgetLayout.css';
import { Box, Paper, Typography } from '@mui/material';

interface LeaderboardWidgetProps {
    triggerJitter: () => void; // Add the triggerJitter prop here
}

const LeaderboardWidget: React.FC<LeaderboardWidgetProps> = ({ triggerJitter }) => {
    return (
        <Paper elevation={4} sx={{ p: 2, width: '500px', height: '420px', background: 'linear-gradient(135deg, #a0c4ff, #cce1ff)', borderRadius: '12px' }}>
            <Typography variant="h6" color="#1565c0" fontWeight="bold" textAlign="center">Leaderboard Coming Soon</Typography>
            <Typography variant="body2" color="#1e3a8a" textAlign="center" mb={2}>
                Your name, EcoScore, and real score will appear here!
            </Typography>
            <Box sx={{ backgroundColor: '#ffffffcc', borderRadius: 2, p: 2, fontFamily: 'monospace' }}>
                <Typography>1. PlayerName - EcoScore: ??? - Score: ???</Typography>
                <Typography>2. PlayerName - EcoScore: ??? - Score: ???</Typography>
                <Typography>3. PlayerName - EcoScore: ??? - Score: ???</Typography>
            </Box>
        </Paper>
        );
}

export default LeaderboardWidget;