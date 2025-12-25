"use client";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./language-selector";
import { useRef } from "react";
import { useBattleArenaStore } from "@/store/useBattleArenaStore";

export default function EditorPanel() {
  const editorRef = useRef<any>(null);
  const { code, setCode } = useBattleArenaStore();

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Language selector */}
      <LanguageSelector />

      {/* Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          language="javascript"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
          onMount={(editor) => {
            editorRef.current = editor;
          }}
          options={{
            fontSize: 14,
            fontFamily: "'JetBrains Mono', monospace",
            minimap: { enabled: false },
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 16 },
            renderLineHighlight: "all",
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            smoothScrolling: true,
          }}
        />
      </div>
    </div>
  );
}
