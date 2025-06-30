"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

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

interface FavoritesContextType {
  favorites: number[];
  addToFavorites: (trackId: number) => void;
  removeFromFavorites: (trackId: number) => void;
  isFavorite: (trackId: number) => boolean;
  getFavoritesCount: () => number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('vibetone-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('vibetone-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (trackId: number) => {
    setFavorites(prev => {
      if (!prev.includes(trackId)) {
        return [...prev, trackId];
      }
      return prev;
    });
  };

  const removeFromFavorites = (trackId: number) => {
    setFavorites(prev => prev.filter(id => id !== trackId));
  };

  const isFavorite = (trackId: number) => {
    return favorites.includes(trackId);
  };

  const getFavoritesCount = () => {
    return favorites.length;
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      getFavoritesCount
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
