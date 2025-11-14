import { Target, Flame, Code2 } from "lucide-react";

export default function ProfileOverview() {
    const recentBattles = [
        { opponent: "AlexCoder", language: "Python", result: "won", date: "2 hours ago" },
        { opponent: "DevMaster", language: "JavaScript", result: "won", date: "5 hours ago" },
        { opponent: "CodeNinja", language: "Java", result: "lost", date: "1 day ago" },
        { opponent: "ByteWarrior", language: "Python", result: "won", date: "1 day ago" },
        { opponent: "ScriptKing", language: "TypeScript", result: "won", date: "2 days ago" },
    ];

    const favoriteLanguages = [
        { name: "Python", count: 45, percentage: 45 },
        { name: "JavaScript", count: 32, percentage: 32 },
        { name: "Java", count: 23, percentage: 23 },
    ];

    return (
        <div className="space-y-6">
            {/* Recent Battles */}
            <div className="glass rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Flame className="h-6 w-6 text-primary" />
                    Recent Battles
                </h2>
                <div className="space-y-3">
                    {recentBattles.map((battle, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-accent transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className={`w-2 h-2 rounded-full ${battle.result === "won" ? "bg-tech-node" : "bg-destructive"
                                        }`}
                                />
                                <div>
                                    <div className="font-semibold">vs {battle.opponent}</div>
                                    <div className="text-sm text-muted-foreground">{battle.language}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div
                                    className={`text-sm font-medium ${battle.result === "won" ? "text-tech-node" : "text-destructive"
                                        }`}
                                >
                                    {battle.result === "won" ? "Victory" : "Defeat"}
                                </div>
                                <div className="text-xs text-muted-foreground">{battle.date}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats Visualization */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Favorite Languages */}
                <div className="glass rounded-2xl p-6">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Code2 className="h-6 w-6 text-primary" />
                        Favorite Languages
                    </h2>
                    <div className="space-y-4">
                        {favoriteLanguages.map((lang, index) => (
                            <div key={index}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium">{lang.name}</span>
                                    <span className="text-sm text-muted-foreground">
                                        {lang.count} battles
                                    </span>
                                </div>
                                <div className="h-3 bg-muted rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary rounded-full transition-all"
                                        style={{ width: `${lang.percentage}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="glass rounded-2xl p-6">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Target className="h-6 w-6 text-primary" />
                        Quick Stats
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-accent rounded-xl">
                            <div className="text-2xl font-bold text-tech-node mb-1">104</div>
                            <div className="text-sm text-muted-foreground">Wins</div>
                        </div>
                        <div className="p-4 bg-accent rounded-xl">
                            <div className="text-2xl font-bold text-destructive mb-1">52</div>
                            <div className="text-sm text-muted-foreground">Losses</div>
                        </div>
                        <div className="p-4 bg-accent rounded-xl">
                            <div className="text-2xl font-bold text-primary mb-1">8</div>
                            <div className="text-sm text-muted-foreground">Languages</div>
                        </div>
                        <div className="p-4 bg-accent rounded-xl">
                            <div className="text-2xl font-bold text-tech-css mb-1">2,450</div>
                            <div className="text-sm text-muted-foreground">Total XP</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
