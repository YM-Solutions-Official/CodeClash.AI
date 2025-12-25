import { ROOM_STATUS } from "../constants";

export interface CreateRoomRes {
  roomId?: string;
  creatorId?: string;
  error?: string;
}

export interface GetRoomInfoRes {
  users?: string[];
  roomCode?: string;
  status?: ROOM_STATUS;
  creatorId?: string;
  role: "creator" | "joiner";
  problem?: any;
  startTime?: number;
  duration?: number;
  timeRemaining?: number;
  hasSubmitted?: boolean;
  winner?: string;
  submissions?: any;
  endTime?: number;
  error: string;
}

export interface JoinRoomRes {
  roomId: string;
  users: string[];
  status: ROOM_STATUS;
  creatorId: string;
  problem: any;
  startTime: number;
  duration: number;
  timeRemaining: number;
  hasSubmitted: boolean;
  winner: string;
  submissions: any;
  endTime: number;
  error: string;
}

export interface StartMatchRes {
  error?: string;
  success?: boolean;
}

export interface MatchStartedRes {
  problem: any;
  startTime: number;
  duration: number;
  endTime: number;
}

export interface TestResult {
  testCase: number;
  input: string;
  expectedOutput: string;
  actualOutput: string | null;
  passed: boolean;
  executionTime: number;
  error: string | null;
}

export interface RunCodeRes {
  success?: boolean;
  results?: TestResult[];
  error?: string;
}

export interface SubmitCodeRes {
  success?: boolean;
  submissionTime?: number;
  error?: string;
}
