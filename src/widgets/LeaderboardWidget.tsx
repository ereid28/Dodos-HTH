import '../WidgetLayout.css';
import { Box, Paper, Typography } from '@mui/material';

interface LeaderboardWidgetProps {
    triggerJitter: () => void; // Add the triggerJitter prop here
}

const LeaderboardWidget: React.FC<LeaderboardWidgetProps> = ({ triggerJitter }) => {
    return (
        <Paper elevation={4} sx={{ p: 2, width: '500px', height: '420px', background: 'linear-gradient(135deg, #a0c4ff, #cce1ff)', borderRadius: '12px', opacity: '0.9' }}>
            <Typography variant="h6" color="#1565c0" fontWeight="bold" textAlign="center">Leaderboard Coming Soon</Typography>
            <Typography variant="body2" color="#1e3a8a" textAlign="center" mb={2}>
                Your name, EcoScore, and real score will appear here!
            </Typography>
            <Box sx={{ backgroundColor: '#ffffffcc', borderRadius: 2, p: 2, fontFamily: 'monospace', overflowY: 'auto', maxHeight: '320px' }}>
                <Typography>1. PlayerName - EcoScore: ??? - Score: ???</Typography>
                <Typography>2. PlayerName - EcoScore: ??? - Score: ???</Typography>
                <Typography>3. PlayerName - EcoScore: ??? - Score: ???</Typography>
                <Typography>4. PlayerName - EcoScore: ??? - Score: ???</Typography>
                <Typography>5. PlayerName - EcoScore: ??? - Score: ???</Typography>
                <Typography>6. PlayerName - EcoScore: ??? - Score: ???</Typography>
                <Typography>7. PlayerName - EcoScore: ??? - Score: ???</Typography>
                <Typography>8. PlayerName - EcoScore: ??? - Score: ???</Typography>
                <Typography>9. PlayerName - EcoScore: ??? - Score: ???</Typography>
                <Typography>10. PlayerName - EcoScore: ??? - Score: ???</Typography>
                <Typography>11. PlayerName - EcoScore: ??? - Score: ???</Typography>
                <Typography>12. PlayerName - EcoScore: ??? - Score: ???</Typography>
                <Typography>13. PlayerName - EcoScore: ??? - Score: ???</Typography>
                <Typography>14. PlayerName - EcoScore: ??? - Score: ???</Typography>
                <Typography>15. PlayerName - EcoScore: ??? - Score: ???</Typography>
                <Typography>16. PlayerName - EcoScore: ??? - Score: ???</Typography>
                <Typography>17. PlayerName - EcoScore: ??? - Score: ???</Typography>
                <Typography>18. PlayerName - EcoScore: ??? - Score: ???</Typography>
                <Typography>19. PlayerName - EcoScore: ??? - Score: ???</Typography>
                <Typography>20. PlayerName - EcoScore: ??? - Score: ???</Typography>
                <Typography>21. PlayerName - EcoScore: ??? - Score: ???</Typography>
                <Typography>22. PlayerName - EcoScore: ??? - Score: ???</Typography>
                <Typography>23. PlayerName - EcoScore: ??? - Score: ???</Typography>
                <Typography>24. PlayerName - EcoScore: ??? - Score: ???</Typography>
            </Box>
        </Paper>
        );
}

export default LeaderboardWidget;