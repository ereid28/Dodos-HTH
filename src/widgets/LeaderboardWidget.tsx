import '../WidgetLayout.css';
import { Box, Paper, Typography, Button, Stack } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface ScoreEntry {
  name: string;
  ecoScore: number;
}

const medalColors = ['#FFD700', '#C0C0C0', '#CD7F32']; // gold, silver, bronze

const LeaderboardWidget: React.FC = () => {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const userName = useSelector((state: RootState) => state.layout.userName);
  const ecoScore = useSelector((state: RootState) => state.layout.ecoScore);

  const fetchLeaderboard = useCallback(async () => {
    const res = await fetch("https://dodos-hth-backend.onrender.com/api/leaderboard");
    const data = await res.json();
    setScores(data);

    const userOnBoard = data.some((entry: ScoreEntry) => entry.name === userName.trim());
    setHasSubmitted(userOnBoard);
  }, [userName]);

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
  }, [fetchLeaderboard]);

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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1,
        }}
      >
        <Typography variant="h6" color="#1565c0" fontWeight="bold">
          🌍 Global Leaderboard
        </Typography>
        <Button
          size="small"
          variant="outlined"
          onClick={fetchLeaderboard}
          sx={{
            fontSize: '0.75rem',
            textTransform: 'none',
            px: 1.5,
            py: 0.5,
            ml: 2,
          }}
        >
          Refresh
        </Button>
      </Box>

      <Typography variant="body2" color="#1e3a8a" textAlign="center" sx={{ mb: 2 }}>
        Top Eco-Scores submitted by players
      </Typography>

      <Stack spacing={1} direction="row" justifyContent="center" sx={{ mb: 2 }}>
        {!hasSubmitted ? (
          <Button variant="contained" color="primary" onClick={submitScore}>
            Submit Score
          </Button>
        ) : (
          <>
            <Button variant="contained" color="secondary" onClick={submitScore}>
              Update Score
            </Button>
            <Button variant="outlined" color="error" onClick={deleteScore}>
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
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {scores.map((entry, index) => {
          const isCurrentUser = entry.name === userName.trim();
          const medal = index < 3 ? (
            <EmojiEventsIcon
              sx={{
                fontSize: 20,
                color: medalColors[index],
                mr: 1,
              }}
            />
          ) : null;

          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: isCurrentUser ? '#e3f2fd' : 'transparent',
                borderRadius: 1,
                px: 1,
                py: 0.5,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                {medal}
                <Typography
                  sx={{
                    fontSize: '0.95rem',
                    fontWeight: isCurrentUser ? 'bold' : 'normal',
                    color: isCurrentUser ? '#1565c0' : '#333',
                  }}
                >
                  {index + 1}. {entry.name}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: '0.95rem',
                  fontWeight: isCurrentUser ? 'bold' : 'normal',
                  color: isCurrentUser ? '#1565c0' : '#333',
                }}
              >
                {entry.ecoScore}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};

export default LeaderboardWidget;
