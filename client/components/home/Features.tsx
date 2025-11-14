import { Zap, Globe, TrendingUp, Clock } from "lucide-react";

export default function Features() {
    const features = [
        {
            icon: Zap,
            title: "Real-time 1v1 Battles",
            description:
                "Compete against developers in live coding challenges with instant feedback and results.",
            gradient: "from-primary/20 to-primary/5",
        },
        {
            icon: Globe,
            title: "Multi-language Support",
            description:
                "Code in your favorite language - Python, JavaScript, Java, C++, and 15+ more languages.",
            gradient: "from-tech-css/20 to-tech-css/5",
        },
        {
            icon: TrendingUp,
            title: "Live Rankings",
            description:
                "Track your progress with real-time leaderboards and climb to the top of the global rankings.",
            gradient: "from-tech-node/20 to-tech-node/5",
        },
        {
            icon: Clock,
            title: "Instant Feedback",
            description:
                "Get immediate test results and performance metrics to improve your coding skills faster.",
            gradient: "from-tech-swift/20 to-tech-swift/5",
        },
    ];

    return (
        <section id="features" className="py-20 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        What We <span className="text-primary">Offer</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Everything you need to become a better competitive programmer
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-xl hover:scale-105 hover:border-primary/50"
                        >
                            {/* Gradient Background */}
                            <div
                                className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
                            />

                            {/* Content */}
                            <div className="relative z-10">
                                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                    <feature.icon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>

                            {/* Hover Effect Border */}
                            <div className="absolute inset-0 rounded-2xl ring-2 ring-primary/0 group-hover:ring-primary/50 transition-all" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
