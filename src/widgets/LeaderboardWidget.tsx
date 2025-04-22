import '../WidgetLayout.css';
import { Box, Paper, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface ScoreEntry {
  name: string;
  ecoScore: number;
}

const LeaderboardWidget: React.FC = () => {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const userName = useSelector((state: RootState) => state.layout.userName);
  const ecoScore = useSelector((state: RootState) => state.layout.ecoScore);

  const fetchLeaderboard = async () => {
    const res = await fetch("https://dodos-hth-backend.onrender.com/api/leaderboard");
    const data = await res.json();
    setScores(data);
  };

  const submitScore = async () => {
    if (!userName.trim() || ecoScore == null) return;
    await fetch("https://dodos-hth-backend.onrender.com/api/submit-score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userName.trim(), ecoScore }),
    });
    setSubmitted(true);
    fetchLeaderboard(); // Update leaderboard after submitting
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <Paper elevation={4} sx={{ p: 2, width: '500px', height: '420px', background: 'linear-gradient(135deg, #a0c4ff, #cce1ff)', borderRadius: '12px' }}>
      <Typography variant="h6" color="#1565c0" fontWeight="bold" textAlign="center">Global Leaderboard</Typography>
      <Typography variant="body2" color="#1e3a8a" textAlign="center" mb={2}>
        Top eco-scores submitted by players
      </Typography>

      <Button
        variant="contained"
        fullWidth
        sx={{ mb: 2, backgroundColor: submitted ? 'gray' : '#1976d2' }}
        disabled={submitted}
        onClick={submitScore}
      >
        {submitted ? "Score Submitted!" : "Submit score to Leaderboard!"}
      </Button>

      <Box sx={{ backgroundColor: '#ffffffcc', borderRadius: 2, p: 2, fontFamily: 'monospace', overflowY: 'auto', maxHeight: '290px' }}>
        {scores.map((entry, index) => (
          <Typography key={index}>
            {index + 1}. {entry.name} - EcoScore: {entry.ecoScore}
          </Typography>
        ))}
      </Box>
    </Paper>
  );
};

export default LeaderboardWidget;