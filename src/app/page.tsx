'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
} from '@mui/material';
import { useRoom } from '@/hooks/useRoom';

export default function Home() {
  const router = useRouter();
  const [playerName, setPlayerName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const { createRoom, joinRoom } = useRoom();

  const handleCreateRoom = async () => {
    if (!playerName.trim()) {
      setSnackbar({ open: true, message: 'Please enter your name' });
      return;
    }

    try {
      const newRoomId = await createRoom(playerName);
      router.push(`/room/${newRoomId}`);
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to create room' });
    }
  };

  const handleJoinRoom = async () => {
    if (!playerName.trim()) {
      setSnackbar({ open: true, message: 'Please enter your name' });
      return;
    }
    if (!roomId.trim()) {
      setSnackbar({ open: true, message: 'Please enter a room ID' });
      return;
    }

    try {
      await joinRoom(roomId, playerName);
      router.push(`/room/${roomId}`);
    } catch (error) {
      setSnackbar({ 
        open: true, 
        message: error instanceof Error ? error.message : 'Failed to join room' 
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Game Room
          </Typography>

          <TextField
            fullWidth
            label="Your Name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            margin="normal"
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleCreateRoom}
            sx={{ mt: 2 }}
          >
            Create Room
          </Button>

          <Box sx={{ mt: 4, mb: 2 }}>
            <Typography variant="h6" align="center" gutterBottom>
              OR
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value.toUpperCase())}
            margin="normal"
          />

          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={handleJoinRoom}
            sx={{ mt: 2 }}
          >
            Join Room
          </Button>
        </Paper>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Container>
  );
} 