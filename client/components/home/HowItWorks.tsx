import { UserPlus, Target, Swords, Trophy } from "lucide-react";

export default function HowItWorks() {
    const steps = [
        {
            icon: UserPlus,
            title: "Create Account",
            description: "Sign up in seconds and set up your developer profile with your preferred languages.",
            color: "text-primary",
            bgColor: "bg-primary/10",
        },
        {
            icon: Target,
            title: "Choose Challenge",
            description: "Browse available challenges or get matched with opponents at your skill level.",
            color: "text-tech-css",
            bgColor: "bg-css/10",
        },
        {
            icon: Swords,
            title: "Battle Opponent",
            description: "Solve coding problems in real-time while competing against another developer.",
            color: "text-tech-swift",
            bgColor: "bg-swift/10",
        },
        {
            icon: Trophy,
            title: "Climb Rankings",
            description: "Win battles to earn points, unlock achievements, and rise through the leaderboards.",
            color: "text-tech-node",
            bgColor: "bg-node/10",
        },
    ];

    return (
        <section id="how-it-works" className="py-20 px-4 bg-muted/30">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        How It <span className="text-primary">Works</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Get started in four simple steps and begin your coding journey
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            {/* Connection Line */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute left-[60px] top-20 w-0.5 h-24 bg-linear-to-b from-primary/50 to-transparent" />
                            )}

                            {/* Step Card */}
                            <div
                                className={`flex flex-col md:flex-row items-center gap-6 mb-12 ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Icon Circle */}
                                <div className="relative shrink-0">
                                    <div className={`w-32 h-32 rounded-full ${step.bgColor} flex items-center justify-center`}>
                                        <step.icon className={`h-12 w-12 ${step.color}`} />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                                        {index + 1}
                                    </div>
                                </div>

                                {/* Content */}
                                <div
                                    className={`flex-1 glass rounded-2xl p-8 hover:shadow-lg transition-all ${index % 2 === 1 ? "md:text-right" : ""
                                        }`}
                                >
                                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                                    <p className="text-muted-foreground text-lg">{step.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
