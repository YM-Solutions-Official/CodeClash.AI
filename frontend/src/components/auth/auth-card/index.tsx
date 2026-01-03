"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";
import { authAccessor } from "@/utils/accessors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";

export default function AuthCardWrapper() {
  return (
    <Suspense fallback={<AuthCardSkeleton />}>
      <AuthCard />
    </Suspense>
  );
}

function AuthCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "login";

  const [isSignUp, setIsSignup] = useState(mode === "signup");
  const [isUpgrade, setIsUpgrade] = useState(mode === "upgrade");

  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    const mode = searchParams.get("mode");
    setIsSignup(mode === "signup");
    setIsUpgrade(mode === "upgrade");
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await authAccessor.login(email.trim(), password);
      toast.success("Welcome back!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim() || !username.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await authAccessor.signup(email.trim(), password, username.trim());
      toast.success("Account created! Welcome to CodeClash!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim() || !username.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const response = await authAccessor.upgradeGuestAccount(
        email.trim(),
        password,
        username.trim()
      );
      toast.success(response.message || "Account upgraded successfully!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Account upgrade failed");
    } finally {
      setLoading(false);
    }
  };

  const handleContinueAsGuest = async () => {
    try {
      const response = await authAccessor.createGuestAccount();
      toast.success(response.message || "Account created successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to create account");
    } finally {
      router.push("/");
    }
  };

  const getTitle = () => {
    if (isUpgrade) return "Upgrade Your Account";
    if (isSignUp) return "Create Account";
    return "Welcome Back";
  };

  const getDescription = () => {
    if (isUpgrade) return "Save your progress and unlock all features";
    if (isSignUp) return "Join the competitive coding arena";
    return "Sign in to continue your battles";
  };

  const onSubmit = isUpgrade
    ? handleUpgrade
    : isSignUp
    ? handleSignup
    : handleLogin;

  return (
    <motion.div
      className="w-full max-w-md mt-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="glass-strong rounded-2xl p-8 shadow-premium">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {getTitle()}
          </h1>
          <p className="text-muted-foreground text-sm">{getDescription()}</p>
          {isUpgrade && user?.isGuest && (
            <div className="mt-3 p-3 bg-accent/10 border border-accent/20 rounded-lg">
              <p className="text-xs text-accent font-medium">
                🎉 Your match history and stats will be saved!
              </p>
            </div>
          )}
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          {(isSignUp || isUpgrade) && (
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground/80 text-sm">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="codechampion"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-background/50 border-border/50 focus:border-accent/50 h-11"
                  disabled={loading}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground/80 text-sm">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-background/50 border-border/50 focus:border-accent/50 h-11"
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground/80 text-sm">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-background/50 border-border/50 focus:border-accent/50 h-11"
                disabled={loading}
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                {isUpgrade
                  ? "Upgrade Account"
                  : isSignUp
                  ? "Create Account"
                  : "Sign In"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center space-y-3">
          {!isUpgrade && (
            <p className="text-sm text-muted-foreground">
              {isSignUp ? (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/auth?mode=login")}
                    className="text-accent hover:text-accent/80 font-medium transition-colors"
                  >
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/auth?mode=signup")}
                    className="text-accent hover:text-accent/80 font-medium transition-colors"
                  >
                    Create one
                  </button>
                </>
              )}
            </p>
          )}

          {!isUpgrade && (
            <button
              type="button"
              onClick={handleContinueAsGuest}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 mx-auto"
              disabled={loading}
            >
              <span>Or</span>
              <span className="text-foreground/80 font-medium underline underline-offset-2">
                continue as a guest
              </span>
              <ArrowRight className="h-3 w-3" />
            </button>
          )}

          {isUpgrade && (
            <button
              type="button"
              onClick={() => router.push("/")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              disabled={loading}
            >
              Maybe later
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function AuthCardSkeleton() {
  return (
    <div className="w-full max-w-md mt-5 rounded-2xl p-8 animate-pulse bg-muted/20">
      <div className="h-6 w-1/2 bg-muted rounded mb-4" />
      <div className="h-4 w-3/4 bg-muted rounded mb-8" />

      <div className="space-y-4">
        <div className="h-11 bg-muted rounded" />
        <div className="h-11 bg-muted rounded" />
        <div className="h-11 bg-muted rounded" />
      </div>
    </div>
  );
}
