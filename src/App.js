import React, { useState, useCallback, useMemo } from 'react';
import SearchComponent from './components/search';
import ListComponent from './components/list';
import LoaderComponent from './components/loader';
import NoResultComponent from './components/no-result';
import ModalComponent from './components/model';
import { useImageSearch } from './hooks/useImageSearch';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import { useSearchHistory } from './hooks/useSearchHistory';
import { debounce } from './utils/helper';
import { APP_CONFIG } from './utils/config';

/**
 * Main App Component - Image Search Application
 * Modern React 18 implementation with hooks and Tailwind CSS
 */
function App() {
  const [searchInput, setSearchInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { photos, loading, searchPhotos, hasPhotos } = useImageSearch();
  const { searchHistory, addToHistory, clearHistory } = useSearchHistory();

  // Debounced search function
  const debouncedSearch = useMemo(
    () => debounce((query) => {
      searchPhotos(query, false);
      addToHistory(query);
    }, APP_CONFIG.debounceDelay),
    [searchPhotos, addToHistory]
  );

  // Handle search input change
  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchInput(value);
    setShowSuggestions(true);

    if (value.trim()) {
      debouncedSearch(value.trim());
    }
  }, [debouncedSearch]);

  // Handle search from history
  const handleHistoryItemClick = useCallback((query) => {
    setSearchInput(query);
    setShowSuggestions(false);
    searchPhotos(query, false);
  }, [searchPhotos]);

  // Handle clear search
  const handleClearSearch = useCallback(() => {
    setSearchInput('');
    setShowSuggestions(false);
  }, []);

  // Handle load more on scroll
  const handleLoadMore = useCallback(() => {
    if (searchInput.trim() && !loading) {
      searchPhotos(searchInput.trim(), true);
    }
  }, [searchInput, loading, searchPhotos]);

  // Infinite scroll
  useInfiniteScroll(handleLoadMore, hasPhotos && !loading);

  // Handle image modal
  const handleImageClick = useCallback((photo) => {
    setSelectedImage(photo);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Image Discovery
          </h1>
          <p className="text-gray-600 text-lg">
            Discover millions of beautiful images powered by Flickr
          </p>
        </header>

        {/* Search Section */}
        <SearchComponent
          searchInput={searchInput}
          showSuggestions={showSuggestions}
          searchHistory={searchHistory}
          onSearchChange={handleSearchChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onHistoryItemClick={handleHistoryItemClick}
          onClearSearch={handleClearSearch}
          onClearHistory={clearHistory}
        />

        {/* Content Section */}
        <main className="mt-12">
          {loading && !hasPhotos && <LoaderComponent />}

          {!loading && !hasPhotos && searchInput && <NoResultComponent />}

          {hasPhotos && (
            <ListComponent
              photos={photos}
              onImageClick={handleImageClick}
            />
          )}

          {loading && hasPhotos && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-purple-500 border-t-transparent"></div>
            </div>
          )}
        </main>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ModalComponent
          photo={selectedImage}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;
