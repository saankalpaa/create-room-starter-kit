import { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  onSnapshot,
  serverTimestamp,
  query,
  where
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Room, Player } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export const useRoom = (roomId?: string) => {
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!roomId) {
      setLoading(false);
      return;
    }

    const roomRef = doc(db, 'rooms', roomId);
    const unsubscribe = onSnapshot(roomRef, 
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setRoom({
            id: doc.id,
            players: data.players,
            createdAt: data.createdAt.toDate(),
            status: data.status
          });
        } else {
          setError('Room not found');
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching room:', error);
        setError('Error fetching room');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [roomId]);

  const createRoom = async (playerName: string): Promise<string> => {
    const newRoomId = uuidv4().slice(0, 6).toUpperCase();
    const player: Player = {
      id: uuidv4(),
      name: playerName,
      isHost: true
    };

    const roomData: Omit<Room, 'id'> = {
      players: [player],
      createdAt: new Date(),
      status: 'waiting'
    };

    try {
      await setDoc(doc(db, 'rooms', newRoomId), {
        ...roomData,
        createdAt: serverTimestamp()
      });
      return newRoomId;
    } catch (error) {
      console.error('Error creating room:', error);
      throw new Error('Failed to create room');
    }
  };

  const joinRoom = async (roomId: string, playerName: string): Promise<void> => {
    const roomRef = doc(db, 'rooms', roomId);
    const roomDoc = await getDoc(roomRef);

    if (!roomDoc.exists()) {
      throw new Error('Room not found');
    }

    const roomData = roomDoc.data();
    if (roomData.players.length >= 10) {
      throw new Error('Room is full');
    }

    const player: Player = {
      id: uuidv4(),
      name: playerName,
      isHost: false
    };

    try {
      await updateDoc(roomRef, {
        players: [...roomData.players, player]
      });
    } catch (error) {
      console.error('Error joining room:', error);
      throw new Error('Failed to join room');
    }
  };

  const startGame = async (roomId: string): Promise<void> => {
    const roomRef = doc(db, 'rooms', roomId);
    try {
      await updateDoc(roomRef, {
        status: 'playing'
      });
    } catch (error) {
      console.error('Error starting game:', error);
      throw new Error('Failed to start game');
    }
  };

  return {
    room,
    loading,
    error,
    createRoom,
    joinRoom,
    startGame
  };
}; 