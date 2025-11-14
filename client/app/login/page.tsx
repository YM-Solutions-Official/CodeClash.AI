"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Code2, Mail, Lock, Chrome, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function Login() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const login = useAuthStore((state) => state.login);
    const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle);
    const isLoading = useAuthStore((state) => state.isLoading);
    const error = useAuthStore((state) => state.error);
    const clearError = useAuthStore((state) => state.clearError);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();

        try {
            await login(formData.email, formData.password);
            router.push('/');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleGoogleLogin = async () => {
        clearError();
        try {
            await loginWithGoogle();
            router.push('/');
        } catch (error) {
            console.error('Google login failed:', error);
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

                    <h2 className="text-4xl font-bold mb-6">Welcome Back!</h2>
                    <p className="text-xl text-muted-foreground mb-8">
                        Continue your journey to become a coding champion
                    </p>

                    <div className="glass rounded-2xl p-8 max-w-md mx-auto">
                        <div className="grid grid-cols-3 gap-6 mb-4">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary mb-1">50K+</div>
                                <div className="text-xs text-muted-foreground">Battles</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary mb-1">10K+</div>
                                <div className="text-xs text-muted-foreground">Developers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary mb-1">15+</div>
                                <div className="text-xs text-muted-foreground">Languages</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-background">
                <div className="w-full max-w-md">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Sign In</h1>
                        <p className="text-muted-foreground">
                            Welcome back! Please enter your details
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                            <p className="text-sm text-destructive">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Google Sign In */}
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full py-6 border-2 hover:bg-accent"
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                        >
                            <Chrome className="mr-2 h-5 w-5" />
                            {isLoading ? 'Connecting...' : 'Sign in with Google'}
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
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-primary hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
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
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground py-6 text-lg"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </Button>

                        {/* Signup Link */}
                        <p className="text-center text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <Link href="/signup" className="text-primary hover:underline font-medium">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};
