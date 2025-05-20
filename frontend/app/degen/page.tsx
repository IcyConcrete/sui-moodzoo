import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function DegenZonePage() {
  // Mock data for trending tags
  const trendingTags = [
    { emoji: '🐶', name: 'Sad Shiba', color: 'from-yellow-500 to-orange-500' },
    { emoji: '🐸', name: 'Buff Frog', color: 'from-green-500 to-emerald-500' },
    { emoji: '🐠', name: 'Laser Fish', color: 'from-blue-500 to-cyan-500' },
    { emoji: '🦊', name: 'Stonks Fox', color: 'from-orange-500 to-red-500' },
    { emoji: '🦄', name: 'Moon Unicorn', color: 'from-purple-500 to-pink-500' },
  ];

  // Mock data for degen NFTs
  const degenNFTs = [
    { 
      id: 1, 
      animal: '🐍', 
      name: 'Snek NFT', 
      description: 'Much mood. Very sound.', 
      likes: 88, 
      color: 'from-green-500/80 to-yellow-500/80',
      rarity: 'Legendary',
      price: '0.42 ETH'
    },
    { 
      id: 2, 
      animal: '🐳', 
      name: 'Aquachad', 
      description: 'Sea the vibes', 
      likes: 64, 
      color: 'from-blue-500/80 to-cyan-500/80',
      rarity: 'Epic',
      price: '0.2 ETH'
    },
    { 
      id: 3, 
      animal: '🐈‍⬛', 
      name: 'Hacker Cat', 
      description: 'Deploying from the void', 
      likes: 42, 
      color: 'from-purple-500/80 to-indigo-500/80',
      rarity: 'Rare',
      price: '0.1337 ETH'
    },
    { 
      id: 4, 
      animal: '🦍', 
      name: 'Ape Together', 
      description: 'Strong mood only', 
      likes: 69, 
      color: 'from-gray-500/80 to-gray-700/80',
      rarity: 'Uncommon',
      price: '0.069 ETH'
    },
    { 
      id: 5, 
      animal: '🦜', 
      name: 'HODL Parrot', 
      description: 'Never selling these vibes', 
      likes: 55, 
      color: 'from-red-500/80 to-yellow-500/80',
      rarity: 'Rare',
      price: '0.055 ETH'
    },
    { 
      id: 6, 
      animal: '🐢', 
      name: 'Diamond Shell', 
      description: 'Slow and steady gains', 
      likes: 33, 
      color: 'from-emerald-500/80 to-green-500/80',
      rarity: 'Uncommon',
      price: '0.033 ETH'
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col p-6 relative overflow-hidden">
      {/* Cyberpunk background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-900/30 to-black/90"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat opacity-30"></div>
        
        {/* Meme-style background elements */}
        <div className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full bg-yellow-500/10 blur-xl animate-pulse"></div>
        <div className="absolute top-2/3 right-1/4 w-40 h-40 rounded-full bg-pink-500/10 blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 rounded-full bg-cyan-500/10 blur-xl animate-pulse"></div>
        
        {/* Stonks arrow */}
        <div className="absolute top-20 right-20 w-32 h-32 opacity-10">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 20L22 4M22 4H10M22 4V16" stroke="cyan" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        {/* Moon */}
        <div className="absolute top-20 left-20 w-16 h-16 rounded-full bg-yellow-300/20 blur-sm"></div>
      </div>

      {/* Main content */}
      <div className="z-10 max-w-6xl w-full mx-auto">
        {/* Header with meme-style title */}
        <div className="relative mb-10">
          <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-cyan-500/10 blur-2xl"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-pink-500/10 blur-2xl"></div>
          
          <div className="text-center relative">
            <h1 className="text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 glitch-text" data-text="🐸 DEGEN ANIMAL ZONE">
              🐸 DEGEN ANIMAL ZONE
            </h1>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-transparent rounded-full"></div>
              <p className="text-yellow-300 text-lg font-bold">Meme Pets, Rare Moods & Viral Creatures</p>
              <div className="w-20 h-1 bg-gradient-to-l from-pink-500 to-transparent rounded-full"></div>
            </div>
            
            {/* Animated rainbow line */}
            <div className="w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 rounded-full animate-gradient"></div>
          </div>
        </div>
        
        {/* Trending tags */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-lg text-red-400 animate-pulse">🔥</span>
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-300">
              Trending
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {trendingTags.map((tag, index) => (
              <button 
                key={index}
                className="group flex items-center gap-2 bg-black/60 backdrop-blur-sm border border-cyan-500/30 rounded-full px-4 py-2 hover:border-cyan-400 transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]"
              >
                <span className="text-2xl group-hover:animate-bounce">{tag.emoji}</span>
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${tag.color}`}>
                  {tag.name}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        {/* NFT Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {degenNFTs.map((nft) => (
            <div 
              key={nft.id}
              className="relative group bg-black/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg overflow-hidden hover:border-cyan-400 transition-all hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]"
            >
              {/* Gradient top border */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${nft.color}`}></div>
              
              {/* Rarity badge */}
              <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs bg-black/70 border border-cyan-500/30 z-10">
                {nft.rarity}
              </div>
              
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                      {nft.animal}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
                        {nft.name}
                      </h3>
                      <p className="text-xs text-gray-400">{nft.price}</p>
                    </div>
                  </div>
                  
                  {/* Likes */}
                  <div className="flex items-center text-pink-400">
                    <button className="hover:scale-125 transition-transform duration-300 relative">
                      <span className="absolute inset-0 animate-ping opacity-30 text-pink-500">❤️</span>
                      <span>❤️</span>
                    </button>
                    <span className="ml-1 text-sm">{nft.likes}</span>
                  </div>
                </div>
                
                {/* Description */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-10 bg-gradient-to-b from-cyan-500 to-transparent rounded-full"></div>
                  <p className="text-sm text-gray-300 italic">"{nft.description}"</p>
                </div>
                
                {/* Interactive elements */}
                <div className="flex justify-between items-center">
                  <Link 
                    href={`/details/${nft.id}`} 
                    className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                  >
                    View Details <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </Link>
                  
                  <button className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-1">
                    <span className="text-sm">💰</span> Buy Now
                  </button>
                </div>
              </div>
              
              {/* Hover reveal animation */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
        
        {/* CTA Button */}
        <div className="flex justify-center mb-10">
          <Link 
            href="/upload" 
            className="relative group overflow-hidden"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
            <button className="relative px-8 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600 hover:bg-black/80 transition-colors">
              <span className="flex items-center space-x-3 pr-6">
                <span className="text-2xl animate-bounce">🚀</span>
                <span className="text-gray-100 group-hover:text-white transition-colors text-lg font-bold">Mint Your Own Degen Mood</span>
              </span>
              <span className="pl-6 text-cyan-400 group-hover:text-cyan-300 transition-colors group-hover:translate-x-2 duration-200 flex items-center">
                <span className="text-lg">→</span>
              </span>
            </button>
          </Link>
        </div>
        
        {/* Footer with meme-style text */}
        <div className="text-center text-gray-500 text-sm">
          <p>Such NFT. Very Mood. Wow.</p>
        </div>
      </div>
      
      {/* Animated elements */}
      <div className="absolute top-10 right-10 w-3 h-32 bg-cyan-500/60 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-32 h-3 bg-pink-500/60 animate-pulse"></div>
      <div className="absolute left-0 w-full h-[2px] bg-cyan-500/30 animate-scan"></div>
      
      {/* Diamond hands */}
      <div className="absolute bottom-5 right-5 text-2xl animate-pulse">💎🙌</div>
    </div>
  );
}
