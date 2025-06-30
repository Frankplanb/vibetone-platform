"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Play, Pause, Heart, Share2, Download, ShoppingCart } from "lucide-react";
import { useFavorites } from "@/components/FavoritesContext";

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  price: string;
  moodTags: string[];
  instrumentTags: string[];
  cover: string;
}

interface TrackListingProps {
  tracks?: Track[];
}

export default function TrackListing({ tracks: propTracks }: TrackListingProps) {
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const defaultTracks: Track[] = [
    {
      id: 1,
      title: "Stomper Snooper",
      artist: "by Harv Self",
      duration: "0:39",
      price: "€19.99",
      moodTags: ["Spiritual"],
      instrumentTags: ["Drum", "Heavy Bass"],
      cover: "/api/placeholder/80/80"
    },
    {
      id: 2,
      title: "The Piano Intro",
      artist: "by Harv Self",
      duration: "0:26",
      price: "€19.99",
      moodTags: ["Dark"],
      instrumentTags: ["Flute", "Piano"],
      cover: "/api/placeholder/80/80"
    },
    // ... weitere default Tracks hier ...
  ];

  const togglePlay = (trackId: number) => {
    setPlayingTrack(playingTrack === trackId ? null : trackId);
  };

  const toggleFavorite = (trackId: number) => {
    if (isFavorite(trackId)) {
      removeFromFavorites(trackId);
    } else {
      addToFavorites(trackId);
    }
  };

  // Einfach generierte Visualisierung der Waveform
  const generateWaveform = () => {
    const bars = [];
    for (let i = 0; i < 80; i++) {
      const height = Math.random() * 40 + 10;
      bars.push(
        <div
          key={i}
          className="waveform-bar w-1 mx-px rounded-sm opacity-70"
          style={{ height: `${height}px` }}
        />
      );
    }
    return bars;
  };

  // Tracks, die benutzt werden: propTracks oder defaultTracks
  const tracks = propTracks ?? defaultTracks;

  return (
    <section className="py-16 bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="space-y-4">
          {tracks.map((track) => (
            <Card key={track.id} className="track-card p-6">
              <div className="flex items-center space-x-4">
                {/* Album Cover mit Play Button Overlay */}
                <div className="w-20 h-20 bg-gradient-to-br from-zinc-700 to-zinc-900 rounded-lg flex-shrink-0 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 bg-lime-500 hover:bg-lime-600 text-black rounded-full"
                      onClick={() => togglePlay(track.id)}
                    >
                      {playingTrack === track.id ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Waveform + Track Infos */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-white">{track.title}</h3>
                      <p className="text-sm text-zinc-400">{track.artist}</p>
                    </div>
                    <div className="text-sm text-zinc-400">{track.duration}</div>
                  </div>

                  <div className="flex items-center h-12 mb-3">{generateWaveform()}</div>

                  {/* Mood & Instrument Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {track.moodTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs bg-zinc-800 text-zinc-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {track.instrumentTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs border-zinc-600 text-zinc-400"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Preis & Aktionen */}
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="price-badge px-3 py-1 rounded-full text-sm font-semibold">
                      {track.price}
                    </div>
                    <Button size="sm" className="download-button mt-2 text-xs px-4">
                      <Download className="h-3 w-3 mr-1" />
                      FREE DOWNLOAD
                    </Button>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className={`h-8 w-8 ${
                        isFavorite(track.id) ? "text-red-500" : "text-zinc-400"
                      }`}
                      onClick={() => toggleFavorite(track.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          isFavorite(track.id) ? "fill-current" : ""
                        }`}
                      />
                    </Button>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-zinc-400 hover:text-white"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-lime-500 hover:text-lime-400"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-12 space-x-2">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === 0 ? "bg-lime-500" : "bg-zinc-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}