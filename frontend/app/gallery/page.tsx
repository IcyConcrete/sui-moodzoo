import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function GalleryPage() {
  // Mock data for NFT gallery items
  const galleryItems = [
    { id: 1, animal: '🐸', name: 'Grumpy Frog', description: 'Why Monday again?', likes: 15, emotion: 'Grumpy' },
    { id: 2, animal: '🐶', name: 'Happy Doggo', description: 'Sunshine and lofi', likes: 21, emotion: 'Happy' },
    { id: 3, animal: '🐙', name: 'Sad Octopus', description: 'Feeling a bit lost', likes: 12, emotion: 'Sad' },
    { id: 4, animal: '🦊', name: 'Excited Fox', description: 'Just got great news!', likes: 18, emotion: 'Excited' },
    { id: 5, animal: '🦉', name: 'Wise Owl', description: 'Deep thoughts at midnight', likes: 9, emotion: 'Contemplative' },
    { id: 6, animal: '🦄', name: 'Dream Unicorn', description: 'Pure imagination vibes', likes: 25, emotion: 'Dreamy' },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col p-6 relative overflow-hidden">
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
      <div className="z-10 max-w-5xl w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 glitch-text" data-text="MOODZOO COMMUNITY">
            🖼️ MOODZOO COMMUNITY
          </h1>
          <p className="text-cyan-300 text-sm">Browse Mood NFTs by Emotion or Animal</p>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="border border-cyan-500/50 rounded-lg backdrop-blur-sm bg-black/70 p-4 shadow-[0_0_15px_rgba(0,255,255,0.3)] mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">🔍</span>
              </div>
              <input 
                type="text" 
                className="block w-full pl-10 pr-3 py-2 bg-black/50 border border-cyan-500/30 rounded-md text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
                placeholder="Search..."
              />
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <select className="bg-black/50 border border-cyan-500/30 rounded-md text-white px-3 py-2 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all">
                <option>😄 Happy</option>
                <option>😢 Sad</option>
                <option>😡 Angry</option>
                <option>😌 Calm</option>
                <option>🤯 Mind Blown</option>
              </select>
              
              <select className="bg-black/50 border border-cyan-500/30 rounded-md text-white px-3 py-2 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all">
                <option>🐬 Dolphin</option>
                <option>🐶 Dog</option>
                <option>🐱 Cat</option>
                <option>🦊 Fox</option>
                <option>🐸 Frog</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Gallery Grid */}
        <div className="border border-cyan-500/50 rounded-lg backdrop-blur-sm bg-black/70 p-6 shadow-[0_0_15px_rgba(0,255,255,0.3)]">
          <div className="space-y-4">
            {galleryItems.map((item) => (
              <div 
                key={item.id} 
                className="border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-400/50 transition-all hover:shadow-[0_0_10px_rgba(0,255,255,0.3)] hover:bg-black/50"
              >
                <div className="flex items-center">
                  {/* NFT Preview */}
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-cyan-900/30 to-pink-900/30 rounded-lg flex items-center justify-center text-3xl md:text-4xl mr-4">
                    {item.animal}
                  </div>
                  
                  {/* NFT Info */}
                  <div className="flex-grow">
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-cyan-300">{item.name}</h3>
                      <span className="ml-2 text-xs px-2 py-0.5 bg-black/50 border border-cyan-500/30 rounded-full text-gray-400">{item.emotion}</span>
                    </div>
                    <p className="text-sm text-gray-300 italic">"{item.description}"</p>
                  </div>
                  
                  {/* Likes */}
                  <div className="flex items-center text-pink-400 ml-4">
                    <button className="hover:scale-110 transition-transform">❤️</button>
                    <span className="ml-1 text-sm">{item.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-cyan-500/20">
            <button className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 text-sm">
              <span>←</span> <span>Previous</span>
            </button>
            
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 flex items-center justify-center text-sm">1</button>
              <button className="w-8 h-8 rounded-full bg-black/50 border border-cyan-500/30 flex items-center justify-center text-sm hover:bg-black/70 transition-colors">2</button>
              <button className="w-8 h-8 rounded-full bg-black/50 border border-cyan-500/30 flex items-center justify-center text-sm hover:bg-black/70 transition-colors">3</button>
            </div>
            
            <button className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 text-sm">
              <span>Next</span> <span>→</span>
            </button>
          </div>
        </div>
        
        {/* View Details Button */}
        <div className="flex justify-center mt-6">
          <Link href="/details/1" className="bg-gradient-to-r from-cyan-500/80 to-pink-500/80 hover:from-cyan-500 hover:to-pink-500 rounded-lg py-3 px-6 transition-colors flex items-center justify-center gap-2 text-sm shadow-[0_0_10px_rgba(0,255,255,0.3)] hover:shadow-[0_0_15px_rgba(0,255,255,0.5)]">
            <span>VIEW DETAILS</span>
            <span className="text-lg">→</span>
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
