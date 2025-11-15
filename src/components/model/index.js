import React, { useEffect } from 'react';
import { buildFlickrImageUrl } from '../../utils/helper';

const ModalComponent = ({ photo, onClose }) => {
  const imageUrl = buildFlickrImageUrl(photo);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="relative max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110 group"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6 text-gray-700 group-hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative bg-gradient-to-br from-purple-50 to-pink-50">
          <img
            src={imageUrl}
            alt={photo.title || 'Flickr image'}
            className="w-full max-h-[80vh] object-contain"
          />
        </div>

        {/* Image Info */}
        {photo.title && (
          <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {photo.title}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Powered by Flickr</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalComponent;