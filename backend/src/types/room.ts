import { ROOM_STATUS } from "../lib/constants/enum";

export interface IRoom {
  roomId?: string;
  creatorId: string;
  joinedUser?: string;
  status?: ROOM_STATUS;
  problem?: IProblem;
  duration: number;
  startTime?: number;
  submissions: ISubmissions;
  winner?: string;
  endTime?: number;
}

export interface IProblem {
  title: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  examples: IProblemExample[];
}

export interface IProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface ISubmissions {
  creator: ISubmission;
  joiner: ISubmission;
}

export interface ISubmission {
  submitted: boolean;
  submissionTime?: number;
  code?: string;
}
