import { Types } from "mongoose";
import { ROOM_STATUS } from "../lib/constants/enum";

export interface IRoom {
  _id?: string;
  roomCode?: string;
  creatorId: string;
  creatorUser: Types.ObjectId;
  joinerId: string;
  joinerUser: Types.ObjectId;
  status: ROOM_STATUS;
  problem?: IProblem;
  submissions?: ISubmissions;
  duration: number;
  startTime?: number;
  endTime?: number;
  winner?: string;
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
