import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export interface User {
    id: string;
    email: string;
    name: string;
    uername: string;
    avatar: string;
    bio: string;
    memberSince: string;

    totalBattles: number;
    wins: number;
    looses: number;
    winRate: number;
    currentRank: number;
    winStreak: number;
    totalPoints: number;
    languageMastered: string[];

    favoriteLanguages: string[];
    theme: 'light' | 'dark';
    emailNotifications: boolean;

    socialLinks?: {
        github: string;
        linkedin: string;
        twitter: string;
        website: string;
    };
}

export interface Problem{
    id:string;
    title:string;
    topic:string[];
}

export interface Battle {
    id: string;
    opponent: {
        id: string;
        username: string;
        avatar?: string;
    };
    language: string;
    result: 'win' | 'loss' | 'draw';
    date: string;
    points: string;
    problems: [];
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlocked: boolean;
    progress?: number;
    unlockedAt?: string;
}
