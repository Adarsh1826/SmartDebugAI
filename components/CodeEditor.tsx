"use client";

import Editor from "@monaco-editor/react";
import { useState } from "react";
import type { SupportedLanguage } from "@/types/language";

interface CodeEditorProps {
  language: SupportedLanguage;   // selected language from parent
  onSubmit: (code: string) => void;
}

export default function CodeEditor({ language, onSubmit }: CodeEditorProps) {
  const [code, setCode] = useState<string>(""); // blank editor

  const test = async () => {
  const res = await fetch("/api/stacktrace", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
    }),
  });

  const data = await res.json();
  console.log(data);
};

  return (
    <div className="flex flex-col">
      <textarea name="" id="" className="border-2 "></textarea>
      <div className="overflow-hidden  px-0 pt-2 py-2">
        <button
        onClick={test}
        
        className=" bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded"
      >
        Debug Code
      </button>
      </div>
    </div>
  );
}

// in this i will hit the backend endpoint