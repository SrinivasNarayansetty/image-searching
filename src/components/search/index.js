import React from 'react';
import SearchItemsList from '../search-list';

const SearchComponent = ({
  searchInput,
  showSuggestions,
  searchHistory,
  onSearchChange,
  onFocus,
  onBlur,
  onHistoryItemClick,
  onClearSearch,
  onClearHistory,
}) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative">
        {/* Search Input */}
        <div className="relative group">
          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <input
            type="text"
            value={searchInput}
            onChange={onSearchChange}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder="Search for images... (e.g., nature, technology, animals)"
            className="w-full pl-12 pr-12 py-4 text-lg rounded-2xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all duration-200 shadow-lg hover:shadow-xl bg-white/80 backdrop-blur-sm"
          />

          {/* Clear Button */}
          {searchInput && (
            <button
              onClick={onClearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-purple-100 transition-colors duration-200 text-purple-600 hover:text-purple-800 z-10"
              aria-label="Clear search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Search History Dropdown */}
        {showSuggestions && searchHistory.length > 0 && (
          <SearchItemsList
            searchHistory={searchHistory}
            onItemClick={onHistoryItemClick}
            onClearHistory={onClearHistory}
          />
        )}
      </div>
    </div>
  );
};

export default SearchComponent;