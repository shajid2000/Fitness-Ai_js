import React from 'react';

const VideoPlayer = ({ showVideo, handleCloseVideo }) => {
  return showVideo ? (
    <div 
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300 ease-out"
      onClick={handleCloseVideo}
    >
      {/* Modal Content */}
      <div 
        className="relative w-full max-w-4xl mx-auto transform transition-all duration-300 ease-out scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Enhanced Close Button */}
        <button
          onClick={handleCloseVideo}
          className="absolute -top-12 right-0 z-10 flex items-center justify-center w-10 h-10 text-white bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full transition-all duration-200 ease-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 group"
          aria-label="Close video"
        >
          <svg 
            className="w-5 h-5 transition-transform group-hover:rotate-90" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video Container */}
        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          {/* Loading State Placeholder */}
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4 text-white/60">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-white/30 border-t-white"></div>
              <p className="text-sm">Loading video...</p>
            </div>
          </div>

          {/* Video Element */}
          <video 
            controls
            autoPlay
            className="relative w-full h-full object-cover rounded-2xl"
            onLoadStart={() => console.log('Video loading started')}
          >
            <source src="/videos/FitnessAi Demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Alternative Close Button (Mobile-friendly) */}
        <button
          onClick={handleCloseVideo}
          className="md:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-full transition-all duration-200 ease-out"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="text-sm font-medium">Close</span>
        </button>

        {/* Keyboard hint */}
        <div className="absolute -bottom-8 left-0 text-white/40 text-xs">
          Press ESC to close
        </div>
      </div>
    </div>
  ) : null;
};

// Enhanced version with keyboard support
const EnhancedVideoPlayer = ({ showVideo, handleCloseVideo }) => {
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showVideo) {
        handleCloseVideo();
      }
    };

    if (showVideo) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [showVideo, handleCloseVideo]);

  return showVideo ? (
    <div 
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={handleCloseVideo}
    >
      <div 
        className="relative w-full max-w-4xl mx-auto animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Primary Close Button */}
        <button
          onClick={handleCloseVideo}
          className="absolute -top-12 right-0 z-10 flex items-center justify-center w-12 h-12 text-white bg-red-500/80 hover:bg-red-500 backdrop-blur-md rounded-full transition-all duration-200 ease-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-400/50 shadow-lg group"
          aria-label="Close video"
        >
          <svg 
            className="w-6 h-6 transition-transform group-hover:rotate-90" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video Container with Glow Effect */}
        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20 ring-1 ring-white/10">
          <video 
            controls
            autoPlay
            className="w-full h-full object-cover"
            controlsList="nodownload"
          >
            <source src="/videos/FitnessAi Demo.mp4" type="video/mp4" />
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">
              <p>Your browser does not support the video tag.</p>
            </div>
          </video>
        </div>

        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-center mt-6">
          <button
            onClick={handleCloseVideo}
            className="flex items-center space-x-2 px-6 py-3 bg-red-500/80 hover:bg-red-500 backdrop-blur-md text-white rounded-full transition-all duration-200 ease-out shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="font-medium">Close Video</span>
          </button>
        </div>

        {/* Keyboard Hint */}
        <div className="hidden md:block absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 text-sm text-center">
          Press <kbd className="px-2 py-1 bg-white/10 rounded text-xs">ESC</kbd> or click outside to close
        </div>
      </div>
    </div>
  ) : null;
};

export default EnhancedVideoPlayer;