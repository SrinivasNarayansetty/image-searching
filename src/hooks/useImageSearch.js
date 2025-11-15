import { useState, useCallback, useRef } from 'react';
import { FLICKR_API_URL } from '../utils/urls';
import { API_CONFIG } from '../utils/config';

/**
 * Custom hook for Flickr image search
 */
export const useImageSearch = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const pageRef = useRef(1);
  const apiCallInProgressRef = useRef(false);

  const searchPhotos = useCallback(async (query, isLoadMore = false) => {
    if (!query?.trim()) return;

    // Prevent duplicate API calls
    if (apiCallInProgressRef.current) return;

    apiCallInProgressRef.current = true;

    if (!isLoadMore) {
      setLoading(true);
      pageRef.current = 1;
    }

    try {
      // Build URL with safe search parameters
      const params = new URLSearchParams({
        api_key: API_CONFIG.apiKey,
        tags: query,
        format: API_CONFIG.responseFormat,
        nojsoncallback: API_CONFIG.nojsoncallback,
        page: pageRef.current,
        per_page: API_CONFIG.perPage,
        safe_search: API_CONFIG.safeSearch, // Safe content only
        content_type: API_CONFIG.contentType, // Photos only
      });

      const url = `${FLICKR_API_URL}&${params.toString()}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data?.photos?.photo && Array.isArray(data.photos.photo)) {
        setPhotos(prev => isLoadMore ? [...prev, ...data.photos.photo] : data.photos.photo);
        pageRef.current += 1;
        setError(null);
      } else {
        setError('No photos found');
      }
    } catch (err) {
      setError('Failed to fetch photos. Please try again.');
      console.error('Error fetching photos:', err);
    } finally {
      setLoading(false);
      apiCallInProgressRef.current = false;
    }
  }, []);

  const resetSearch = useCallback(() => {
    setPhotos([]);
    setLoading(false);
    setError(null);
    pageRef.current = 1;
  }, []);

  return {
    photos,
    loading,
    error,
    searchPhotos,
    resetSearch,
    hasPhotos: photos.length > 0,
  };
};
