interface Filter {
  status: string;
  priority: string;
}

interface Props {
  filter: Filter;
  setFilter: (arg: Filter) => void;
}

export default function Filters({ filter, setFilter }: Props) {
  return (
    <div className="flex gap-2">
      <select
        value={filter.status}
        onChange={(e) => setFilter({ ...filter, status: e.target.value })}
        className="text-gray-600"
      >
        <option value="">All Statuses</option>
        <option value="NEW">NEW</option>
        <option value="DONE">DONE</option>
        <option value="IN PROGRESS">IN PROGRESS</option>
      </select>

      <select
        value={filter.priority}
        onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
        className="text-gray-600"
      >
        <option value="">All Priorities</option>
        <option value="HIGH">HIGH</option>
        <option value="MIDDLE">MIDDLE</option>
        <option value="LOW">LOW</option>
      </select>
    </div>
  );
}
