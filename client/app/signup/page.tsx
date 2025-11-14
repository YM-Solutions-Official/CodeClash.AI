"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Code2, Mail, Lock, User, Chrome, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-primary/20 via-primary/10 to-background relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-700" />

                <div className="relative z-10 flex flex-col justify-center px-12 text-center">
                    <Link href="/" className="flex items-center justify-center gap-2 mb-8">
                        <Code2 className="h-12 w-12 text-primary" />
                        <span className="text-3xl font-bold">
                            CodeClash<span className="text-primary">.AI</span>
                        </span>
                    </Link>

                    <h2 className="text-4xl font-bold mb-6">Join the Battle</h2>
                    <p className="text-xl text-muted-foreground mb-8">
                        Compete with developers worldwide in real-time coding challenges
                    </p>

                    <div className="space-y-4 text-left max-w-md mx-auto">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                                ✓
                            </div>
                            <div>
                                <div className="font-semibold mb-1">Real-time Battles</div>
                                <div className="text-sm text-muted-foreground">
                                    Compete in live 1v1 coding challenges
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                                ✓
                            </div>
                            <div>
                                <div className="font-semibold mb-1">15+ Languages</div>
                                <div className="text-sm text-muted-foreground">
                                    Code in your favorite programming language
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                                ✓
                            </div>
                            <div>
                                <div className="font-semibold mb-1">Global Rankings</div>
                                <div className="text-sm text-muted-foreground">
                                    Climb the leaderboards and earn achievements
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-background">
                <div className="w-full max-w-md">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                        <p className="text-muted-foreground">
                            Start your competitive coding journey today
                        </p>
                    </div>

                    <form className="space-y-6">
                        {/* Google Sign Up */}
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full py-6 border-2 hover:bg-accent"
                        >
                            <Chrome className="mr-2 h-5 w-5" />
                            Sign up with Google
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-background text-muted-foreground">
                                    or continue with email
                                </span>
                            </div>
                        </div>

                        {/* Full Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    className="pl-10 py-6"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    className="pl-10 py-6"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="pl-10 pr-10 py-6"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            <div className="h-1 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-1/3 transition-all" />
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Password strength: Weak (use 8+ characters)
                            </p>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    id="confirm-password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="pl-10 pr-10 py-6"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Terms Checkbox */}
                        <div className="flex items-start gap-2">
                            <Checkbox id="terms" className="mt-1" />
                            <label htmlFor="terms" className="text-sm text-muted-foreground">
                                I agree to the{" "}
                                <a href="#" className="text-primary hover:underline">
                                    Terms and Conditions
                                </a>{" "}
                                and{" "}
                                <a href="#" className="text-primary hover:underline">
                                    Privacy Policy
                                </a>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground py-6 text-lg"
                        >
                            Create Account
                        </Button>

                        {/* Login Link */}
                        <p className="text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link href="/login" className="text-primary hover:underline font-medium">
                                Log in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};
