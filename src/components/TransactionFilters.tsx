'use client';

import { FilterType } from '@/types/transaction';

interface TransactionFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function TransactionFilters({ currentFilter, onFilterChange }: TransactionFiltersProps) {
  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All Transactions' },
    { value: 'credit', label: 'Credits Only' },
    { value: 'debit', label: 'Debits Only' },
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`
            px-5 py-2.5 rounded-full text-sm font-normal transition-all duration-200
            border border-solid min-w-[120px] shadow-sm
            ${
              currentFilter === filter.value
                ? 'bg-blue-50 text-blue-600 border-blue-200 shadow-xs font-medium'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:shadow-xs hover:border-gray-400'
            }
            active:scale-98
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
          `}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}