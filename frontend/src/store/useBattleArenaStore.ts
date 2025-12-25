import { create } from "zustand";
import { GetRoomInfoRes, TestResult } from "@/utils/types/room";

type OpponentStatus = "typing" | "idle" | "submitted";
type ActiveTab = "problem" | "output";

interface BattleArenaState {
  // Room data
  roomInfo: GetRoomInfoRes | null;
  setRoomInfo: (info: GetRoomInfoRes | null) => void;

  // Code editor
  code: string;
  setCode: (code: string) => void;
  language: string;
  setLanguage: (language: string) => void;

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
  testResults: TestResult[];
  setTestResults: (results: TestResult[]) => void;

  // UI
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;

  mySubmitted: boolean;
  setMySubmitted: (v: boolean) => void;
  opponentSubmitted: boolean;
  setOpponentSubmitted: (v: boolean) => void;

  // Actions
  resetStore: () => void;
}

const defaultCode = `function twoSum(nums, target) {
  // Write your solution here
  
}`;

const initialState = {
  roomInfo: null,
  code: defaultCode,
  language: "javascript",
  timeRemaining: null,
  opponentStatus: "idle" as OpponentStatus,
  testResults: [],
  output: "",
  isRunning: false,
  activeTab: "problem" as ActiveTab,
  mySubmitted: false,
  opponentSubmitted: false,
};

export const useBattleArenaStore = create<BattleArenaState>((set) => ({
  ...initialState,

  setRoomInfo: (info) => set({ roomInfo: info }),

  setCode: (code) => set({ code }),

  setLanguage: (language) => set({ language }),

  setTimeRemaining: (time) => set({ timeRemaining: time }),

  setOpponentStatus: (status) => set({ opponentStatus: status }),

  setOutput: (output) => set({ output }),

  setIsRunning: (running) => set({ isRunning: running }),

  setTestResults: (results) => set({ testResults: results }),

  setActiveTab: (tab) => set({ activeTab: tab }),

  setMySubmitted: (submitted) => set({ mySubmitted: submitted }),

  setOpponentSubmitted: (submitted) => set({ opponentSubmitted: submitted }),

  resetStore: () => set(initialState),
}));
