import WaitingLayout from "@/components/layout/waiting-layout";
import Countdown from "@/components/waiting/countdown";
import WaitingHeader from "@/components/waiting/header";
import PlayersSection from "@/components/waiting/players-section";
import RoomCodeCard from "@/components/waiting/room-code-card";
import StartButton from "@/components/waiting/start-button";

export default async function Waiting({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;

  return (
    <WaitingLayout roomId={roomId}>
      <div className="min-h-screen bg-background text-foreground overflow-hidden">
        {/* Background effects */}
        <div className="fixed inset-0 spotlight opacity-30" />
        <div
          className="fixed inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <Countdown />

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header */}
          <WaitingHeader />

          <div className="flex-1 flex items-center justify-center px-6 pb-20">
            <div className="w-full max-w-lg text-center">
              {/* Room code card */}
              <RoomCodeCard />

              {/* Players section */}
              <PlayersSection />

              {/* Start button */}
              <StartButton roomId={roomId} />
            </div>
          </div>
        </div>
      </div>
    </WaitingLayout>
  );
}
