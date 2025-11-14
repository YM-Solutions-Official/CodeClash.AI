import { Award, Lock, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function Achievements() {
    const achievements = [
        {
            id: 1,
            title: "First Victory",
            description: "Win your first battle",
            icon: "🏆",
            unlocked: true,
            progress: 100,
        },
        {
            id: 2,
            title: "Speed Demon",
            description: "Complete a challenge in under 5 minutes",
            icon: "⚡",
            unlocked: true,
            progress: 100,
        },
        {
            id: 3,
            title: "Polyglot",
            description: "Win battles in 5 different languages",
            icon: "🌍",
            unlocked: true,
            progress: 100,
        },
        {
            id: 4,
            title: "Win Streak",
            description: "Win 10 battles in a row",
            icon: "🔥",
            unlocked: false,
            progress: 80,
            current: 8,
            total: 10,
        },
        {
            id: 5,
            title: "Century Club",
            description: "Complete 100 battles",
            icon: "💯",
            unlocked: false,
            progress: 75,
            current: 75,
            total: 100,
        },
        {
            id: 6,
            title: "Master Coder",
            description: "Reach the top 100 on the leaderboard",
            icon: "👑",
            unlocked: false,
            progress: 15,
            current: 847,
            total: 100,
        },
    ];

    return (
        <div className="space-y-6">
            <div className="glass rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Award className="h-6 w-6 text-primary" />
                    Unlocked Achievements
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {achievements
                        .filter((a) => a.unlocked)
                        .map((achievement) => (
                            <div
                                key={achievement.id}
                                className="p-6 rounded-xl border-2 border-primary bg-primary/5 hover:scale-105 transition-transform"
                            >
                                <div className="text-4xl mb-3">{achievement.icon}</div>
                                <h3 className="font-semibold mb-1 flex items-center gap-2">
                                    {achievement.title}
                                    <Sparkles className="h-4 w-4 text-primary" />
                                </h3>
                                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            </div>
                        ))}
                </div>
            </div>

            <div className="glass rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Lock className="h-6 w-6 text-muted-foreground" />
                    In Progress
                </h2>
                <div className="space-y-4">
                    {achievements
                        .filter((a) => !a.unlocked)
                        .map((achievement) => (
                            <div
                                key={achievement.id}
                                className="p-6 rounded-xl border border-border bg-card hover:bg-accent transition-colors"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="text-4xl opacity-50">{achievement.icon}</div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-semibold">{achievement.title}</h3>
                                            <span className="text-sm text-muted-foreground">
                                                {achievement.current}/{achievement.total}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            {achievement.description}
                                        </p>
                                        <Progress value={achievement.progress} className="h-2" />
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};
