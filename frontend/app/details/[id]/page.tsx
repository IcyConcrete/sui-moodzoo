import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// This is a dynamic route component that will receive the NFT id as a parameter
export default function NFTDetailPage({ params }: { params: { id: string } }) {
  // Mock data for the NFT details - in a real app, this would be fetched based on the id
  const nftDetail = {
    id: params.id,
    animal: '🐕‍🦺',
    name: 'Cool Dog with shades',
    description: 'Feeling super bright and sunny!',
    likes: 15,
    emotion: 'Happy',
    emotionEmoji: '😄',
    audio: '0:47',
    color: 'from-yellow-500/80 to-orange-500/80',
    mintedDate: '2025-05-18 14:30',
    onChainId: '#12345',
    ipfsLink: 'https://ipfs.io/ipfs/QmXyZ...',
    owner: '0x71C7...F3a2'
  };

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
        <Link href="/gallery" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-6 group">
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
          <span>Back to Gallery</span>
        </Link>
        
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
                <div className="flex items-center">
                  <button className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_10px_rgba(0,255,255,0.3)]">
                    <span className="text-2xl">▶️</span>
                  </button>
                  
                  <div className="flex-1 ml-4">
                    <div className="w-full h-1.5 bg-gray-800 rounded-full mb-2">
                      <div className="w-1/3 h-full bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>0:00</span>
                      <span>{nftDetail.audio}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Social Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <button className="flex items-center gap-2 bg-black/50 rounded-full px-4 py-2 border border-pink-500/30 hover:bg-black/70 transition-colors group">
                    <span className="text-pink-400 group-hover:scale-110 transition-transform">❤️</span>
                    <span className="text-sm">{nftDetail.likes} Likes</span>
                  </button>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 bg-black/50 rounded-full px-4 py-2 border border-cyan-500/30 hover:bg-black/70 transition-colors group">
                    <span className="text-cyan-400 group-hover:scale-110 transition-transform">🔁</span>
                    <span className="text-sm">Share</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right Column - NFT Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
                  {nftDetail.name}
                </h1>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-black/50 border border-cyan-500/30 text-sm flex items-center gap-1.5">
                    <span>{nftDetail.emotionEmoji}</span>
                    <span>{nftDetail.emotion}</span>
                  </span>
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
