export default function DebugResult({ result, loading }: { result: any; loading: boolean }) {
  if (loading) return <p className="text-center">Analyzing with Gemini...</p>;
  if (!result) return null;

  return (
    <div className="bg-gray-900 p-6 rounded-xl">
      <h3 className="text-lg font-bold">Errors</h3>
      <p className="mb-4">{result.errors}</p>

      <h3 className="text-lg font-bold">Suggestions</h3>
      <p className="mb-4">{result.suggestions}</p>

      <h3 className="text-lg font-bold">Fixed Code</h3>
      <pre className="bg-black p-4 rounded">{result.fixedCode}</pre>
    </div>
  );
}
