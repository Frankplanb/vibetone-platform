"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Repeat, Shuffle } from "lucide-react";

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  audioUrl?: string;
}

interface AudioPlayerProps {
  currentTrack?: Track;
  playlist?: Track[];
  onNext?: () => void;
  onPrevious?: () => void;
}

export default function AudioPlayer({
  currentTrack,
  playlist = [],
  onNext,
  onPrevious
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressInterval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleTrackEnd);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleTrackEnd);
    };
  }, [currentTrack]);

  const handleTrackEnd = () => {
    if (isRepeat) {
      audioRef.current?.play();
    } else if (onNext) {
      onNext();
    } else {
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = (value[0] / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!currentTrack) {
    return (
      <Card className="fixed bottom-0 left-0 right-0 audio-player-bg p-4 border-t border-zinc-700">
        <div className="container mx-auto">
          <div className="flex items-center justify-center text-zinc-400">
            <p>Wähle einen Track zum Abspielen</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl || "/audio/demo-track.mp3"}
        preload="metadata"
      />

      <Card className="fixed bottom-0 left-0 right-0 audio-player-bg p-4 border-t border-zinc-700 z-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {/* Track Info */}
            <div className="flex items-center space-x-4 min-w-0 flex-1">
              <div className="w-12 h-12 bg-gradient-to-br from-lime-500 to-lime-600 rounded-lg flex-shrink-0" />
              <div className="min-w-0">
                <h4 className="font-semibold text-white truncate">{currentTrack.title}</h4>
                <p className="text-sm text-zinc-400 truncate">{currentTrack.artist}</p>
              </div>
            </div>

            {/* Player Controls */}
            <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsShuffle(!isShuffle)}
                  className={`${isShuffle ? 'text-lime-500' : 'text-zinc-400'} hover:text-white`}
                >
                  <Shuffle className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onPrevious}
                  className="text-zinc-400 hover:text-white"
                  disabled={!onPrevious}
                >
                  <SkipBack className="h-4 w-4" />
                </Button>

                <Button
                  size="sm"
                  onClick={togglePlay}
                  className="bg-lime-500 hover:bg-lime-600 text-black rounded-full w-10 h-10"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onNext}
                  className="text-zinc-400 hover:text-white"
                  disabled={!onNext}
                >
                  <SkipForward className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsRepeat(!isRepeat)}
                  className={`${isRepeat ? 'text-lime-500' : 'text-zinc-400'} hover:text-white`}
                >
                  <Repeat className="h-4 w-4" />
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center space-x-2 w-full">
                <span className="text-xs text-zinc-400 min-w-[35px]">
                  {formatTime(currentTime)}
                </span>
                <Slider
                  value={[progress]}
                  onValueChange={handleProgressChange}
                  max={100}
                  step={0.1}
                  className="flex-1"
                />
                <span className="text-xs text-zinc-400 min-w-[35px]">
                  {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Volume Control */}
            <div className="flex items-center space-x-2 flex-1 justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className="text-zinc-400 hover:text-white"
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume * 100]}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="w-20"
              />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
