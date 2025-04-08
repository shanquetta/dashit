const FilterBuilder = ({ filters, setFilters }) => {
    const addFilter = () => {
      setFilters([...filters, { field: '', operator: '', value: '' }]);
    };
  
    const updateFilter = (index, key, value) => {
      const newFilters = [...filters];
      newFilters[index][key] = value;
      setFilters(newFilters);
    };
  
    return (
      <div className="mb-4">
        <label className="block font-semibold mb-1">Filters</label>
        {filters.map((filter, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <select
              value={filter.field}
              onChange={(e) => updateFilter(idx, 'field', e.target.value)}
              className="border p-2 flex-1"
            >
              <option value="">-- choose field --</option>
              <option value="created">Created</option>
              <option value="state">State</option>
            </select>
            <select
              value={filter.operator}
              onChange={(e) => updateFilter(idx, 'operator', e.target.value)}
              className="border p-2 flex-1"
            >
              <option value="on">on</option>
              <option value="before">before</option>
              <option value="after">after</option>
            </select>
            <input
              value={filter.value}
              onChange={(e) => updateFilter(idx, 'value', e.target.value)}
              className="border p-2 flex-1"
              placeholder="e.g. This year"
            />
          </div>
        ))}
        <button
          onClick={addFilter}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          ➕ Add Filter
        </button>
      </div>
    );
  };
  
  export default FilterBuilder;
  