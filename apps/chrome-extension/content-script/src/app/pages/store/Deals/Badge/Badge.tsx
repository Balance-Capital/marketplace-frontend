import { Dispatch, SetStateAction } from 'react';

export default function Badge({
  selectedFilter,
  label,
  setSelectedFilter,
  count,
}: {
  selectedFilter: string;
  label: string;
  setSelectedFilter: Dispatch<SetStateAction<string>>;
  count: number;
}) {
  return (
    <div
      className={`flex items-center justify-center gap-2 ${
        selectedFilter === label ? 'border-b-4 border-primary py-4' : ''
      }`}
      onClick={() => setSelectedFilter(label)}
    >
      <span className="rounded-full px-3 py-1 text-sm bg-[rgba(116,132,157,0.17)]">
        {count}
      </span>
      <h2 className="text-sm">{label}</h2>
    </div>
  );
}
