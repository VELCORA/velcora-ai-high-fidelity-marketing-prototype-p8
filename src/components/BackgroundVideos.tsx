import React, { useRef, useEffect, useCallback } from 'react';

export const VIDEO_DATA = [
  {
    id: 'golden-hour',
    label: 'Golden Hour',
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4',
    isDarkHero: false,
  },
  {
    id: 'still-water',
    label: 'Still Water',
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4',
    isDarkHero: false,
  },
  {
    id: 'deep-woods',
    label: 'Deep Woods',
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4',
    isDarkHero: true, // 3rd video index 2 has dark hero mode (#182C41)
  },
  {
    id: 'quiet-dawn',
    label: 'Quiet Dawn',
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4',
    isDarkHero: false,
  },
];

interface BackgroundVideosProps {
  activeVideoIndex: number;
}

export const BackgroundVideos: React.FC<BackgroundVideosProps> = ({ activeVideoIndex }) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const previousIndexRef = useRef<number>(activeVideoIndex);

  // Play active video immediately, and pause previous video after 1000ms crossfade
  const updateVideoPlayback = useCallback((currentIndex: number, prevIndex: number) => {
    // 1. Start current video immediately
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      if (currentVideo.paused) {
        const playPromise = currentVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay policies or race condition catch
          });
        }
      }
    }

    // 2. Pause other non-active videos after crossfade duration to reclaim 100% GPU memory & CPU cycles
    const timer = setTimeout(() => {
      videoRefs.current.forEach((video, idx) => {
        if (!video) return;
        if (idx !== currentIndex && !video.paused) {
          video.pause();
        }
      });
    }, 1050);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const cleanup = updateVideoPlayback(activeVideoIndex, previousIndexRef.current);
    previousIndexRef.current = activeVideoIndex;
    return cleanup;
  }, [activeVideoIndex, updateVideoPlayback]);

  // Initial mount: ensure first video plays
  useEffect(() => {
    const firstVideo = videoRefs.current[0];
    if (firstVideo) {
      firstVideo.play().catch(() => {});
    }
  }, []);

  return (
    <>
      {/* Background Video Layer (z-index 0) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden bg-black z-0 pointer-events-none"
        style={{ transform: 'translate3d(0, 0, 0)', backfaceVisibility: 'hidden' }}
      >
        {VIDEO_DATA.map((video, index) => {
          const isActive = activeVideoIndex === index;
          return (
            <video
              key={video.id}
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              src={video.url}
              muted
              loop
              playsInline
              preload={index === 0 ? 'auto' : 'metadata'}
              aria-label={`Background ambiance: ${video.label}`}
              style={{
                transform: 'translate3d(0, 0, 0)',
                backfaceVisibility: 'hidden',
                willChange: 'opacity',
              }}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            />
          );
        })}

        {/* Cinematic vignette gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/55 pointer-events-none" />
      </div>

      {/* Transparent PNG Overlay (z-index 1) with optimized continuous train-bob animation */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden z-10 pointer-events-none"
        style={{ transform: 'translate3d(0, 0, 0)', backfaceVisibility: 'hidden' }}
      >
        <img
          src="https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png"
          alt="Atmospheric landscape frame overlay"
          className="absolute inset-0 w-full h-full object-cover animate-train-bob select-none pointer-events-none"
          loading="eager"
          decoding="async"
        />
      </div>
    </>
  );
};

