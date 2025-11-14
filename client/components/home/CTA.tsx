import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
    return (
        <section className="py-20 px-4">
            <div className="container mx-auto">
                <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/20 via-primary/10 to-background border-2 border-primary/20">
                    {/* Animated Background Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-700" />

                    {/* Content */}
                    <div className="relative z-10 text-center py-20 px-4">
                        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">Start Your Journey Today</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl mx-auto">
                            Ready to Prove Your <span className="text-primary">Skills?</span>
                        </h2>

                        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                            Join thousands of developers competing in real-time coding battles.
                            Sharpen your skills, climb the ranks, and become a coding champion.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/signup">
                                <Button
                                    size="lg"
                                    className="bg-primary hover:bg-primary-hover text-primary-foreground text-lg px-10 py-7 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
                                >
                                    Start Your First Battle
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="text-lg px-10 py-7 rounded-xl border-2 hover:bg-accent transition-all hover:scale-105"
                                >
                                    Sign In
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <span>10,000+ Active Developers</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <span>50,000+ Battles Completed</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <span>15+ Programming Languages</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
