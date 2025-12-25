"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function JoinHeader() {
  const router = useRouter();
  return (
    <header className="p-6">
      <Button
        variant="link"
        onClick={() => router.push("/")}
        className="text-muted-foreground cursor-pointer hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>
    </header>
  );
}
