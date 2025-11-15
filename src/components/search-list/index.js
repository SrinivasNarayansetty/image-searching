import React from 'react';

const SearchItemsList = ({ searchHistory, onItemClick, onClearHistory }) => {
  if (!searchHistory || searchHistory.length === 0) return null;

  return (
    <div className="absolute z-10 w-full mt-2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-purple-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50">
        <h3 className="text-sm font-semibold text-purple-900 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Recent Searches
        </h3>
        <button
          onClick={onClearHistory}
          className="text-xs font-medium text-purple-600 hover:text-purple-800 hover:underline transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Search History List */}
      <ul className="py-2 max-h-64 overflow-y-auto scrollbar-hide">
        {searchHistory.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => onItemClick(item)}
              className="w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-150 flex items-center gap-3 group"
            >
              <svg className="w-4 h-4 text-purple-400 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-gray-700 group-hover:text-purple-900 transition-colors">
                {item}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchItemsList;