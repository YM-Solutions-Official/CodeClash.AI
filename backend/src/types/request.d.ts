declare namespace Express {
  interface Request {
    userId: string;
    isGuest: boolean;
  }
}
