'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface NFTDetail {
  id: string | number;
  animal: string;
  name: string;
  description: string;
  likes: number;
  emotion: string;
  emotionEmoji: string;
  audio: string;
  color: string;
  mintedDate: string;
  onChainId: string;
  ipfsLink: string;
  owner: string;
  rarity?: string;
  price?: string;
}

export default function NFTDetailPageClient({id}: {id: string}) {
  const router = useRouter();
  const [nftDetail, setNftDetail] = useState<NFTDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to get the NFT data from localStorage
    try {
      const storedNFT = localStorage.getItem('selectedDegenNFT');
      
      if (storedNFT) {
        const parsedNFT = JSON.parse(storedNFT);
        
        // Check if the ID matches
        if (parsedNFT.id.toString() === id) {
          setNftDetail(parsedNFT);
          setLoading(false);
          return;
        }
      }
      
      // If we don't have the data in localStorage or the ID doesn't match,
      // We'll use some default data based on the ID
      setNftDetail({
        id: id,
        animal: '🐕‍🦺',
        name: 'Cool Dog with shades',
        description: 'Feeling super bright and sunny!',
        likes: 15,
        emotion: 'TRANQUILITY',
        emotionEmoji: '😌',
        audio: '0:47',
        color: 'from-yellow-500/80 to-orange-500/80',
        mintedDate: '2025-05-18 14:30',
        onChainId: `#${id}5678`,
        ipfsLink: 'https://ipfs.io/ipfs/QmXyZ...',
        owner: '0x71C7...F3a2',
        rarity: 'Uncommon',
        price: '0.1 ETH'
      });
      
    } catch (error) {
      console.error('Error loading NFT details:', error);
      // Fallback data
      setNftDetail({
        id: id,
        animal: '🐕‍🦺',
        name: 'Cool Dog with shades',
        description: 'Feeling super bright and sunny!',
        likes: 15,
        emotion: 'TRANQUILITY',
        emotionEmoji: '😌',
        audio: '0:47',
        color: 'from-yellow-500/80 to-orange-500/80',
        mintedDate: '2025-05-18 14:30',
        onChainId: `#${id}5678`,
        ipfsLink: 'https://ipfs.io/ipfs/QmXyZ...',
        owner: '0x71C7...F3a2',
        rarity: 'Uncommon',
        price: '0.1 ETH'
      });
    } finally {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-900/30 to-black/90"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat opacity-30"></div>
          <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-pink-500/20 blur-3xl"></div>
        </div>
        <div className="z-10 flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
            Loading NFT details...
          </div>
        </div>
      </div>
    );
  }

  if (!nftDetail) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-900/30 to-black/90"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat opacity-30"></div>
          <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-pink-500/20 blur-3xl"></div>
        </div>
        <div className="z-10 flex flex-col items-center max-w-md text-center p-8 backdrop-blur-sm bg-black/70 border border-cyan-500/30 rounded-lg">
          <div className="text-5xl mb-4">😢</div>
          <div className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 mb-2">
            NFT Not Found
          </div>
          <p className="text-gray-400 mb-6">We couldn't find the NFT you're looking for.</p>
          <Link href="/gallery" className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-cyan-600 hover:to-pink-600 transition-colors">
            Return to Gallery
          </Link>
        </div>
      </div>
    );
  }

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
      <div className="z-10 max-w-4xl w-full mx-auto">
        {/* Back to Gallery link */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/gallery" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors group">
            <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back to Gallery</span>
          </Link>
          
          <Link href="/degen" className="inline-flex items-center text-pink-400 hover:text-pink-300 transition-colors group">
            <span>View Degen Zone</span>
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
        
        {/* NFT Detail Card */}
        <div className="border border-cyan-500/50 rounded-lg backdrop-blur-sm bg-black/70 p-6 shadow-[0_0_25px_rgba(0,255,255,0.3)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - NFT Visual and Audio */}
            <div className="space-y-6">
              {/* NFT Visual */}
              <div className="relative aspect-square rounded-lg overflow-hidden border border-cyan-500/30 bg-gradient-to-br from-black/70 to-black/90 group">
                {/* Gradient top border */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${nftDetail.color}`}></div>
                
                {/* NFT Image/Emoji */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-9xl group-hover:scale-110 transition-transform duration-500">
                    {nftDetail.animal}
                  </div>
                </div>
                
                {/* Glowing frame effect */}
                <div className="absolute inset-0 border border-cyan-500/20 rounded-lg pointer-events-none"></div>
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"></div>
                <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"></div>
                <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-pink-500/50 to-transparent"></div>
              </div>
              
              {/* Audio Player */}
              <div className="bg-black/50 rounded-lg p-4 border border-cyan-500/30">
                <div className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 mb-3">
                  Audio Playback
                </div>
                <div className="bg-black/60 rounded-full h-12 flex items-center p-2 border border-cyan-500/20">
                  <button className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 flex items-center justify-center text-sm shadow-[0_0_10px_rgba(0,255,255,0.3)]">
                    <span>▶</span>
                  </button>
                  
                  <div className="flex-1 mx-3">
                    <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-cyan-500 to-pink-500 h-full w-0 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-400">
                    {nftDetail.audio}
                  </div>
                </div>
                
                {/* Audio wave visualization */}
                <div className="mt-3 flex justify-around items-end h-12">
                  {[...Array(20)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`bg-gradient-to-t ${nftDetail.color} w-1 rounded-t-sm`} 
                      style={{ 
                        height: `${Math.sin(i * 0.5) * 8 + 10}px`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column - NFT Details and Metadata */}
            <div className="space-y-6">
              {/* NFT Title and Description */}
              <div className="bg-black/50 rounded-lg p-4 border border-cyan-500/30">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
                    {nftDetail.name}
                  </h2>
                  {nftDetail.price && (
                    <div className="text-yellow-400 flex items-center gap-1">
                      <span className="text-sm">💰</span>
                      <span>{nftDetail.price}</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-black/50 border border-pink-500/30 text-sm flex items-center">
                    <span className="mr-1">{nftDetail.emotionEmoji}</span>
                    <span>{nftDetail.emotion}</span>
                  </span>
                  {nftDetail.rarity && (
                    <span className="px-3 py-1 rounded-full bg-black/50 border border-yellow-500/30 text-sm">
                      {nftDetail.rarity}
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full bg-black/50 border border-cyan-500/30 text-sm">
                    ID: {nftDetail.onChainId}
                  </span>
                </div>
                <p className="text-gray-300 italic border-l-2 border-cyan-500/30 pl-4 py-1">
                  "{nftDetail.description}"
                </p>
              </div>
              
              {/* NFT Metadata */}
              <div className="bg-black/50 rounded-lg p-4 border border-cyan-500/30">
                <div className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 mb-3">
                  NFT Details
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-300 text-sm">Animal:</span>
                    <span className="text-white flex items-center">
                      <span className="text-xl mr-2">{nftDetail.animal}</span> {nftDetail.name}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-300 text-sm">Minted on:</span>
                    <span className="text-white text-sm">{nftDetail.mintedDate}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-300 text-sm">On-chain ID:</span>
                    <span className="text-white text-sm font-mono">{nftDetail.onChainId}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-300 text-sm">Owner:</span>
                    <span className="text-white text-sm font-mono">{nftDetail.owner}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-300 text-sm">Likes:</span>
                    <span className="text-white text-sm flex items-center">
                      <span className="text-pink-400 mr-1">❤️</span> {nftDetail.likes}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* IPFS Link */}
              <div className="bg-black/50 rounded-lg p-4 border border-cyan-500/30">
                <div className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 mb-3">
                  Storage
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-cyan-300 text-sm">IPFS Link:</span>
                  <a 
                    href={nftDetail.ipfsLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white text-sm bg-black/70 px-3 py-1.5 rounded-full border border-cyan-500/30 hover:border-cyan-400 transition-colors flex items-center gap-2"
                  >
                    <span>View on IPFS</span>
                    <span>🔗</span>
                  </a>
                </div>
              </div>
              
              {/* Blockchain Explorer Link */}
              <div className="flex justify-center">
                <a 
                  href="#" 
                  className="bg-gradient-to-r from-cyan-500/80 to-pink-500/80 hover:from-cyan-500 hover:to-pink-500 rounded-lg py-2.5 px-5 transition-colors flex items-center justify-center gap-2 text-sm shadow-[0_0_10px_rgba(0,255,255,0.3)] hover:shadow-[0_0_15px_rgba(0,255,255,0.5)]"
                >
                  <span>VIEW ON BLOCKCHAIN</span>
                  <span className="text-lg">🔍</span>
                </a>
              </div>
            </div>
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
