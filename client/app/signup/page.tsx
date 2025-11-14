"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Code2, Mail, Lock, User, Chrome, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function Signup() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Zustand store
    const signup = useAuthStore((state) => state.signup);
    const signupWithGoogle = useAuthStore((state) => state.signupWithGoogle);
    const isLoading = useAuthStore((state) => state.isLoading);
    const error = useAuthStore((state) => state.error);
    const clearError = useAuthStore((state) => state.clearError);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
    });

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    // Password strength calculation
    const calculatePasswordStrength = (password: string) => {
        if (password.length === 0) return { strength: 0, label: '' };
        if (password.length < 6) return { strength: 33, label: 'Weak' };
        if (password.length < 10) return { strength: 66, label: 'Medium' };
        return { strength: 100, label: 'Strong' };
    };

    const passwordStrength = calculatePasswordStrength(formData.password);

    // Form validation
    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (formData.name.length < 2) {
            errors.name = 'Name must be at least 2 characters';
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Please enter a valid email';
        }

        if (formData.password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.agreeToTerms) {
            errors.agreeToTerms = 'You must agree to the terms and conditions';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();

        if (!validateForm()) {
            return;
        }

        try {
            await signup({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });
            router.push('/');
        } catch (error) {
            // Error is handled in the store
            console.error('Signup failed:', error);
        }
    };

    const handleGoogleSignup = async () => {
        clearError();
        try {
            await signupWithGoogle();
            router.push('/');
        } catch (error) {
            console.error('Google signup failed:', error);
        }
    };

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

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                            <p className="text-sm text-destructive">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Google Sign Up */}
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full py-6 border-2 hover:bg-accent"
                            onClick={handleGoogleSignup}
                            disabled={isLoading}
                        >
                            <Chrome className="mr-2 h-5 w-5" />
                            {isLoading ? 'Connecting...' : 'Sign up with Google'}
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
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            {formErrors.name && (
                                <p className="text-sm text-destructive">{formErrors.name}</p>
                            )}
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
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            {formErrors.email && (
                                <p className="text-sm text-destructive">{formErrors.email}</p>
                            )}
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
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    disabled={isLoading}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {formData.password && (
                                <>
                                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary transition-all"
                                            style={{ width: `${passwordStrength.strength}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Password strength: {passwordStrength.label || 'Enter a password'}
                                    </p>
                                </>
                            )}
                            {formErrors.password && (
                                <p className="text-sm text-destructive">{formErrors.password}</p>
                            )}
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
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    required
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    disabled={isLoading}
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {formErrors.confirmPassword && (
                                <p className="text-sm text-destructive">{formErrors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Terms Checkbox */}
                        <div className="space-y-2">
                            <div className="flex items-start gap-2">
                                <Checkbox
                                    id="terms"
                                    className="mt-1"
                                    checked={formData.agreeToTerms}
                                    onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                                    disabled={isLoading}
                                />
                                <label htmlFor="terms" className="text-sm text-muted-foreground">
                                    I agree to the{" "}
                                    <Link href="/terms" className="text-primary hover:underline">
                                        Terms and Conditions
                                    </Link>{" "}
                                    and{" "}
                                    <Link href="/privacy" className="text-primary hover:underline">
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>
                            {formErrors.agreeToTerms && (
                                <p className="text-sm text-destructive">{formErrors.agreeToTerms}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground py-6 text-lg"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
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
}