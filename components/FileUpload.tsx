"use client";
import { useState } from "react";

export default function FileUpload({ onResult }: { onResult: (data: any) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<"local" | "github">("local");

  const [githubUser, setGithubUser] = useState("");
  const [repo, setRepo] = useState("");
  const [filePath, setFilePath] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLocalUpload() {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    onResult(data.result.result);
    setLoading(false);
  }

  async function handleGithubUpload() {
    if (!githubUser || !repo || !filePath) return;

    setLoading(true);

    const res = await fetch("/api/github-fetch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: githubUser,
        repo,
        path: filePath,
      }),
    });

    const data = await res.json();
    onResult(data.result.result);
    setLoading(false);
  }

  return (
    <div className="bg-gray-900 p-4 rounded-xl shadow-md">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setMode("local")}
          className={`px-4 py-2 rounded ${
            mode === "local" ? "bg-blue-600" : "bg-gray-700"
          }`}
        >
          Local File
        </button>

        <button
          onClick={() => setMode("github")}
          className={`px-4 py-2 rounded ${
            mode === "github" ? "bg-purple-600" : "bg-gray-700"
          }`}
        >
          GitHub File
        </button>
      </div>

      {mode === "local" ? (
        <div>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mb-3 w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4
            file:rounded file:border-0 file:text-sm file:bg-gray-800 file:text-white
            hover:file:bg-gray-700"
          />
          <button
            onClick={handleLocalUpload}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded w-full"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload & Debug"}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="GitHub Username (e.g. vercel)"
            value={githubUser}
            onChange={(e) => setGithubUser(e.target.value)}
            className="w-full p-2 bg-black border border-gray-700 rounded"
          />

          <input
            type="text"
            placeholder="Repository Name (e.g. next.js)"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            className="w-full p-2 bg-black border border-gray-700 rounded"
          />

          <input
            type="text"
            placeholder="File Path (e.g. app/page.tsx)"
            value={filePath}
            onChange={(e) => setFilePath(e.target.value)}
            className="w-full p-2 bg-black border border-gray-700 rounded"
          />

          <button
            onClick={handleGithubUpload}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded w-full"
            disabled={loading}
          >
            {loading ? "Fetching from GitHub..." : "Fetch & Debug from GitHub"}
          </button>
        </div>
      )}
    </div>
  );
}
