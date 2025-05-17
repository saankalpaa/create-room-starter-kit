'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
  Snackbar,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useRoom } from '@/hooks/useRoom';
import { Player } from '@/types';

export default function Room({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { room, loading, error, startGame } = useRoom(params.id);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  useEffect(() => {
    if (error) {
      setSnackbar({ open: true, message: error });
      if (error === 'Room not found') {
        router.push('/');
      }
    }
  }, [error, router]);

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(params.id);
    setSnackbar({ open: true, message: 'Room ID copied to clipboard!' });
  };

  const handleStartGame = async () => {
    try {
      await startGame(params.id);
    } catch (error) {
      setSnackbar({ 
        open: true, 
        message: error instanceof Error ? error.message : 'Failed to start game' 
      });
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h6" align="center">
              Loading room...
            </Typography>
          </Paper>
        </Box>
      </Container>
    );
  }

  if (!room) {
    return null;
  }

  const isHost = room.players.find((p: Player) => p.id === localStorage.getItem('playerId'))?.isHost;

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" component="h1">
              Room: {room.id}
            </Typography>
            <IconButton onClick={handleCopyRoomId} sx={{ ml: 1 }}>
              <ContentCopyIcon />
            </IconButton>
          </Box>

          <Typography variant="h6" gutterBottom>
            Players ({room.players.length}/10)
          </Typography>

          <List>
            {room.players.map((player: Player) => (
              <ListItem key={player.id}>
                <ListItemText
                  primary={player.name}
                  secondary={player.isHost ? 'Host' : 'Player'}
                />
              </ListItem>
            ))}
          </List>

          {isHost && room.status === 'waiting' && (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleStartGame}
              sx={{ mt: 2 }}
            >
              Start Game
            </Button>
          )}
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