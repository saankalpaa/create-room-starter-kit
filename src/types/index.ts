export interface Player {
  id: string;
  name: string;
  isHost: boolean;
}

export interface Room {
  id: string;
  players: Player[];
  createdAt: Date;
  status: 'waiting' | 'playing' | 'ended';
} 