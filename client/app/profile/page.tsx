"use client"
import { useState } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Edit3,
    Share2,
    Trophy,
    Zap,
    Target,
    TrendingUp,
    Calendar,
    Award,
    Settings,
} from "lucide-react";
import ProfileOverview from "@/components/profile/ProfileOverview";
import BattleHistory from "@/components/profile/BattleHistory";
import Achievements from "@/components/profile/Achievements";
import ProfileSettings from "@/components/profile/ProfileSettings";

export default function Profile() {
    const [isEditMode, setIsEditMode] = useState(false);

    return (
        <div className="min-h-screen bg-background">
            {/* Profile Header Banner */}
            <div className="relative h-64 bg-linear-to-br from-primary/20 via-primary/10 to-background overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute top-0 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            </div>

            <div className="container mx-auto px-4 -mt-32 relative z-10 pb-20">
                {/* Profile Card */}
                <div className="glass rounded-3xl p-8 mb-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        {/* Avatar */}
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full bg-linear-to-br from-primary to-primary-hover flex items-center justify-center text-primary-foreground text-4xl font-bold ring-4 ring-background">
                                JD
                            </div>
                            <button className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                <Edit3 className="h-5 w-5" />
                            </button>
                        </div>

                        {/* User Info */}
                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h1 className="text-3xl font-bold mb-1">John Doe</h1>
                                    <p className="text-muted-foreground">@johndoe • Member since Jan 2025</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsEditMode(!isEditMode)}
                                        className="gap-2"
                                    >
                                        <Edit3 className="h-4 w-4" />
                                        Edit Profile
                                    </Button>
                                    <Button variant="outline" className="gap-2">
                                        <Share2 className="h-4 w-4" />
                                        Share
                                    </Button>
                                </div>
                            </div>
                            <p className="text-foreground/80 mb-4 max-w-2xl">
                                Passionate full-stack developer specializing in React and Node.js. Love
                                competitive programming and solving complex algorithms.
                            </p>

                            {/* Quick Stats */}
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 glass rounded-full px-4 py-2">
                                    <Trophy className="h-5 w-5 text-primary" />
                                    <span className="font-semibold">Rank #847</span>
                                </div>
                                <div className="flex items-center gap-2 glass rounded-full px-4 py-2">
                                    <Zap className="h-5 w-5 text-tech-node" />
                                    <span className="font-semibold">2,450 XP</span>
                                </div>
                                <div className="flex items-center gap-2 glass rounded-full px-4 py-2">
                                    <Target className="h-5 w-5 text-tech-css" />
                                    <span className="font-semibold">156 Battles</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="glass rounded-2xl p-6 hover:scale-105 transition-transform">
                        <div className="flex items-center justify-between mb-4">
                            <Trophy className="h-8 w-8 text-primary" />
                            <TrendingUp className="h-5 w-5 text-tech-node" />
                        </div>
                        <div className="text-3xl font-bold mb-1">156</div>
                        <div className="text-sm text-muted-foreground">Total Battles</div>
                    </div>

                    <div className="glass rounded-2xl p-6 hover:scale-105 transition-transform">
                        <div className="flex items-center justify-between mb-4">
                            <Target className="h-8 w-8 text-tech-node" />
                            <div className="text-sm font-medium text-tech-node">+2.4%</div>
                        </div>
                        <div className="text-3xl font-bold mb-1">67%</div>
                        <div className="text-sm text-muted-foreground">Win Rate</div>
                        <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-tech-node w-2/3" />
                        </div>
                    </div>

                    <div className="glass rounded-2xl p-6 hover:scale-105 transition-transform">
                        <div className="flex items-center justify-between mb-4">
                            <Award className="h-8 w-8 text-tech-swift" />
                            <div className="text-sm font-medium text-tech-swift">Top 15%</div>
                        </div>
                        <div className="text-3xl font-bold mb-1">#847</div>
                        <div className="text-sm text-muted-foreground">Current Rank</div>
                    </div>

                    <div className="glass rounded-2xl p-6 hover:scale-105 transition-transform">
                        <div className="flex items-center justify-between mb-4">
                            <Zap className="h-8 w-8 text-primary" />
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="text-3xl font-bold mb-1">12</div>
                        <div className="text-sm text-muted-foreground">Win Streak</div>
                    </div>
                </div>

                {/* Tabs Section */}
                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="glass p-1">
                        <TabsTrigger value="overview" className="gap-2">
                            <Trophy className="h-4 w-4" />
                            Overview
                        </TabsTrigger>
                        <TabsTrigger value="history" className="gap-2">
                            <Calendar className="h-4 w-4" />
                            Battle History
                        </TabsTrigger>
                        <TabsTrigger value="achievements" className="gap-2">
                            <Award className="h-4 w-4" />
                            Achievements
                        </TabsTrigger>
                        <TabsTrigger value="settings" className="gap-2">
                            <Settings className="h-4 w-4" />
                            Settings
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview">
                        <ProfileOverview />
                    </TabsContent>

                    <TabsContent value="history">
                        <BattleHistory />
                    </TabsContent>

                    <TabsContent value="achievements">
                        <Achievements />
                    </TabsContent>

                    <TabsContent value="settings">
                        <ProfileSettings />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};
