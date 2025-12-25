import RoomHeader from "@/components/battle/header";
import EditorPanel from "@/components/battle/editor-panel";
import ProblemPanel from "@/components/battle/problem-panel";
import BattleLayout from "@/components/layout/battle-layout";

export default async function BattleArena({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;

  return (
    <BattleLayout roomId={roomId}>
      <div className="h-screen bg-background text-foreground flex flex-col overflow-hidden">
        {/* Header */}
        <RoomHeader />

        <div className="flex-1 flex overflow-hidden">
          {/* Problem panel */}
          <ProblemPanel />

          {/* Editor panel */}
          <EditorPanel />
        </div>
      </div>
    </BattleLayout>
  );
}
