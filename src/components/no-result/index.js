import React from 'react';

const NoResultComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Empty State Illustration */}
      <div className="w-32 h-32 mb-8 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
        <svg className="w-16 h-16 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6" />
        </svg>
      </div>

      {/* Message */}
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        No Results Found
      </h3>
      <p className="text-gray-500 text-center max-w-md mb-6">
        We couldn't find any images matching your search. Try different keywords or check your spelling.
      </p>

      {/* Suggestions */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 max-w-md">
        <h4 className="font-semibold text-purple-900 mb-3">Try searching for:</h4>
        <div className="flex flex-wrap gap-2">
          {['nature', 'technology', 'animals', 'architecture', 'food'].map((suggestion) => (
            <span
              key={suggestion}
              className="px-4 py-2 bg-white rounded-full text-sm text-purple-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              {suggestion}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoResultComponent;