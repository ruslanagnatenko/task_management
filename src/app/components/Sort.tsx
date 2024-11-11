interface Props {
  sortStatuses: string[];
  toggleSortStatus: (status: string) => void;
}

export default function Sort({ sortStatuses, toggleSortStatus }: Props) {
  return (
    <div className="flex gap-2">
      <label className="flex items-center gap-1">
        <input
          type="checkbox"
          onChange={() => toggleSortStatus("NEW")}
          checked={sortStatuses.includes("NEW")}
        />
        NEW
      </label>
      <label className="flex items-center gap-1">
        <input
          type="checkbox"
          onChange={() => toggleSortStatus("DONE")}
          checked={sortStatuses.includes("DONE")}
        />
        DONE
      </label>
      <label className="flex items-center gap-1">
        <input
          type="checkbox"
          onChange={() => toggleSortStatus("IN PROGRESS")}
          checked={sortStatuses.includes("IN PROGRESS")}
        />
        IN PROGRESS
      </label>
    </div>
  );
}
