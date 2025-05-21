import Image from "next/image";
import Link from "next/link";
import WalletButton from "./components/WalletButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Cyberpunk background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-900/30 to-black/90"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat opacity-30"></div>
        
        {/* Larger glow elements */}
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-pink-500/20 blur-3xl"></div>
        
        {/* Additional glow elements */}
        <div className="absolute top-3/4 left-1/4 w-[300px] h-[300px] rounded-full bg-purple-500/15 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-[200px] h-[200px] rounded-full bg-blue-500/15 blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="z-10 max-w-5xl w-full mx-auto border-2 border-cyan-500/50 rounded-lg backdrop-blur-sm bg-black/70 p-10 shadow-[0_0_25px_rgba(0,255,255,0.5)]">
        <div className="text-center mb-12">
          <h1 className="text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 glitch-text" data-text="MoodZoo">MoodZoo</h1>
          <p className="text-2xl text-cyan-300 mb-10">Express Your Emotions Through Sound</p>
          
          <div className="border-t border-b border-cyan-500/30 py-10 my-10">
            <Link href="/upload" className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-bold py-5 px-10 rounded-full mb-10 shadow-[0_0_15px_rgba(0,255,255,0.7)] transition-all hover:shadow-[0_0_25px_rgba(0,255,255,0.9)] flex items-center justify-center gap-3 w-full sm:w-auto mx-auto">
              <span className="text-2xl">🎤 Start Minting Your Mood</span>
            </Link>
          
            <div className="flex flex-col space-y-6 text-left max-w-xl mx-auto">
              <a href="#" className="text-xl text-cyan-300 hover:text-pink-400 transition-colors flex items-center gap-3">
                <span className="text-pink-500 text-2xl">→</span> Explore Mood NFTs
              </a>
              <a href="#" className="text-xl text-cyan-300 hover:text-pink-400 transition-colors flex items-center gap-3">
                <span className="text-pink-500 text-2xl">→</span> What is MoodZoo?
              </a>
            </div>
          </div>
          
          <WalletButton />
        </div>
      </div>

      {/* Animated elements */}
      <div className="absolute top-10 right-10 w-3 h-32 bg-cyan-500/60 animate-pulse"></div>
      <div className="absolute top-10 right-16 w-3 h-24 bg-cyan-500/40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-10 right-22 w-3 h-16 bg-cyan-500/30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="absolute bottom-10 left-10 w-32 h-3 bg-pink-500/60 animate-pulse"></div>
      <div className="absolute bottom-16 left-10 w-24 h-3 bg-pink-500/40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-22 left-10 w-16 h-3 bg-pink-500/30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="absolute top-1/2 left-10 w-5 h-5 rounded-full bg-cyan-500/80 animate-ping"></div>
      <div className="absolute top-1/3 right-20 w-5 h-5 rounded-full bg-pink-500/80 animate-ping" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/3 left-1/4 w-4 h-4 rounded-full bg-purple-500/80 animate-ping" style={{ animationDelay: '1.5s' }}></div>
      
      {/* Horizontal scan line effect */}
      <div className="absolute left-0 w-full h-[2px] bg-cyan-500/30 animate-scan"></div>
    </div>
  );
}
