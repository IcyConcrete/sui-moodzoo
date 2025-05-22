'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NFTItem {
  id: string;
  animal: string;
  name: string;
  description: string;
  likes: number;
  emotion: string;
  audio: string;
  color: string;
  cid?: string;
  createdAt: string;
  animalDescription?: string;
}

export default function GalleryPageClient() {
  const [galleryItems, setGalleryItems] = useState<NFTItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeEmotionFilter, setActiveEmotionFilter] = useState<string | null>(null);
  const [activeAnimalFilter, setActiveAnimalFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Emotion tags for filter chips
  const emotionTags = [
    { emoji: '😢', name: 'MELANCHOLY', active: false },
    { emoji: '😡', name: 'RAGE', active: false },
    { emoji: '😌', name: 'TRANQUILITY', active: false },
    { emoji: '🤯', name: 'CHAOS', active: false },
    { emoji: '✨', name: 'CUSTOM', active: false },
  ];

  // Mapping emotions to colors
  const emotionColors: Record<string, string> = {
    'MELANCHOLY': 'from-blue-500/80 to-purple-500/80',
    'RAGE': 'from-red-500/80 to-orange-500/80',
    'TRANQUILITY': 'from-green-500/80 to-teal-500/80',
    'CHAOS': 'from-purple-500/80 to-pink-500/80',
    'CUSTOM': 'from-pink-500/80 to-purple-500/80',
    'default': 'from-cyan-500/80 to-blue-500/80'
  };

  useEffect(() => {
    // Load all saved NFTs from localStorage
    const loadNFTs = () => {
      setIsLoading(true);
      
      try {
        // First check if there's a current upload
        const currentMetadataStr = localStorage.getItem('moodZooUploadedMetadata');
        const currentCID = localStorage.getItem('moodZooLighthouseCID');
        
        // Check for any previously saved NFTs
        const savedNFTsStr = localStorage.getItem('moodZooSavedNFTs');
        const savedNFTs = savedNFTsStr ? JSON.parse(savedNFTsStr) : [];
        
        // Create a new array to hold all NFT items
        let allNFTs: NFTItem[] = [...savedNFTs];
        
        // Add the current NFT if it exists and isn't already in the list
        if (currentMetadataStr && currentCID) {
          const currentMetadata = JSON.parse(currentMetadataStr);
          
          const exists = allNFTs.some(nft => nft.cid === currentCID);
          
          if (!exists) {
            // Format the NFT data
            const newNFT: NFTItem = {
              id: currentCID,
              animal: currentMetadata.animal || '🐱',
              name: currentMetadata.name || 'Untitled NFT',
              description: currentMetadata.description || 'No description',
              likes: 0,
              emotion: currentMetadata.emotion || 'CUSTOM',
              audio: '0:45', // This would ideally be the actual duration
              color: emotionColors[currentMetadata.emotion] || emotionColors.default,
              cid: currentCID,
              createdAt: currentMetadata.createdAt || new Date().toISOString(),
              animalDescription: currentMetadata.animalDescription
            };
            
            // Add to array
            allNFTs.push(newNFT);
            
            // Save back to localStorage for future visits
            localStorage.setItem('moodZooSavedNFTs', JSON.stringify(allNFTs));
          }
        }
        
        // If we have no NFTs, add some sample ones for demo purposes
        if (allNFTs.length === 0) {
          allNFTs = [
            { 
              id: 'sample1', 
              animal: '🐸', 
              name: 'Grumpy Frog', 
              description: 'Why Monday again?', 
              likes: 15, 
              emotion: 'CHAOS', 
              audio: '0:32', 
              color: 'from-green-500/80 to-yellow-500/80',
              createdAt: new Date().toISOString(),
              animalDescription: 'Grumpy frog with headphones'
            },
            { 
              id: 'sample2', 
              animal: '🐶', 
              name: 'Happy Doggo', 
              description: 'Sunshine and lofi', 
              likes: 21, 
              emotion: 'TRANQUILITY', 
              audio: '0:47', 
              color: 'from-yellow-500/80 to-orange-500/80',
              createdAt: new Date().toISOString(),
              animalDescription: 'Happy dog with wagging tail'
            }
          ];
        }
        
        // Sort by creation date (newest first)
        allNFTs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        
        setGalleryItems(allNFTs);
      } catch (error) {
        console.error('Error loading NFTs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadNFTs();
  }, []);

  // Format date string
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Unknown date';
    }
  };

  // Filter items based on active filters and search query
  const filteredItems = galleryItems.filter(item => {
    // Filter by emotion
    if (activeEmotionFilter && item.emotion !== activeEmotionFilter) {
      return false;
    }
    
    // Filter by animal (would need better detection in a real app)
    if (activeAnimalFilter && !item.animalDescription?.toLowerCase().includes(activeAnimalFilter.toLowerCase())) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !item.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

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
        <div className="backdrop-blur-sm bg-black/40 p-4 rounded-lg border border-cyan-500/30 mb-8 shadow-[0_0_25px_rgba(0,255,255,0.1)]">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search bar */}
            <div className="flex-1">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search NFTs..." 
                  className="w-full bg-black/70 border border-cyan-500/50 rounded-full py-2 px-4 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all text-sm pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-500">🔍</span>
              </div>
            </div>
            
            {/* Filter chips */}
            <div className="flex flex-wrap gap-2">
              <div className="text-sm text-cyan-300 my-auto">Emotion:</div>
              {emotionTags.map(tag => (
                <button 
                  key={tag.name}
                  onClick={() => setActiveEmotionFilter(activeEmotionFilter === tag.name ? null : tag.name)}
                  className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 transition-all ${
                    activeEmotionFilter === tag.name 
                      ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white shadow-[0_0_10px_rgba(0,255,255,0.5)]' 
                      : 'bg-black/50 border border-cyan-500/50 text-cyan-300 hover:bg-black/70'
                  }`}
                >
                  <span>{tag.emoji}</span>
                  <span>{tag.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* NFT Gallery Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center p-10 border border-cyan-500/30 rounded-lg backdrop-blur-sm bg-black/40">
            <div className="text-4xl mb-4">😢</div>
            <h3 className="text-xl text-cyan-300 mb-2">No NFTs Found</h3>
            <p className="text-gray-400">Try adjusting your filters or create a new NFT!</p>
            <Link href="/upload" className="inline-block mt-4 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-full shadow-[0_0_10px_rgba(0,255,255,0.5)] transition-all hover:shadow-[0_0_15px_rgba(0,255,255,0.7)]">
              Create New NFT
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="relative group backdrop-blur-sm bg-black/40 border border-cyan-500/30 rounded-lg overflow-hidden transition-all hover:shadow-[0_0_25px_rgba(0,255,255,0.3)] hover:border-cyan-400/50"
              >
                {/* NFT Card Content */}
                <div className="p-4">
                  {/* NFT Header */}
                  <div className="flex justify-between mb-3">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl overflow-hidden`}>
                        {item.animal}
                      </div>
                      <div className="ml-2">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-400 flex items-center gap-1">
                          <span className="mr-1">{formatDate(item.createdAt)}</span>
                          <span className="mx-1">•</span>
                          <span className="mr-1">🎵</span> {item.audio}
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
                    <div className="text-xs flex items-center gap-1">
                      <span className="text-gray-400">Emotion:</span>
                      <span className="text-cyan-300 flex items-center">
                        {(() => {
                          switch(item.emotion) {
                            case 'MELANCHOLY': return <span>😢 {item.emotion}</span>;
                            case 'RAGE': return <span>😡 {item.emotion}</span>;
                            case 'TRANQUILITY': return <span>😌 {item.emotion}</span>;
                            case 'CHAOS': return <span>🤯 {item.emotion}</span>;
                            case 'CUSTOM': return <span>✨ {item.emotion}</span>;
                            default: return <span>{item.emotion}</span>;
                          }
                        })()}
                      </span>
                    </div>
                    
                    {item.cid ? (
                      <a 
                        href={`https://gateway.lighthouse.storage/ipfs/${item.cid}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1"
                      >
                        View on IPFS <span>→</span>
                      </a>
                    ) : (
                      <Link 
                        href={`/details/${item.id}`} 
                        className="text-xs text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1"
                      >
                        View Details <span>→</span>
                      </Link>
                    )}
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
        )}
        
        {/* Link to create new NFT */}
        <div className="mt-12 flex justify-center">
          <Link 
            href="/upload" 
            className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-[0_0_10px_rgba(0,255,255,0.5)] transition-all hover:shadow-[0_0_15px_rgba(0,255,255,0.7)] hover:scale-105 flex items-center gap-2"
          >
            <span>Create New NFT</span>
            <span className="text-lg">✨</span>
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
