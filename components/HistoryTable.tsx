export default function HistoryTable({ data }: { data: any[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-900 text-white">
        <thead>
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Language</th>
            <th className="p-2">Status</th>
            <th className="p-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td className="p-2">{row.id}</td>
              <td className="p-2">{row.language}</td>
              <td className="p-2">{row.status}</td>
              <td className="p-2">{new Date(row.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
