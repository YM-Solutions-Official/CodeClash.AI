export interface IUser {
  _id: string;
  email?: string;
  password?: string;
  username: string;
  isGuest: boolean;
  guestId?: string;
  stats: IUserStats;
  createdAt:Date;
}

export interface IUserStats {
  wins: number;
  losses: number;
  draws: number;
}
