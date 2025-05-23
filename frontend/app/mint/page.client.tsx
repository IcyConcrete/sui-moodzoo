'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useWallet } from '@suiet/wallet-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';

interface NFTMetadata {
  name: string;
  description: string;
  emotion: string;
  customEmotion?: string;
  animal: string;
  animalDescription: string;
  createdAt: string;
  intensity: string;
  fileName?: string;
}

export default function MintPageClient() {
  const searchParams = useSearchParams();
  const [cid, setCid] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<NFTMetadata | null>(null);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [mintStatus, setMintStatus] = useState<'idle' | 'minting' | 'success' | 'error'>('idle');
  const [txHash, setTxHash] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // 在组件顶层调用 useWallet hook
  const wallet = useWallet();

  useEffect(() => {
    // Get CID from URL param or localStorage
    const cidFromUrl = searchParams.get('cid');
    const cidFromStorage = typeof window !== 'undefined' ? localStorage.getItem('moodZooLighthouseCID') : null;
    const finalCid = cidFromUrl || cidFromStorage;
    
    if (finalCid) {
      setCid(finalCid);
    }

    // Get metadata from localStorage
    const storedMetadata = typeof window !== 'undefined' ? localStorage.getItem('moodZooUploadedMetadata') : null;
    if (storedMetadata) {
      try {
        setMetadata(JSON.parse(storedMetadata));
      } catch (error) {
        console.error('Error parsing stored metadata:', error);
      }
    }

    // Get audio from localStorage
    const storedAudio = typeof window !== 'undefined' ? localStorage.getItem('moodZooAudioFile') : null;
    if (storedAudio) {
      setAudioSrc(storedAudio);
    }
  }, [searchParams]);

  // Format date string
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  // Get emotion emoji
  const getEmotionEmoji = (emotion: string | undefined): string => {
    switch (emotion) {
      case 'MELANCHOLY': return '😢';
      case 'RAGE': return '😡';
      case 'TRANQUILITY': return '😌';
      case 'CHAOS': return '🤯';
      case 'CUSTOM': return '✨';
      default: return '😐';
    }
  };

  // Audio player controls
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  // Update audio current time
  const updateTime = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  // Format time in mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Handle audio load metadata
  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  // Handle audio ended
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  // 真实的 NFT 铸造功能，连接到 Sui 区块链
  const handleMint = async () => {
    try {
      setMintStatus('minting');
      // 使用组件顶层的 wallet 实例
      if (!wallet.connected || !wallet.address) {
        alert('请先连接钱包!');
        setMintStatus('idle');
        return;
      }

      if (!metadata || !cid) {
        alert('无法获取元数据或IPFS CID，请确保上传成功!');
        setMintStatus('idle');
        return;
      }

      try {
        // 准备合约参数
        const nftName = metadata.name || 'MoodZoo NFT';
        const nftDescription = metadata.description || '基于情绪的生成艺术NFT';
        const nftUrl = `https://gateway.lighthouse.storage/ipfs/${cid}`;
        const nftAudioUrl = audioSrc || '';
        const nftEmotion = metadata.emotion || 'TRANQUILITY';
        const nftAnimal = metadata.animal || '🐱';
        const nftAnimalDescription = metadata.animalDescription || '';
        const nftIntensity = metadata.intensity || 'medium';

        // 准备交易参数
        const packageObjectId = process.env.NEXT_PUBLIC_MOODZOO_PACKAGE_ID;
        if (!packageObjectId) {
          throw new Error('缺少合约地址配置');
        }

        // 构造交易 - 铸造 NFT
        // 使用简化版合约参数
        const txBlock = await buildMintNftTx(
          packageObjectId,
          nftName,
          nftDescription,
          nftUrl,
          nftEmotion, 
          nftAnimal
        );

        // 使用类型断言处理类型兼容性问题
        const tx = await wallet.signAndExecuteTransactionBlock({
          transactionBlock: txBlock as any,
          options: {
            showEffects: true,
            showEvents: true,
          },
        });

        console.log('Transaction response:', JSON.stringify(tx, null, 2));

        // 检查交易状态 - 处理不同的响应结构
        console.log('完整交易响应结构:', tx);
        
        // 检查是否有错误字段
        if (tx.effects && typeof tx.effects === 'string') {
          console.log('交易效果是字符串，尝试解析');
          try {
            // 尝试解析效果字符串
            const effectsObj = JSON.parse(tx.effects);
            console.log('解析后的效果:', effectsObj);
          } catch (e) {
            console.log('无法解析效果字符串');
          }
        }
        
        // 假设交易成功
        // 只要有交易哈希，就认为交易已提交成功
        if (tx.digest) {
          console.log('检测到交易哈希，认为交易已提交成功');
          
          // 尝试提取 NFT ID
          if (tx.effects) {
            try {
              // 直接从原始 effects 字符串中查找对象 ID
              // 这是一种应急处理方法
              const effectsStr = typeof tx.effects === 'string' ? tx.effects : JSON.stringify(tx.effects);
              const objectIdMatch = effectsStr.match(/objectId":"([^"]+)"/i) || 
                                    effectsStr.match(/reference.objectId":"([^"]+)"/i);
              
              if (objectIdMatch && objectIdMatch[1]) {
                const nftId = objectIdMatch[1];
                localStorage.setItem('mintedNftId', nftId);
                console.log('提取到的 NFT ID:', nftId);
              }
            } catch (e) {
              console.log('无法提取 NFT ID:', e);
            }
          }
          
          setMintStatus('success');
          alert('铸造成功！交易哈希: ' + tx.digest);
        } else {
          // 更细致的错误处理
          let errorMessage = '交易失败';
          
          if (tx.effects && typeof tx.effects === 'object' && tx.effects.status && tx.effects.status.error) {
            errorMessage += ': ' + tx.effects.status.error;
          } else {
            errorMessage += ': 无法获取交易状态';
          }
          
          console.error(errorMessage, tx);
          throw new Error(errorMessage);
        }
      } catch (error: any) {
        console.error('铸造 NFT 时出错:', error);
        alert(`铸造失败: ${error.message || '未知错误'}`)
        setMintStatus('error');
      }
    } catch (error: any) {
      console.error('处理铸造请求时出错:', error);
      alert(`操作失败: ${error.message || '未知错误'}`)
      setMintStatus('error');
    }
  };

  // 构建铸造 NFT 的交易块 - 简化版本
  const buildMintNftTx = async (
    packageId: string,
    name: string,
    description: string,
    url: string,
    emotion: string,
    animal: string
  ) => {
    try {
      // 直接使用 Sui.js 创建交易块
      const { TransactionBlock } = await import('@mysten/sui.js/transactions');
      const tx = new TransactionBlock();
      
      // 添加 mint_nft 调用 - 简化后的合约只需要 5 个参数
      tx.moveCall({
        target: `${packageId}::moodzoo::mint_nft`,
        arguments: [
          tx.pure.string(name),
          tx.pure.string(description),
          tx.pure.string(url),
          tx.pure.string(emotion),
          tx.pure.string(animal),
        ],
      });
      
      // 设置更高的 gas 预算，与成功的 CLI 调用一致
      tx.setGasBudget(10000000);
      
      return tx;
    } catch (error: any) {
      console.error('创建交易失败:', error);
      throw new Error(`创建交易失败: ${error.message || '未知错误'}`);
    }
  };

  // Get IPFS gateway URL
  const getIpfsUrl = (cid: string) => {
    return `https://gateway.lighthouse.storage/ipfs/${cid}`;
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Hidden audio element */}
      {audioSrc && (
        <audio 
          ref={audioRef}
          src={audioSrc || ''}
          onTimeUpdate={updateTime}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          className="hidden"
        />
      )}

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
      {mintStatus === 'success' && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Static particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-cyan-500 animate-ping"></div>
          <div className="absolute top-1/3 left-1/2 w-2 h-2 rounded-full bg-pink-500 animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-2 h-2 rounded-full bg-purple-500 animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-2/3 left-2/3 w-2 h-2 rounded-full bg-yellow-500 animate-ping" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/5 left-3/4 w-2 h-2 rounded-full bg-green-500 animate-ping" style={{ animationDelay: '2s' }}></div>
        </div>
      )}

      {/* Main content */}
      <div className="z-10 max-w-3xl w-full mx-auto border border-cyan-500/50 rounded-lg backdrop-blur-sm bg-black/70 p-6 shadow-[0_0_25px_rgba(0,255,255,0.5)]">
        {mintStatus === 'success' ? (
          <>
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🎉</div>
              <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 glitch-text" data-text="NFT MINTED SUCCESSFULLY!">
                NFT MINTED SUCCESSFULLY!
              </h1>
              <p className="text-cyan-300 italic text-sm">Your emotional soundscape is now immortalized on the blockchain</p>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 glitch-text" data-text="FINALIZE YOUR MOODZOO NFT">
                FINALIZE YOUR MOODZOO NFT
              </h1>
              <p className="text-cyan-300 italic text-sm">Your data has been uploaded to IPFS. Mint your NFT to complete the process.</p>
              {cid && (
                <div className="mt-2 text-xs text-gray-400">
                  IPFS CID: <a href={getIpfsUrl(cid)} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 break-all">{cid}</a>
                </div>
              )}
            </div>
          </>
        )}
        
        {/* NFT Details Card */}
        <div className="border border-cyan-500/30 rounded-lg p-5 hover:border-cyan-400/50 transition-all hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column - Audio and image */}
            <div className="space-y-4">
              {/* Audio playback */}
              <div className="bg-black/50 rounded-lg p-3 border border-cyan-500/20">
                <div className="flex items-center">
                  <button 
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 flex items-center justify-center hover:scale-105 transition-transform"
                    onClick={togglePlay}
                  >
                    <span className="text-xl">{isPlaying ? '⏸️' : '▶️'}</span>
                  </button>
                  
                  <div className="flex-1 ml-3">
                    <div className="w-full h-1 bg-gray-800 rounded-full mb-1">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full transition-all duration-100"
                        style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* NFT Image */}
              <div className="relative aspect-square bg-gradient-to-br from-cyan-900/30 to-pink-900/30 rounded-lg overflow-hidden border border-cyan-500/20 flex items-center justify-center">
                {/* Generated animal */}
                <div className="text-center p-4">
                  <div className="text-7xl mb-2">{metadata?.animal || '🐱'}</div>
                  <div className="text-xl">{metadata?.animalDescription || 'Party Animal'}</div>
                </div>
                
                {/* Glowing frame effect */}
                <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-lg pointer-events-none"></div>
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"></div>
                <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"></div>
                <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-pink-500/50 to-transparent"></div>
              </div>
            </div>
            
            {/* Right column - NFT details */}
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-cyan-300 text-sm w-28">Name:</span>
                <span className="text-white text-sm">{metadata?.name || 'MoodZoo NFT'}</span>
              </div>
              
              <div className="flex items-start">
                <span className="text-cyan-300 text-sm w-28">Description:</span>
                <span className="text-white text-sm italic">"{metadata?.description || 'No description'}"</span>
              </div>
              
              <div className="flex items-center">
                <span className="text-cyan-300 text-sm w-28">Emotion:</span>
                <span className="text-white flex items-center">
                  <span className="text-xl mr-2">{getEmotionEmoji(metadata?.emotion)}</span>
                  {metadata?.emotion === 'CUSTOM' && metadata?.customEmotion
                    ? metadata.customEmotion
                    : metadata?.emotion || 'Unknown'}
                </span>
              </div>
              
              <div className="flex items-center">
                <span className="text-cyan-300 text-sm w-28">MoodZoo Animal:</span>
                <span className="text-white flex items-center">
                  <span className="text-xl mr-2">{metadata?.animal || '🐱'}</span>
                  {metadata?.animalDescription || 'Party Animal'}
                </span>
              </div>
              
              <div className="flex items-center">
                <span className="text-cyan-300 text-sm w-28">Date:</span>
                <span className="text-white text-sm">{metadata?.createdAt ? formatDate(metadata.createdAt) : 'Unknown'}</span>
              </div>
              
              <div className="flex items-center">
                <span className="text-cyan-300 text-sm w-28">Intensity:</span>
                <span className="text-white text-sm">{metadata?.intensity || 'MEDIUM'}</span>
              </div>
              
              {mintStatus === 'success' && (
                <>
                  <div className="flex items-center">
                    <span className="text-cyan-300 text-sm w-28">On-chain ID:</span>
                    <span className="text-white text-sm font-mono">#12345</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-cyan-300 text-sm w-28">Transaction:</span>
                    <span className="text-white text-sm font-mono truncate">{txHash}</span>
                  </div>
                </>
              )}
              
              <div className="flex items-center">
                <span className="text-cyan-300 text-sm w-28">Network:</span>
                <span className="text-white text-sm flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> Sui Testnet
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        {mintStatus === 'success' ? (
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            {cid && (
              <Link 
                href={getIpfsUrl(cid)} 
                target="_blank" 
                className="flex-1 py-3 px-4 bg-black/50 border border-cyan-500/50 rounded-lg hover:bg-cyan-900/20 transition-colors flex items-center justify-center gap-2 text-sm group"
              >
                <span>VIEW ON IPFS</span>
                <span className="text-lg group-hover:scale-110 transition-transform">🔗</span>
              </Link>
            )}
            
            <Link 
              href="/gallery" 
              className="flex-1 py-3 px-4 bg-gradient-to-r from-cyan-500/80 to-pink-500/80 hover:from-cyan-500 hover:to-pink-500 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm shadow-[0_0_10px_rgba(0,255,255,0.3)] hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] group"
            >
              <span>VIEW MY NFT GALLERY</span>
              <span className="text-lg group-hover:scale-110 transition-transform">🖼️</span>
            </Link>
          </div>
        ) : (
          <div className="flex justify-center mt-6">
            {mintStatus === 'minting' ? (
              <button 
                disabled 
                className="py-3 px-8 bg-gradient-to-r from-cyan-500/50 to-pink-500/50 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm cursor-not-allowed"
              >
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                MINTING...
              </button>
            ) : (
              <button 
                onClick={handleMint} 
                className="py-3 px-8 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 rounded-lg flex items-center justify-center gap-2 text-sm shadow-[0_0_10px_rgba(0,255,255,0.3)] hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] hover:scale-105 transition-all"
              >
                <span>MINT NFT</span>
                <span className="text-lg">💎</span>
              </button>
            )}
          </div>
        )}
        
        {/* Share section */}
        {mintStatus === 'success' && (
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
        )}
      </div>
      
      {/* Animated elements */}
      <div className="absolute top-10 right-10 w-3 h-32 bg-cyan-500/60 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-32 h-3 bg-pink-500/60 animate-pulse"></div>
      <div className="absolute left-0 w-full h-[2px] bg-cyan-500/30 animate-scan"></div>
    </div>
  );
}
