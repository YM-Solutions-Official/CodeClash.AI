"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, ChevronDown, Sparkles, Users, Trophy } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    const [typedText, setTypedText] = useState("");
    const fullText = "Battle. Code. Conquer.";

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index <= fullText.length) {
                setTypedText(fullText.slice(0, index));
                index++;
            } else {
                clearInterval(timer);
            }
        }, 100);

        return () => clearInterval(timer);
    }, []);

    const stats = [
        { icon: Trophy, value: "50K+", label: "Battles" },
        { icon: Users, value: "10K+", label: "Developers" },
        { icon: Sparkles, value: "15+", label: "Languages" },
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 grid-bg z-10" />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-linear-to-b from-background via-background/95 to-background" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />

            {/* Floating Code Snippets */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-10 text-xs text-muted-foreground/30 font-mono animate-float">
                    {"function battle() {"}
                </div>
                <div className="absolute top-1/2 right-20 text-xs text-muted-foreground/30 font-mono animate-float delay-300">
                    {"const winner = compete();"}
                </div>
                <div className="absolute bottom-1/3 left-1/3 text-xs text-muted-foreground/30 font-mono animate-float delay-500">
                    {"return victory ? '🏆' : '💪';"}
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    {/* Typing Animation Title */}
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                        {typedText}
                        <span className="animate-pulse">|</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Challenge developers worldwide in real-time 1v1 coding battles
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <Link href="/signup">
                            <Button
                                size="lg"
                                className="bg-primary hover:bg-primary-hover text-primary-foreground text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
                            >
                                <Sparkles className="mr-2 h-5 w-5" />
                                Start Competing
                            </Button>
                        </Link>
                        <Button
                            size="lg"
                            variant="outline"
                            className="text-lg px-8 py-6 rounded-xl border-2 hover:bg-accent transition-all hover:scale-105"
                        >
                            <Play className="mr-2 h-5 w-5" />
                            Watch Demo
                        </Button>
                    </div>

                    {/* Stats Counter */}
                    <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="glass rounded-xl p-6 hover:scale-105 transition-transform"
                            >
                                <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Scroll Indicator */}
                    <a
                        href="#features"
                        className="inline-flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <span className="text-sm mb-2">Discover more</span>
                        <ChevronDown className="h-6 w-6 animate-bounce" />
                    </a>
                </div>
            </div>

            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
        .delay-500 {
          animation-delay: 500ms;
        }
        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
        </section>
    );
};
