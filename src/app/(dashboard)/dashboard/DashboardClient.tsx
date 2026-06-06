'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Loader2
} from 'lucide-react';
import { carouselApi, CarouselSlide } from '@/lib/api/carousel.api';
import { CAROUSEL_KEYS } from '@/config/query-keys';

const MOCK_SLIDES: CarouselSlide[] = [
  {
    id: 'mock-1',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    title: 'Integrated Logistics Command',
    description: 'Track real-time tonnage, analyze operational efficiency, and coordinate dispatch schedules from a unified digital workspace.',
    order: 0,
    createdAt: '2026-06-05T15:44:14.703Z'
  },
  {
    id: 'mock-2',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
    title: 'Automated Operations Hub',
    description: 'Optimize workflow throughput, generate gate passes instantly, and sync trip records seamlessly with domestic terminals.',
    order: 1,
    createdAt: '2026-06-05T15:42:36.792Z'
  },
  {
    id: 'mock-3',
    image: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&q=80',
    title: 'Enterprise Analytics Suite',
    description: 'Gain deeper insights into customer metrics, monitor MTD revenue growth, and identify bottleneck patterns with AI-driven charts.',
    order: 2,
    createdAt: '2026-06-05T15:40:00.000Z'
  }
];

export function DashboardClient() {
  // Fetch from the API
  const { data: apiResponse, isLoading } = useQuery({
    queryKey: CAROUSEL_KEYS.list(),
    queryFn: () => carouselApi.getSlides(),
    retry: 1,
  });

  const slides = apiResponse?.data && apiResponse.data.length > 0 ? apiResponse.data : MOCK_SLIDES;

  // Active slide index and autoplay states
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, [slides.length]);

  // Autoplay effects
  useEffect(() => {
    if (!isPlaying) {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      return;
    }

    const intervalTime = 10000;
    const updateRate = 100;
    const startedAt = Date.now();

    progressTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      setProgress(Math.min((elapsed / intervalTime) * 100, 100));
    }, updateRate);

    autoplayTimerRef.current = setInterval(() => {
      nextSlide();
    }, intervalTime);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPlaying, nextSlide]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-sky-500" />
        <p className="text-sm font-semibold text-slate-500">Loading command center...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Main Premium Carousel Banner */}
      <div className="relative h-[500px] w-full overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-2xl border border-slate-900">
        {/* Slides Container */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
          style={{ backgroundImage: `url(${slides[currentIndex]?.image})` }}
        />

        {/* Gradient Overlay for Text Visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />

        {/* Slide Content */}
        <div className="absolute inset-y-0 left-0 w-full md:w-3/5 p-8 md:p-16 flex flex-col justify-end z-10 space-y-8">

          {/* Text Block */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight max-w-md uppercase italic">
              {slides[currentIndex]?.title}
            </h2>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed max-w-sm">
              {slides[currentIndex]?.description}
            </p>
          </div>

          {/* Bottom Bar: Control and Progress */}
          <div className="flex items-center justify-between w-full max-w-md pt-2">
            {/* Left-aligned controls (Play/Pause, Prev, Next) */}
            <div className="flex items-center -space-x-px">
              {/* Play/Pause Toggle */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex h-11 w-11 items-center justify-center rounded-l-xl rounded-r-none bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-white transition-colors cursor-pointer active:scale-95"
                title={isPlaying ? 'Pause Autoplay' : 'Start Autoplay'}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              </button>

              {/* Prev Arrow */}
              <button
                onClick={prevSlide}
                className="flex h-11 w-11 items-center justify-center rounded-none bg-slate-900/60 hover:bg-slate-900 border-t border-b border-r border-slate-800 text-white transition-colors cursor-pointer active:scale-95"
                title="Previous Slide"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Next Arrow */}
              <button
                onClick={nextSlide}
                className="flex h-11 w-11 items-center justify-center rounded-r-xl rounded-l-none bg-slate-900/60 hover:bg-slate-900 border-t border-b border-r border-slate-800 text-white transition-colors cursor-pointer active:scale-95"
                title="Next Slide"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Slide Indicators / Dots */}
            <div className="flex space-x-1.5 pr-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setProgress(0);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === currentIndex ? 'w-6 bg-sky-500' : 'w-2 bg-slate-700/40 hover:bg-slate-500'
                    }`}
                  title={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Autoplay Timer Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-900">
          <div
            className="h-full bg-sky-500 transition-all ease-linear"
            style={{
              width: `${isPlaying ? progress : 0}%`,
              transitionDuration: isPlaying ? '50ms' : '0ms'
            }}
          />
        </div>
      </div>
    </div>
  );
}

