const DataPreviewTable = ({ data }) => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Field</th>
            <th className="border px-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td className="border px-4 py-2">Row {i + 1}</td>
              <td className="border px-4 py-2">{JSON.stringify(row)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  export default DataPreviewTable;
  