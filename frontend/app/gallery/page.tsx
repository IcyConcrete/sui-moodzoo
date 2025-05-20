import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function GalleryPage() {
  // Mock data for NFT gallery items
  const galleryItems = [
    { id: 1, animal: '🐸', name: 'Grumpy Frog', description: 'Why Monday again?', likes: 15, emotion: 'Grumpy', audio: '0:32', color: 'from-green-500/80 to-yellow-500/80' },
    { id: 2, animal: '🐶', name: 'Happy Doggo', description: 'Sunshine and lofi', likes: 21, emotion: 'Happy', audio: '0:47', color: 'from-yellow-500/80 to-orange-500/80' },
    { id: 3, animal: '🐙', name: 'Sad Octopus', description: 'Feeling a bit lost', likes: 12, emotion: 'Sad', audio: '0:28', color: 'from-blue-500/80 to-purple-500/80' },
    { id: 4, animal: '🦊', name: 'Excited Fox', description: 'Just got great news!', likes: 18, emotion: 'Excited', audio: '0:35', color: 'from-orange-500/80 to-red-500/80' },
    { id: 5, animal: '🦉', name: 'Wise Owl', description: 'Deep thoughts at midnight', likes: 9, emotion: 'Contemplative', audio: '1:05', color: 'from-purple-500/80 to-indigo-500/80' },
    { id: 6, animal: '🦄', name: 'Dream Unicorn', description: 'Pure imagination vibes', likes: 25, emotion: 'Dreamy', audio: '0:52', color: 'from-pink-500/80 to-purple-500/80' },
  ];

  // Emotion tags for filter chips
  const emotionTags = [
    { emoji: '😄', name: 'Happy', active: true },
    { emoji: '😢', name: 'Sad', active: false },
    { emoji: '😡', name: 'Angry', active: false },
    { emoji: '😌', name: 'Calm', active: false },
    { emoji: '🤯', name: 'Mind Blown', active: false },
  ];

  // Animal tags for filter chips
  const animalTags = [
    { emoji: '🐬', name: 'Dolphin', active: false },
    { emoji: '🐶', name: 'Dog', active: true },
    { emoji: '🐱', name: 'Cat', active: false },
    { emoji: '🦊', name: 'Fox', active: false },
    { emoji: '🐸', name: 'Frog', active: false },
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
      <div className="z-10 max-w-6xl w-full mx-auto">
        {/* Header with interactive elements */}
        <div className="relative mb-10">
          <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-cyan-500/10 blur-2xl"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-pink-500/10 blur-2xl"></div>
          
          <div className="text-center relative">
            <h1 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 glitch-text" data-text="EMOTIONAL SOUNDSCAPE">
              EMOTIONAL SOUNDSCAPE
            </h1>
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-10 h-1 bg-gradient-to-r from-cyan-500 to-transparent rounded-full"></div>
              <p className="text-cyan-300 text-lg">🖼️ MoodZoo Community Gallery</p>
              <div className="w-10 h-1 bg-gradient-to-l from-pink-500 to-transparent rounded-full"></div>
            </div>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">Explore the collective emotional spectrum through sound-generated creatures</p>
          </div>
        </div>
        
        {/* Interactive Search and Filter Area */}
        <div className="backdrop-blur-md bg-black/40 rounded-xl overflow-hidden mb-8 border border-cyan-500/20 shadow-[0_0_20px_rgba(0,255,255,0.15)]">
          {/* Top search bar with visual elements */}
          <div className="relative p-4 border-b border-cyan-500/20">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500/50 via-pink-500/50 to-purple-500/50"></div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-cyan-400 text-lg">🔍</span>
              </div>
              <input 
                type="text" 
                className="block w-full pl-12 pr-4 py-3 bg-black/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all text-lg"
                placeholder="Search by emotion, animal, or description..."
              />
            </div>
          </div>
          
          {/* Filter chips area */}
          <div className="p-4 flex flex-wrap gap-3">
            <div className="mr-2 flex items-center">
              <span className="text-cyan-300 text-sm">MOOD:</span>
            </div>
            {emotionTags.map((tag, index) => (
              <button 
                key={`emotion-${index}`}
                className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5 transition-all ${tag.active ? 'bg-gradient-to-r from-cyan-500/80 to-pink-500/80 shadow-[0_0_10px_rgba(0,255,255,0.3)]' : 'bg-black/50 border border-cyan-500/30 hover:bg-black/70'}`}
              >
                <span>{tag.emoji}</span>
                <span>{tag.name}</span>
              </button>
            ))}
            
            <div className="mr-2 ml-4 flex items-center">
              <span className="text-cyan-300 text-sm">CREATURE:</span>
            </div>
            {animalTags.map((tag, index) => (
              <button 
                key={`animal-${index}`}
                className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5 transition-all ${tag.active ? 'bg-gradient-to-r from-cyan-500/80 to-pink-500/80 shadow-[0_0_10px_rgba(0,255,255,0.3)]' : 'bg-black/50 border border-cyan-500/30 hover:bg-black/70'}`}
              >
                <span>{tag.emoji}</span>
                <span>{tag.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Gallery Grid - Creative Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div 
              key={item.id} 
              className="group relative overflow-hidden rounded-xl backdrop-blur-sm bg-black/50 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] hover:translate-y-[-5px]"
            >
              {/* Gradient top border */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color}`}></div>
              
              {/* Card content */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  {/* Animal and name */}
                  <div className="flex items-center">
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-black/50 to-black/80 border border-cyan-500/20 flex items-center justify-center text-4xl mr-3 group-hover:scale-110 transition-transform duration-300">
                      {item.animal}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-cyan-300 group-hover:text-pink-300 transition-colors">{item.name}</h3>
                      <div className="flex items-center">
                        <span className="text-xs px-2 py-0.5 bg-black/70 rounded-full text-gray-400 border border-cyan-500/20">{item.emotion}</span>
                        <span className="ml-2 text-xs text-gray-500 flex items-center">
                          <span className="mr-1">🎵</span> {item.audio}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Likes */}
                  <div className="flex items-center text-pink-400">
                    <button className="hover:scale-125 transition-transform duration-300 relative">
                      <span className="absolute inset-0 animate-ping opacity-30 text-pink-500">❤️</span>
                      <span>❤️</span>
                    </button>
                    <span className="ml-1 text-sm">{item.likes}</span>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-sm text-gray-300 italic mb-4 min-h-[40px] border-l-2 border-cyan-500/30 pl-3">"{item.description}"</p>
                
                {/* Interactive elements */}
                <div className="flex justify-between items-center">
                  <button className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
                    <span className="text-lg">▶️</span> Play Audio
                  </button>
                  
                  <Link href={`/details/${item.id}`} className="text-xs text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-300">
                    View Details <span>→</span>
                  </Link>
                </div>
              </div>
              
              {/* Hover reveal audio wave visualization */}
              <div className="absolute bottom-0 left-0 w-full h-0 group-hover:h-1 transition-all duration-300 flex items-end overflow-hidden">
                <div className="flex w-full justify-around items-end">
                  {[...Array(20)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`bg-gradient-to-t ${item.color} w-1 rounded-t-sm`} 
                      style={{ 
                        height: `${Math.sin(i * 0.5) * 8 + 10}px`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Enhanced Pagination */}
        <div className="mt-12 flex justify-center">
          <div className="backdrop-blur-sm bg-black/50 border border-cyan-500/30 rounded-full px-2 py-1 flex items-center shadow-[0_0_15px_rgba(0,255,255,0.15)]">
            <button className="w-8 h-8 flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-colors">
              <span>←</span>
            </button>
            
            <div className="flex gap-1 px-2">
              <button className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 flex items-center justify-center text-sm shadow-[0_0_10px_rgba(0,255,255,0.3)]">1</button>
              <button className="w-8 h-8 rounded-full bg-black/70 border border-cyan-500/30 flex items-center justify-center text-sm hover:bg-black/90 transition-colors">2</button>
              <button className="w-8 h-8 rounded-full bg-black/70 border border-cyan-500/30 flex items-center justify-center text-sm hover:bg-black/90 transition-colors">3</button>
            </div>
            
            <button className="w-8 h-8 flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-colors">
              <span>→</span>
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
