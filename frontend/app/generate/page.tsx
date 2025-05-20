import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function GeneratePage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column - Audio and metadata */}
          <div className="space-y-4">
            {/* Audio playback */}
            <div className="border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-400/50 transition-all hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]">
              <div className="mb-2 text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">SONIC SIGNATURE</div>
              
              <div className="flex items-center justify-center bg-black/50 rounded-lg p-4 border border-cyan-500/20">
                <button className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 flex items-center justify-center hover:scale-105 transition-transform">
                  <span className="text-2xl">▶️</span>
                </button>
                
                <div className="flex-1 ml-4">
                  <div className="w-full h-1 bg-gray-800 rounded-full mb-2">
                    <div className="w-1/3 h-full bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full"></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>0:00</span>
                    <span>0:45</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Emotion and Description */}
            <div className="border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-400/50 transition-all hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]">
              <div className="mb-2 text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">MOOD ANALYSIS</div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-cyan-300 text-sm w-28">Emotion:</span>
                  <span className="text-white flex items-center">
                    <span className="text-xl mr-2">😄</span> Happy
                  </span>
                </div>
                
                <div className="flex items-start">
                  <span className="text-cyan-300 text-sm w-28">Description:</span>
                  <span className="text-white text-sm italic">"Feeling super bright and sunny! This is the kind of day where everything just clicks into place."</span>
                </div>
                
                <div className="flex items-center">
                  <span className="text-cyan-300 text-sm w-28">Intensity:</span>
                  <div className="flex-1">
                    <div className="w-full h-1.5 bg-gray-800 rounded-full">
                      <div className="w-4/5 h-full bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full"></div>
                    </div>
                  </div>
                  <span className="text-xs text-pink-400 ml-2">HIGH</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - NFT Preview */}
          <div className="border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-400/50 transition-all hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]">
            <div className="mb-2 text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">GENERATED CREATURE</div>
            
            <div className="relative aspect-square mb-3 bg-gradient-to-br from-cyan-900/30 to-pink-900/30 rounded-lg overflow-hidden border border-cyan-500/20 flex items-center justify-center">
              {/* This would be replaced with the actual generated image */}
              <div className="text-center p-4">
                <div className="text-6xl mb-2">🐶</div>
                <div className="text-xl">Shiba with sunglasses 🕶️</div>
              </div>
              
              {/* Glowing frame effect */}
              <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-lg pointer-events-none"></div>
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"></div>
              <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"></div>
              <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-pink-500/50 to-transparent"></div>
            </div>
            
            <button className="w-full py-2 px-4 bg-black/50 border border-cyan-500/30 rounded-lg hover:bg-cyan-900/20 transition-colors flex items-center justify-center gap-2 text-sm">
              <span>Randomize Animal Image</span>
              <span className="text-lg">🔁</span>
            </button>
          </div>
        </div>
        
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
