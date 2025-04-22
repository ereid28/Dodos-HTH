import '../WidgetLayout.css';
import { Box, Paper, Typography, Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface ScoreEntry {
  name: string;
  ecoScore: number;
}

const LeaderboardWidget: React.FC = () => {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const userName = useSelector((state: RootState) => state.layout.userName);
  const ecoScore = useSelector((state: RootState) => state.layout.ecoScore);

  const fetchLeaderboard = async () => {
    const res = await fetch("https://dodos-hth-backend.onrender.com/api/leaderboard");
    const data = await res.json();
    setScores(data);

    // Check if current user is already on the leaderboard
    const userOnBoard = data.some((entry: ScoreEntry) => entry.name === userName.trim());
    setHasSubmitted(userOnBoard);
  };

  const submitScore = async () => {
    if (!userName.trim()) return;
    await fetch("https://dodos-hth-backend.onrender.com/api/submit-score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userName.trim(), ecoScore }),
    });
    fetchLeaderboard();
  };

  const deleteScore = async () => {
    await fetch(`https://dodos-hth-backend.onrender.com/api/delete-score`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userName.trim() }),
    });
    fetchLeaderboard();
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <Paper
      elevation={6}
      sx={{
        p: 2,
        width: '100%',
        maxWidth: '500px',
        height: '420px',
        background: 'linear-gradient(135deg, #a0c4ff, #cce1ff)',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <Typography variant="h6" color="#1565c0" fontWeight="bold" textAlign="center" sx={{ mb: 1 }}>
        Global Leaderboard
      </Typography>

      <Typography variant="body2" color="#1e3a8a" textAlign="center" sx={{ mb: 2 }}>
        Top eco-scores submitted by players
      </Typography>

      <Stack spacing={1} direction="row" justifyContent="center" sx={{ mb: 2 }}>
        {!hasSubmitted && (
          <Button
            variant="contained"
            color="primary"
            onClick={submitScore}
          >
            Submit Score
          </Button>
        )}
        {hasSubmitted && (
          <>
            <Button
              variant="contained"
              color="secondary"
              onClick={submitScore}
            >
              Update Score
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={deleteScore}
            >
              Remove Score
            </Button>
          </>
        )}
      </Stack>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          backgroundColor: '#ffffffee',
          borderRadius: 2,
          p: 2,
          fontFamily: 'monospace',
        }}
      >
        {scores.map((entry, index) => (
          <Typography
            key={index}
            sx={{
              fontSize: '0.95rem',
              color: entry.name === userName.trim() ? '#1565c0' : '#222',
              fontWeight: entry.name === userName.trim() ? 'bold' : 'normal',
            }}
          >
            {index + 1}. {entry.name} — EcoScore: {entry.ecoScore}
          </Typography>
        ))}
      </Box>
    </Paper>
  );
};

export default LeaderboardWidget;
