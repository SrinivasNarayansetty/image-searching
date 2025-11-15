import React from 'react';
import { buildFlickrImageUrl } from '../../utils/helper';

const ListComponent = ({ photos, onImageClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {photos.map((photo, index) => {
        const imageUrl = buildFlickrImageUrl(photo);

        return (
          <div
            key={`photo-${photo.id}-${index}`}
            className="group relative cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            onClick={() => onImageClick(photo)}
          >
            {/* Image Container with Aspect Ratio */}
            <div className="relative aspect-square bg-gradient-to-br from-purple-100 to-pink-100">
              <img
                src={imageUrl}
                alt={photo.title || 'Flickr image'}
                className="w-full h-full object-cover"
                loading="lazy"
              />

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-sm line-clamp-2">
                    {photo.title || 'Untitled'}
                  </h3>
                </div>
              </div>

              {/* View Icon */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListComponent;