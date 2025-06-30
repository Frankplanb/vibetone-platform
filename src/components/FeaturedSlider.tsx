"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { AddToCartButton } from "@/components/ShoppingCart";

export default function FeaturedSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredTracks = [
    {
      id: 1,
      title: "Native Son feat. Mekkanon & Leo Napier",
      artist: "Cloudboy",
      price: "€19.99",
      image: "/api/placeholder/300/300",
      genre: "Deep House"
    },
    {
      id: 2,
      title: "Deep Emotions",
      artist: "Various Artists",
      price: "€24.99",
      image: "/api/placeholder/300/300",
      genre: "Electronic"
    },
    {
      id: 3,
      title: "Jazz Vibes Collection",
      artist: "Smooth Jazz Collective",
      price: "€29.99",
      image: "/api/placeholder/300/300",
      genre: "Jazz"
    },
    {
      id: 4,
      title: "Ambient Dreams",
      artist: "Ethereal Sounds",
      price: "€19.99",
      image: "/api/placeholder/300/300",
      genre: "Ambiente"
    },
    {
      id: 5,
      title: "Pop Fusion",
      artist: "Modern Beats",
      price: "€22.99",
      image: "/api/placeholder/300/300",
      genre: "Pop"
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredTracks.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredTracks.length) % featuredTracks.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative">
      {/* Main Slider */}
      <div className="slider-container">
        <div
          className="slider-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {featuredTracks.map((track, index) => (
            <div key={track.id} className="slider-item w-full flex-shrink-0">
              <div className="flex justify-center">
                <div className="relative group cursor-pointer hover-grow">
                  {/* Album Cover */}
                  <div className="w-80 h-80 bg-gradient-to-br from-zinc-700 to-zinc-900 rounded-xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="icon"
                        className="h-16 w-16 rounded-full bg-lime-500 hover:bg-lime-600 text-black"
                      >
                        <Play className="h-8 w-8" />
                      </Button>
                    </div>

                    {/* Track Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <Badge className="mb-2 bg-lime-500 text-black">{track.genre}</Badge>
                      <h3 className="text-white font-bold text-lg mb-1">{track.title}</h3>
                      <p className="text-zinc-300 text-sm">{track.artist}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lime-400 font-bold text-lg">{track.price}</span>
                        <AddToCartButton
                          track={{ id: track.id, title: track.title, artist: track.artist }}
                          licenseType="standard"
                          className="bg-black/50 hover:bg-black/70 text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 border-lime-500"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6 text-lime-500" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 border-lime-500"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6 text-lime-500" />
      </Button>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-8 space-x-2">
        {featuredTracks.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-lime-500' : 'bg-zinc-600'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
