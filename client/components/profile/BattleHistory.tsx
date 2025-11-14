import { Calendar, Filter, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BattleHistory() {
    const battles = [
        {
            id: 1,
            opponent: "AlexCoder",
            language: "Python",
            difficulty: "Medium",
            result: "won",
            score: "95/100",
            duration: "12m 34s",
            date: "Jan 15, 2025",
        },
        {
            id: 2,
            opponent: "DevMaster",
            language: "JavaScript",
            difficulty: "Hard",
            result: "won",
            score: "88/100",
            duration: "18m 02s",
            date: "Jan 15, 2025",
        },
        {
            id: 3,
            opponent: "CodeNinja",
            language: "Java",
            difficulty: "Medium",
            result: "lost",
            score: "72/100",
            duration: "15m 47s",
            date: "Jan 14, 2025",
        },
        {
            id: 4,
            opponent: "ByteWarrior",
            language: "Python",
            difficulty: "Easy",
            result: "won",
            score: "98/100",
            duration: "8m 12s",
            date: "Jan 14, 2025",
        },
    ];

    return (
        <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-primary" />
                    Battle History
                </h2>
                <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                </Button>
            </div>

            <div className="space-y-3">
                {battles.map((battle) => (
                    <div
                        key={battle.id}
                        className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-accent transition-colors group cursor-pointer"
                    >
                        <div className="flex items-center gap-4 flex-1">
                            <div
                                className={`w-3 h-3 rounded-full shrink-0 ${battle.result === "won" ? "bg-tech-node" : "bg-destructive"
                                    }`}
                            />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="font-semibold">vs {battle.opponent}</span>
                                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                                        {battle.language}
                                    </span>
                                    <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                                        {battle.difficulty}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span>Score: {battle.score}</span>
                                    <span>Duration: {battle.duration}</span>
                                    <span>{battle.date}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div
                                className={`text-sm font-medium ${battle.result === "won" ? "text-tech-node" : "text-destructive"
                                    }`}
                            >
                                {battle.result === "won" ? "Victory" : "Defeat"}
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 text-center">
                <Button variant="outline">Load More</Button>
            </div>
        </div>
    );
};
