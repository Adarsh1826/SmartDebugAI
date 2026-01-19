"use client";
import Editor from "@monaco-editor/react";
import { useState } from "react";

export default function CodeEditor({ onSubmit }: { onSubmit: (code: string) => void }) {
  const [code, setCode] = useState("");

  return (
    <div>
      <Editor
        height="350px"
        defaultLanguage="typescript"
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value || "")}
      />
      <button
        onClick={() => onSubmit(code)}
        className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
      >
        Debug Code
      </button>
    </div>
  );
}
