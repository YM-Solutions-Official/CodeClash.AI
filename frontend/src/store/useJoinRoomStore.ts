import { create } from 'zustand';

interface JoinRoomState {
  // Form state
  roomCode: string;
  setRoomCode: (code: string) => void;

  // Loading state
  isJoining: boolean;
  setIsJoining: (joining: boolean) => void;

  // Actions
  resetStore: () => void;
}

const initialState = {
  roomCode: '',
  isJoining: false,
};

export const useJoinRoomStore = create<JoinRoomState>((set) => ({
  ...initialState,

  setRoomCode: (code) => set({ roomCode: code.toUpperCase() }),
  
  setIsJoining: (joining) => set({ isJoining: joining }),
  
  resetStore: () => set(initialState),
}));