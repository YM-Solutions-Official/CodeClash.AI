import { create } from 'zustand';
import { GetRoomInfoRes } from '@/utils/types/room';

interface WaitingRoomState {
  // Room data
  roomInfo: GetRoomInfoRes | null;
  setRoomInfo: (info: GetRoomInfoRes | null) => void;
  updateRoomInfo: (updater: (prev: GetRoomInfoRes | null) => GetRoomInfoRes | null) => void;

  // User role
  isCreator: boolean;
  setIsCreator: (isCreator: boolean) => void;

  // UI state
  copied: boolean;
  setCopied: (copied: boolean) => void;

  // Countdown
  countdown: number | null;
  setCountdown: (countdown: number | null) => void;

  // Computed values
  activeUsers: () => string[];
  canStart: () => boolean;

  // Actions
  addUser: (userId: string) => void;
  resetStore: () => void;
}

const initialState = {
  roomInfo: null,
  isCreator: false,
  copied: false,
  countdown: null,
};

export const useWaitingRoomStore = create<WaitingRoomState>((set, get) => ({
  ...initialState,

  setRoomInfo: (info) => set({ roomInfo: info }),
  
  updateRoomInfo: (updater) => set((state) => ({ 
    roomInfo: updater(state.roomInfo) 
  })),

  setIsCreator: (isCreator) => set({ isCreator }),

  setCopied: (copied) => set({ copied }),

  setCountdown: (countdown) => set({ countdown }),

  // Computed values
  activeUsers: () => {
    const state = get();
    return state.roomInfo?.users?.filter(Boolean) || [];
  },

  canStart: () => {
    const activeUsers = get().activeUsers();
    return activeUsers.length === 2;
  },

  // Actions
  addUser: (userId) => set((state) => {
    if (!state.roomInfo) return state;
    
    // Don't add if user already exists
    if (state.roomInfo.users?.includes(userId)) {
      return state;
    }

    return {
      roomInfo: {
        ...state.roomInfo,
        users: [...(state.roomInfo.users || []), userId],
      },
    };
  }),

  resetStore: () => set(initialState),
}));