const filter_state = [
  { id: "0", value: "All" },
  { id: "true", value: "Archived" },
  { id: "false", value: "Un Archived" },
  { id: "answered", value: "Answered" },
  { id: "missed", value: "Missed" },
  { id: "voicemail", value: "Voice Mail" },
];

const SortByFilter = ({ filter, setFilter }) => {
  return (
    <div className="px-1 mt-2 mx-0 " style={{ borderRadius: "20px" }}>
      <div className="d-flex align-items-start flex-col">
        <p
          style={{ color: "black", whiteSpace: "nowrap" }}
          className="mt-2 mx-2"
        >
          Filter By:
        </p>
        <select
          className="mt-2"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        >
          {filter_state.map((filter) => (
            <option key={filter.id} value={filter.id}>
              {filter.value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortByFilter;
