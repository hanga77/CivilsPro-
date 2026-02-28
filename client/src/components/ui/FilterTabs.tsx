import React from 'react';

interface FilterTabsProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ filters, activeFilter, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-6 py-3 font-black text-[10px] uppercase tracking-widest transition-all ${
            activeFilter === filter
              ? 'bg-[#001E42] text-white'
              : 'bg-white text-slate-400 border border-slate-200 hover:border-[#FFB81C]'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
