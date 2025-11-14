import { Star, Quote } from "lucide-react";

export default function Testimonials() {
    const testimonials = [
        {
            name: "Sarah Chen",
            role: "Senior Developer at Google",
            avatar: "SC",
            content:
                "CodeClash.AI has transformed how I practice coding. The real-time battles keep me sharp and the competition drives me to improve every day.",
            rating: 5,
        },
        {
            name: "Marcus Rodriguez",
            role: "Full Stack Engineer",
            avatar: "MR",
            content:
                "I've tried many coding platforms, but nothing compares to the adrenaline of a live 1v1 battle. This platform is addictive in the best way!",
            rating: 5,
        },
        {
            name: "Priya Patel",
            role: "CS Student at MIT",
            avatar: "PP",
            content:
                "As a student preparing for technical interviews, CodeClash.AI has been invaluable. The instant feedback and competitive environment helped me land my dream internship.",
            rating: 5,
        },
    ];

    return (
        <section className="py-20 px-4 bg-muted/30">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        What Developers <span className="text-primary">Say</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Join thousands of developers who are leveling up their skills
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="glass rounded-2xl p-8 hover:shadow-xl transition-all hover:scale-105 relative"
                        >
                            {/* Quote Icon */}
                            <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />

                            {/* Avatar */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-linear-to-br from-primary to-primary-hover flex items-center justify-center text-primary-foreground font-bold text-lg">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <div className="font-semibold text-lg">{testimonial.name}</div>
                                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-muted-foreground leading-relaxed">{testimonial.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
