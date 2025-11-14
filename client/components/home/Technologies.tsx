import { Code2 } from "lucide-react";

export default function Technologies() {
    const languages = [
        { name: "Python", color: "python-blue", icon: "🐍" },
        { name: "JavaScript", color: "primary", icon: "⚡" },
        { name: "Java", color: "swift", icon: "☕" },
        { name: "C++", color: "css", icon: "⚙️" },
        { name: "Go", color: "css", icon: "🔷" },
        { name: "Rust", color: "swift", icon: "🦀" },
        { name: "TypeScript", color: "css", icon: "📘" },
        { name: "Swift", color: "swift", icon: "🍎" },
    ];

    return (
        <section className="py-20 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Supported <span className="text-primary">Technologies</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Code in your favorite language with support for all major programming languages
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
                    {languages.map((lang, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden glass rounded-xl p-6 text-center hover:scale-105 transition-all hover:shadow-xl"
                        >
                            {/* Hover Gradient */}
                            <div className={`absolute inset-0 bg-${lang.color}/10 opacity-0 group-hover:opacity-100 transition-opacity`} />

                            {/* Content */}
                            <div className="relative z-10">
                                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                                    {lang.icon}
                                </div>
                                <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {lang.name}
                                </div>
                            </div>

                            {/* Animated Border */}
                            <div className={`absolute inset-0 rounded-xl ring-2 ring-${lang.color}/0 group-hover:ring-${lang.color}/50 transition-all`} />
                        </div>
                    ))}
                </div>

                {/* And More Indicator */}
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 glass rounded-full px-6 py-3">
                        <Code2 className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground font-medium">and 7+ more languages</span>
                    </div>
                </div>
            </div>
        </section>
    );
};
