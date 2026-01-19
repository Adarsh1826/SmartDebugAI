"use client";

import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";
import FileUpload from "@/components/FileUpload";
import DebugResult from "@/components/DebugResult";

type SupportedLanguage = "javascript" | "typescript" | "python" | "java";

interface DebugAPIResponse {
  result: string;
}

export default function Home() {
  const [result, setResult] = useState<DebugAPIResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const [language, setLanguage] = useState<SupportedLanguage>("typescript");

  async function handleDebug(code: string) {
    setLoading(true);

    const res = await fetch("/api/debug", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        language,        
        fileName: `snippet.${language === "typescript" ? "ts" : "js"}`,
      }),
    });

    const data = await res.json();

    setResult({ result: data.data.result });
    setLoading(false);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="col-span-1 lg:col-span-2">
        <label className="mr-2 font-medium">Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
          className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
        >
          <option value="typescript">TypeScript</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>
      </div>

      <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Paste Your Error</h2>
        <CodeEditor onSubmit={handleDebug} />
      </div>

      <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Upload File</h2>
        <FileUpload onResult={setResult} />
      </div>

      <div className="col-span-1 lg:col-span-2">
        <DebugResult result={result} loading={loading} />
      </div>
    </div>
  );
}
