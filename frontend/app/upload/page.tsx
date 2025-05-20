import React from 'react';
import Link from 'next/link';

export default function UploadPage() {
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
      <div className="z-10 max-w-4xl w-full mx-auto border-2 border-cyan-500/50 rounded-lg backdrop-blur-sm bg-black/70 p-6 shadow-[0_0_25px_rgba(0,255,255,0.5)]">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 glitch-text" data-text="SONIC EMOTION CAPTURE">
            SONIC EMOTION CAPTURE
          </h1>
          <p className="text-cyan-300 italic text-sm">"Your feelings, amplified through sound, immortalized in the digital realm"</p>
        </div>
        
        <div className="space-y-4">
          {/* Upload Audio File Section */}
          <div className="border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-400/50 transition-all hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] group">
            <label className="flex flex-col items-center justify-center cursor-pointer">
              <div className="flex flex-col items-center justify-center w-full">
                <div className="flex flex-col items-center justify-center py-2">
                  <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">🎵</span>
                  <span className="text-xl font-medium text-cyan-300 mb-1 group-hover:text-pink-300 transition-colors">DROP YOUR SONIC VIBE</span>
                  <span className="text-xs text-gray-400">[MP3/WAV FORMAT]</span>
                  <span className="text-xs text-pink-400/70 max-w-md text-center mt-1">Upload audio that captures your emotional state</span>
                </div>
                <input type="file" className="hidden" accept=".mp3,.wav" />
                <div className="w-full h-2 bg-gray-800/50 rounded-full mt-3 overflow-hidden border border-cyan-500/20">
                  <div className="w-0 h-full bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full"></div>
                </div>
              </div>
            </label>
          </div>
          
          {/* Emotion Tags Section */}
          <div className="border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-400/50 transition-all hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]">
            <div className="mb-2 text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">EMOTIONAL SIGNATURE</div>
            <p className="text-xs text-cyan-400/70 mb-3 max-w-lg">Select the emotion that best matches your audio</p>
            
            <div className="flex flex-wrap gap-3 justify-center">
              <button className="emotion-tag bg-black/50 hover:bg-blue-900/30 border border-blue-500/50 rounded-full py-2 px-4 text-2xl transition-all hover:shadow-[0_0_15px_rgba(0,100,255,0.5)] hover:scale-105 group">
                <span className="group-hover:-translate-y-1 transition-transform inline-block">😢</span>
                <span className="block text-xs mt-1 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">MELANCHOLY</span>
              </button>
              <button className="emotion-tag bg-black/50 hover:bg-red-900/30 border border-red-500/50 rounded-full py-2 px-4 text-2xl transition-all hover:shadow-[0_0_15px_rgba(255,0,0,0.5)] hover:scale-105 group">
                <span className="group-hover:-translate-y-1 transition-transform inline-block">😡</span>
                <span className="block text-xs mt-1 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">RAGE</span>
              </button>
              <button className="emotion-tag bg-black/50 hover:bg-green-900/30 border border-green-500/50 rounded-full py-2 px-4 text-2xl transition-all hover:shadow-[0_0_15px_rgba(0,255,100,0.5)] hover:scale-105 group">
                <span className="group-hover:-translate-y-1 transition-transform inline-block">😌</span>
                <span className="block text-xs mt-1 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">TRANQUILITY</span>
              </button>
              <button className="emotion-tag bg-black/50 hover:bg-purple-900/30 border border-purple-500/50 rounded-full py-2 px-4 text-2xl transition-all hover:shadow-[0_0_15px_rgba(200,0,255,0.5)] hover:scale-105 group">
                <span className="group-hover:-translate-y-1 transition-transform inline-block">🤯</span>
                <span className="block text-xs mt-1 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">CHAOS</span>
              </button>
              <button className="emotion-tag bg-black/50 hover:bg-pink-900/30 border border-pink-500/50 rounded-full py-2 px-4 text-sm transition-all hover:shadow-[0_0_15px_rgba(255,0,255,0.5)] hover:scale-105 group">
                <span className="group-hover:-translate-y-1 transition-transform inline-block text-lg">✨</span>
                <span className="block text-xs mt-1 text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity">CUSTOM</span>
              </button>
            </div>
          </div>
          
          {/* Description Section */}
          <div className="border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-400/50 transition-all hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]">
            <div className="mb-2 text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">NEURAL CONTEXT</div>
            <p className="text-xs text-cyan-400/70 mb-2 max-w-lg">Describe the context of your audio</p>
            
            <textarea 
              className="w-full h-20 bg-black/50 border border-cyan-500/30 rounded-lg p-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all text-xs"
              placeholder="What inspired this emotional moment? How intense is it?"
            ></textarea>
            <div className="text-right mt-1">
              <span className="text-xs text-gray-500">MAX 280 CHARS</span>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-6 border-t border-cyan-500/20 pt-4">
            <Link href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 text-sm">
              <span>←</span> <span>BACK</span>
            </Link>
            
            <Link href="/generate" className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-full shadow-[0_0_10px_rgba(0,255,255,0.5)] transition-all hover:shadow-[0_0_15px_rgba(0,255,255,0.7)] hover:scale-105 flex items-center gap-2 group text-sm">
              <span>SYNTHESIZE CREATURE</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
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
