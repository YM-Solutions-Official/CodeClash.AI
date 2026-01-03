import Logo from "@/components/common/logo";
import GridPattern from "@/components/auth/grid-pattern";
import AuthCard from "@/components/auth/auth-card";

export default function Auth() {
  return (
    <div className="min-h-screen bg-background dark relative overflow-hidden">
      {/* Grid pattern */}
      <GridPattern />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12">
        {/* Logo */}
        <Logo />

        {/* Auth Card */}
        <AuthCard />
      </div>
    </div>
  );
}
