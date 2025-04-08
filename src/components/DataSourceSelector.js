const DataSourceSelector = ({ value, onChange }) => (
    <div className="mb-4">
      <label className="block font-semibold mb-1">Data Source</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 border rounded w-full"
      >
        <option value="incident">Incident</option>
        <option value="user">User</option>
        <option value="tasks">Tasks</option>
      </select>
    </div>
  );
  
  export default DataSourceSelector;
  