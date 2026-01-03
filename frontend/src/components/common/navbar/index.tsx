"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { authAccessor } from "@/utils/accessors";
import { Button } from "@/components/ui/button";
import Logo from "../logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Crown, LogOut, User } from "lucide-react";

function getInitials(email?: string, username?: string): string {
  if (username) {
    return username.slice(0, 2).toUpperCase();
  }
  if (email) {
    return email.slice(0, 2).toUpperCase();
  }
  return "U";
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  const { user, isLoading } = useAuthStore();
  const isGuest = user?.isGuest;
  const displayName = user?.username || user?.email || "User";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    authAccessor.logout();
  };

  const handleUpgrade = () => {
    router.push("/auth?mode=upgrade");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${
          scrolled
            ? "backdrop-blur-md bg-background/70 shadow-sm"
            : "bg-transparent"
        }
      `}
    >
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {["How it Works", "Features", "Open Source"].map((item, i) => (
              <motion.a
                key={item}
                href={
                  item === "Open Source"
                    ? "https://github.com/YM-Solutions-Official/CodeClash"
                    : `#${item.toLowerCase().replace(/ /g, "-")}`
                }
                target={item === "Open Source" ? "_blank" : undefined}
                rel={item === "Open Source" ? "noopener noreferrer" : undefined}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* Auth Section */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {isLoading ? (
              <div className="w-9 h-9 rounded-full bg-muted animate-pulse" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-full p-0.5 hover:bg-foreground/5 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50">
                    <Avatar className="h-9 w-9 border border-border/50">
                      <AvatarImage src={undefined} />
                      <AvatarFallback className="bg-linear-to-br from-primary to-accent text-primary-foreground text-xs font-medium">
                        {isGuest ? "G" : getInitials(user.email, user.username)}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 border-border/50"
                >
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-foreground">
                      {isGuest ? "Guest User" : displayName}
                    </p>
                    {user.email && (
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    )}
                    {isGuest && (
                      <p className="text-xs text-muted-foreground">
                        Playing as guest
                      </p>
                    )}
                  </div>
                  <DropdownMenuSeparator className="bg-border/50" />
                  {isGuest ? (
                    <>
                      <DropdownMenuItem
                        onClick={handleUpgrade}
                        className="cursor-pointer group focus:text-white"
                      >
                        <Crown className="mr-2 h-4 w-4 text-accent group-focus:text-white" />
                        Upgrade to Full Account
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.push("/auth?mode=login")}
                        className="cursor-pointer group focus:text-white"
                      >
                        <User className="mr-2 h-4 w-4 group-focus:text-white" />
                        Sign in
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={handleSignOut}
                        className="cursor-pointer text-destructive focus:bg-destructive focus:text-white group"
                      >
                        <LogOut className="mr-2 h-4 w-4 group-focus:text-white" />
                        Sign out
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-border/50" />
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem
                        onClick={() => router.push("/profile")}
                        className="cursor-pointer"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-border/50" />
                      <DropdownMenuItem
                        onClick={handleSignOut}
                        className="cursor-pointer text-destructive focus:text-destructive"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => router.push("/auth")}
              >
                Login
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
