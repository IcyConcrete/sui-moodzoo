'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Type definitions
interface UploadData {
  fileName?: string;
  fileSize?: number;
  fileType?: string;
  emotion: string | null;
  customEmotion?: string;
  description: string;
  uploadTime: string;
}

export default function GeneratePageClient() {
  const router = useRouter();
  const [uploadData, setUploadData] = useState<UploadData | null>(null);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [generatedAnimal, setGeneratedAnimal] = useState<string>('🐶'); // Default animal
  const [animalDescription, setAnimalDescription] = useState<string>('Shiba with sunglasses 🕶️');
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Animals and descriptions mapping based on emotions
  const animalsByEmotion: Record<string, { emoji: string, descriptions: string[] }> = {
    'MELANCHOLY': { 
      emoji: '🐘', 
      descriptions: [
        'Gentle elephant with teary eyes',
        'Wise old elephant with distant gaze',
        'Melancholic elephant with droopy ears'
      ] 
    },
    'RAGE': { 
      emoji: '🐯', 
      descriptions: [
        'Fierce tiger with glowing eyes',
        'Battle-scarred tiger with intense stare',
        'Raging tiger with spiky fur'
      ] 
    },
    'TRANQUILITY': { 
      emoji: '🦥', 
      descriptions: [
        'Peaceful sloth meditating',
        'Serene sloth with half-closed eyes',
        'Tranquil sloth in zen pose'
      ] 
    },
    'CHAOS': { 
      emoji: '🦊', 
      descriptions: [
        'Wild fox with electric fur',
        'Chaotic fox surrounded by sparks',
        'Frenetic fox with swirling patterns'
      ] 
    },
    'CUSTOM': { 
      emoji: '🦄', 
      descriptions: [
        'Mystical unicorn with rainbow mane',
        'Unique unicorn with glowing horn',
        'Colorful unicorn with star patterns'
      ] 
    }
  };

  // Fetch data from localStorage on component mount
  useEffect(() => {
    try {
      // Check if running in browser environment
      if (typeof window !== 'undefined') {
        const storedData = localStorage.getItem('moodZooUploadData');
        const storedAudio = localStorage.getItem('moodZooAudioFile');
        
        if (storedData) {
          const parsedData = JSON.parse(storedData) as UploadData;
          setUploadData(parsedData);
          
          // Generate animal based on emotion
          generateAnimal(parsedData.emotion || 'CUSTOM');
        } else {
          // No data found, redirect back to upload
          router.push('/upload');
          return;
        }
        
        if (storedAudio) {
          setAudioSrc(storedAudio);
        }
        
        // Simulate loading
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    } catch (error) {
      console.error('Error fetching upload data:', error);
    }
  }, [router]);

  // Generate animal based on emotion
  const generateAnimal = (emotion: string) => {
    const animalData = animalsByEmotion[emotion] || animalsByEmotion['CUSTOM'];
    
    setGeneratedAnimal(animalData.emoji);
    const randomIndex = Math.floor(Math.random() * animalData.descriptions.length);
    setAnimalDescription(animalData.descriptions[randomIndex]);
  };

  // Randomize animal
  const randomizeAnimal = () => {
    if (!uploadData?.emotion) return;
    
    generateAnimal(uploadData.emotion);
    
    // Add vibration effect
    const animalContainer = document.getElementById('animal-container');
    if (animalContainer) {
      animalContainer.classList.add('animate-shake');
      setTimeout(() => {
        animalContainer.classList.remove('animate-shake');
      }, 500);
    }
  };

  // Audio player controls
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  // Update audio current time
  const updateTime = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  // Format time in mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Get emotion emoji
  const getEmotionEmoji = (emotion: string | null | undefined): string => {
    switch (emotion) {
      case 'MELANCHOLY': return '😢';
      case 'RAGE': return '😡';
      case 'TRANQUILITY': return '😌';
      case 'CHAOS': return '🤯';
      case 'CUSTOM': return '✨';
      default: return '😐';
    }
  };

  // Calculate intensity based on description length and emotion
  const calculateIntensity = (): {percent: number, label: string} => {
    if (!uploadData) return {percent: 0, label: 'LOW'};
    
    let intensity = 0;
    
    // Add intensity based on description length
    intensity += Math.min(uploadData.description.length / 280 * 50, 50);
    
    // Add intensity based on emotion
    if (uploadData.emotion === 'RAGE' || uploadData.emotion === 'CHAOS') {
      intensity += 40;
    } else if (uploadData.emotion === 'MELANCHOLY') {
      intensity += 30;
    } else {
      intensity += 20;
    }
    
    // Normalize to 100%
    intensity = Math.min(intensity, 100);
    
    // Label based on percentage
    let label = 'LOW';
    if (intensity > 70) label = 'HIGH';
    else if (intensity > 40) label = 'MEDIUM';
    
    return {percent: intensity, label};
  };

  // Handle audio load metadata
  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  // Handle audio ended
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const intensity = calculateIntensity();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Hidden audio element */}
      {audioSrc && (
        <audio 
          ref={audioRef}
          src={audioSrc || ''}
          onTimeUpdate={updateTime}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          className="hidden"
        />
      )}

      {/* Cyberpunk background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-900/30 to-black/90"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat opacity-30"></div>
        
        {/* Glow elements */}
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-pink-500/20 blur-3xl"></div>
        <div className="absolute top-3/4 left-1/4 w-[300px] h-[300px] rounded-full bg-purple-500/15 blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="z-10 max-w-4xl w-full mx-auto border border-cyan-500/50 rounded-lg backdrop-blur-sm bg-black/70 p-6 shadow-[0_0_25px_rgba(0,255,255,0.5)]">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 glitch-text" data-text="MOOD CREATURE PREVIEW">
            MOOD CREATURE PREVIEW
          </h1>
          <p className="text-cyan-300 italic text-sm">Your emotional audio has been transformed into a unique digital entity</p>
        </div>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-cyan-300">Generating your mood creature...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column - Audio and metadata */}
            <div className="space-y-4">
              {/* Audio playback */}
              <div className="border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-400/50 transition-all hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]">
                <div className="mb-2 text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">SONIC SIGNATURE</div>
                
                <div className="flex items-center justify-center bg-black/50 rounded-lg p-4 border border-cyan-500/20">
                  <button 
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 flex items-center justify-center hover:scale-105 transition-transform"
                    onClick={togglePlay}
                  >
                    <span className="text-2xl">{isPlaying ? '⏸️' : '▶️'}</span>
                  </button>
                  
                  <div className="flex-1 ml-4">
                    <div className="w-full h-1 bg-gray-800 rounded-full mb-2">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full transition-all duration-100"
                        style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                </div>
                
                {uploadData?.fileName && (
                  <div className="mt-2 text-xs text-cyan-300 text-center">
                    {uploadData.fileName} • {Math.round((uploadData.fileSize || 0) / 1024)} KB
                  </div>
                )}
              </div>
              
              {/* Emotion and Description */}
              <div className="border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-400/50 transition-all hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]">
                <div className="mb-2 text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">MOOD ANALYSIS</div>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-cyan-300 text-sm w-28">Emotion:</span>
                    <span className="text-white flex items-center">
                      <span className="text-xl mr-2">{getEmotionEmoji(uploadData?.emotion)}</span>
                      {uploadData?.emotion === 'CUSTOM' && uploadData?.customEmotion
                        ? uploadData.customEmotion
                        : uploadData?.emotion || 'Unknown'}
                    </span>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-cyan-300 text-sm w-28">Description:</span>
                    <span className="text-white text-sm italic">"{uploadData?.description || 'No description provided'}"</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-cyan-300 text-sm w-28">Intensity:</span>
                    <div className="flex-1">
                      <div className="w-full h-1.5 bg-gray-800 rounded-full">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full"
                          style={{ width: `${intensity.percent}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-xs text-pink-400 ml-2">{intensity.label}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right column - NFT Preview */}
            <div className="border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-400/50 transition-all hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]">
              <div className="mb-2 text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">GENERATED CREATURE</div>
              
              <div id="animal-container" className="relative aspect-square mb-3 bg-gradient-to-br from-cyan-900/30 to-pink-900/30 rounded-lg overflow-hidden border border-cyan-500/20 flex items-center justify-center">
                {/* Generated animal */}
                <div className="text-center p-4">
                  <div className="text-6xl mb-2">{generatedAnimal}</div>
                  <div className="text-xl">{animalDescription}</div>
                </div>
                
                {/* Glowing frame effect */}
                <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-lg pointer-events-none"></div>
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"></div>
                <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"></div>
                <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-pink-500/50 to-transparent"></div>
              </div>
              
              <button 
                className="w-full py-2 px-4 bg-black/50 border border-cyan-500/30 rounded-lg hover:bg-cyan-900/20 transition-colors flex items-center justify-center gap-2 text-sm"
                onClick={randomizeAnimal}
              >
                <span>Randomize Animal Image</span>
                <span className="text-lg">🔁</span>
              </button>
            </div>
          </div>
        )}
        
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-6 border-t border-cyan-500/20 pt-4">
          <Link href="/upload" className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 text-sm">
            <span>←</span> <span>BACK TO EDIT</span>
          </Link>
          
          <Link href="/mint" className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-full shadow-[0_0_10px_rgba(0,255,255,0.5)] transition-all hover:shadow-[0_0_15px_rgba(0,255,255,0.7)] hover:scale-105 flex items-center gap-2 group text-sm">
            <span>MINT THIS NFT</span>
            <span className="text-lg">💎</span>
          </Link>
        </div>
      </div>
      
      {/* Animated elements */}
      <div className="absolute top-10 right-10 w-3 h-32 bg-cyan-500/60 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-32 h-3 bg-pink-500/60 animate-pulse"></div>
      <div className="absolute left-0 w-full h-[2px] bg-cyan-500/30 animate-scan"></div>
    </div>
  );
}
