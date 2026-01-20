"use client";

import { useState } from "react";

interface CodeEditorProps {
  onSubmit?: (code: string) => void; // optional if you want to use it later
}

export default function CodeEditor({ onSubmit }: CodeEditorProps) {
  const [code, setCode] = useState<string>("");

  const test = async () => {
    const res = await fetch("/api/stacktrace", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code, // send only code, no language
      }),
    });

    const data = await res.json();
    console.log(data);

    // if parent wants result later
    if (onSubmit) {
      onSubmit(code);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <textarea
        className="border-2 rounded p-2 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Paste your code here ..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <div className="overflow-hidden px-0 pt-2 py-2">
        <button
          onClick={test}
          disabled={!code.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded text-white"
        >
          Debug Code
        </button>
      </div>
    </div>
  );
}
