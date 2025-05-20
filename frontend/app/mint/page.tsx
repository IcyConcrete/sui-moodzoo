import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Cyberpunk background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-900/30 to-black/90"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat opacity-30"></div>
        
        {/* Glow elements - brighter for success page */}
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-500/30 blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-pink-500/30 blur-3xl"></div>
        <div className="absolute top-3/4 left-1/4 w-[300px] h-[300px] rounded-full bg-purple-500/20 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-[200px] h-[200px] rounded-full bg-yellow-500/20 blur-3xl"></div>
      </div>

      {/* Celebration particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Static particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-cyan-500 animate-ping"></div>
        <div className="absolute top-1/3 left-1/2 w-2 h-2 rounded-full bg-pink-500 animate-ping" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-2 h-2 rounded-full bg-purple-500 animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-2/3 left-2/3 w-2 h-2 rounded-full bg-yellow-500 animate-ping" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/5 left-3/4 w-2 h-2 rounded-full bg-green-500 animate-ping" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main content */}
      <div className="z-10 max-w-3xl w-full mx-auto border border-cyan-500/50 rounded-lg backdrop-blur-sm bg-black/70 p-6 shadow-[0_0_25px_rgba(0,255,255,0.5)]">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🎉</div>
          <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 glitch-text" data-text="NFT MINTED SUCCESSFULLY!">
            NFT MINTED SUCCESSFULLY!
          </h1>
          <p className="text-cyan-300 italic text-sm">Your emotional soundscape is now immortalized on the blockchain</p>
        </div>
        
        {/* NFT Details Card */}
        <div className="border border-cyan-500/30 rounded-lg p-5 hover:border-cyan-400/50 transition-all hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column - Audio and image */}
            <div className="space-y-4">
              {/* Audio playback */}
              <div className="bg-black/50 rounded-lg p-3 border border-cyan-500/20">
                <div className="flex items-center">
                  <button className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 flex items-center justify-center hover:scale-105 transition-transform">
                    <span className="text-xl">▶️</span>
                  </button>
                  
                  <div className="flex-1 ml-3">
                    <div className="w-full h-1 bg-gray-800 rounded-full mb-1">
                      <div className="w-1/3 h-full bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>0:00</span>
                      <span>0:45</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* NFT Image */}
              <div className="aspect-square bg-gradient-to-br from-cyan-900/30 to-pink-900/30 rounded-lg overflow-hidden border border-cyan-500/20 flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="text-6xl mb-2">🐱</div>
                  <div className="text-lg text-cyan-300">Party Cat</div>
                </div>
              </div>
            </div>
            
            {/* Right column - NFT Details */}
            <div className="space-y-4">
              <div className="mb-1 text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">NFT DETAILS</div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-cyan-300 text-sm w-28">Emotion:</span>
                  <span className="text-white flex items-center">
                    <span className="text-xl mr-2">😄</span> Happy
                  </span>
                </div>
                
                <div className="flex items-center">
                  <span className="text-cyan-300 text-sm w-28">MoodZoo Animal:</span>
                  <span className="text-white flex items-center">
                    <span className="text-xl mr-2">🐱</span> Party Cat
                  </span>
                </div>
                
                <div className="flex items-center">
                  <span className="text-cyan-300 text-sm w-28">Date:</span>
                  <span className="text-white text-sm">2025-05-21 03:14</span>
                </div>
                
                <div className="flex items-center">
                  <span className="text-cyan-300 text-sm w-28">On-chain ID:</span>
                  <span className="text-white text-sm font-mono">#12345</span>
                </div>
                
                <div className="flex items-center">
                  <span className="text-cyan-300 text-sm w-28">Owner:</span>
                  <span className="text-white text-sm font-mono truncate">0x71C7...F3a2</span>
                </div>
                
                <div className="flex items-center">
                  <span className="text-cyan-300 text-sm w-28">Network:</span>
                  <span className="text-white text-sm flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> Sui Mainnet
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <Link href="https://ipfs.io/" target="_blank" className="flex-1 py-3 px-4 bg-black/50 border border-cyan-500/50 rounded-lg hover:bg-cyan-900/20 transition-colors flex items-center justify-center gap-2 text-sm group">
            <span>VIEW ON IPFS</span>
            <span className="text-lg group-hover:scale-110 transition-transform">🔗</span>
          </Link>
          
          <Link href="/gallery" className="flex-1 py-3 px-4 bg-gradient-to-r from-cyan-500/80 to-pink-500/80 hover:from-cyan-500 hover:to-pink-500 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm shadow-[0_0_10px_rgba(0,255,255,0.3)] hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] group">
            <span>VIEW MY NFT GALLERY</span>
            <span className="text-lg group-hover:scale-110 transition-transform">🖼️</span>
          </Link>
        </div>
        
        {/* Share section */}
        <div className="mt-6 text-center">
          <p className="text-sm text-cyan-300 mb-2">Share your creation</p>
          <div className="flex justify-center gap-3">
            <button className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center hover:scale-110 transition-transform">
              <span className="text-sm">🐦</span>
            </button>
            <button className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center hover:scale-110 transition-transform">
              <span className="text-sm">📸</span>
            </button>
            <button className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center hover:scale-110 transition-transform">
              <span className="text-sm">💬</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Animated elements */}
      <div className="absolute top-10 right-10 w-3 h-32 bg-cyan-500/60 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-32 h-3 bg-pink-500/60 animate-pulse"></div>
      <div className="absolute left-0 w-full h-[2px] bg-cyan-500/30 animate-scan"></div>
    </div>
  );
}
