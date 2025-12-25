import { create } from "zustand";
import { GetRoomInfoRes } from "@/utils/types/room";

type OpponentStatus = "typing" | "idle" | "submitted";
type ActiveTab = "problem" | "output";

interface BattleArenaState {
  // Room data
  roomInfo: GetRoomInfoRes | null;
  setRoomInfo: (info: GetRoomInfoRes | null) => void;

  // Code editor
  code: string;
  setCode: (code: string) => void;

  // Timer
  timeRemaining: number | null;
  setTimeRemaining: (time: number) => void;

  // Opponent
  opponentStatus: OpponentStatus;
  setOpponentStatus: (status: OpponentStatus) => void;

  // Output
  output: string;
  setOutput: (output: string) => void;
  isRunning: boolean;
  setIsRunning: (running: boolean) => void;

  // UI
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;

  // Actions
  resetStore: () => void;
}

const defaultCode = `function twoSum(nums, target) {
  // Write your solution here
  
}`;

const initialState = {
  roomInfo: null,
  code: defaultCode,
  timeRemaining: null,
  opponentStatus: "typing" as OpponentStatus,
  output: "",
  isRunning: false,
  activeTab: "problem" as ActiveTab,
};

export const useBattleArenaStore = create<BattleArenaState>((set) => ({
  ...initialState,

  setRoomInfo: (info) => set({ roomInfo: info }),

  setCode: (code) => set({ code }),

  setTimeRemaining: (time) => set({ timeRemaining: time }),

  setOpponentStatus: (status) => set({ opponentStatus: status }),

  setOutput: (output) => set({ output }),

  setIsRunning: (running) => set({ isRunning: running }),

  setActiveTab: (tab) => set({ activeTab: tab }),

  resetStore: () => set(initialState),
}));
