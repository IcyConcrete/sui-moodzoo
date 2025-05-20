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
      <div className="z-10 max-w-4xl w-full mx-auto border-2 border-cyan-500/50 rounded-lg backdrop-blur-sm bg-black/70 p-10 shadow-[0_0_25px_rgba(0,255,255,0.5)]">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 glitch-text" data-text="Upload Your Mood Moment">
            Upload Your Mood Moment
          </h1>
        </div>
        
        <div className="space-y-8">
          {/* Upload Audio File Section */}
          <div className="border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-400/50 transition-all">
            <label className="flex flex-col items-center justify-center cursor-pointer">
              <div className="flex flex-col items-center justify-center w-full">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <span className="text-3xl mb-2">📁</span>
                  <span className="text-xl font-medium text-cyan-300 mb-1">Upload Audio File</span>
                  <span className="text-sm text-gray-400">(Supported: MP3, WAV)</span>
                </div>
                <input type="file" className="hidden" accept=".mp3,.wav" />
                <div className="w-full h-2 bg-gray-800 rounded-full mt-4 overflow-hidden">
                  <div className="w-0 h-full bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full"></div>
                </div>
              </div>
            </label>
          </div>
          
          {/* Emotion Tags Section */}
          <div className="border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-400/50 transition-all">
            <div className="mb-3 text-xl font-medium text-cyan-300">😊 Select Emotion Tag</div>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="emotion-tag bg-black/50 hover:bg-cyan-900/30 border-2 border-cyan-500/50 rounded-full py-3 px-6 text-2xl transition-all hover:shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                😢
              </button>
              <button className="emotion-tag bg-black/50 hover:bg-cyan-900/30 border-2 border-cyan-500/50 rounded-full py-3 px-6 text-2xl transition-all hover:shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                😡
              </button>
              <button className="emotion-tag bg-black/50 hover:bg-cyan-900/30 border-2 border-cyan-500/50 rounded-full py-3 px-6 text-2xl transition-all hover:shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                😌
              </button>
              <button className="emotion-tag bg-black/50 hover:bg-cyan-900/30 border-2 border-cyan-500/50 rounded-full py-3 px-6 text-2xl transition-all hover:shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                🤯
              </button>
              <button className="emotion-tag bg-black/50 hover:bg-cyan-900/30 border-2 border-pink-500/50 rounded-full py-3 px-6 text-sm transition-all hover:shadow-[0_0_10px_rgba(255,0,255,0.5)]">
                + Add New
              </button>
            </div>
          </div>
          
          {/* Description Section */}
          <div className="border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-400/50 transition-all">
            <div className="mb-3 text-xl font-medium text-cyan-300">📝 Description</div>
            <textarea 
              className="w-full h-24 bg-black/50 border-2 border-cyan-500/30 rounded-lg p-4 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
              placeholder="Write a short description of your feeling..."
            ></textarea>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-end mt-8">
            <Link href="/generate" className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-[0_0_15px_rgba(0,255,255,0.5)] transition-all hover:shadow-[0_0_25px_rgba(0,255,255,0.7)] flex items-center gap-2">
              <span>Next → Generate NFT</span>
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
