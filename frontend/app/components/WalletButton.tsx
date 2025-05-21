'use client';

import { ConnectButton, useWallet } from '@suiet/wallet-kit';
import { useEffect, useState } from 'react';
import { ReactNode } from 'react';

export default function WalletButton() {
  const { connected, connecting, address, disconnect } = useWallet();
  const [displayAddress, setDisplayAddress] = useState<string>('');

  useEffect(() => {
    if (address) {
      // Truncate the address for display (first 6 chars + ... + last 4 chars)
      setDisplayAddress(`${address.slice(0, 6)}...${address.slice(-4)}`);
    }
  }, [address]);

  return (
    <div>
      {connecting ? (
        <button className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-900/30 font-medium py-3 px-8 rounded-full transition-all hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] text-xl">
          Connecting...
        </button>
      ) : connected ? (
        <div className="flex items-center gap-2">
          <div className="border-2 border-cyan-500 text-cyan-400 bg-cyan-900/20 font-medium py-3 px-8 rounded-full transition-all text-xl">
            {displayAddress}
          </div>
          <button 
            onClick={() => disconnect()}
            className="border-2 border-red-500 text-red-400 hover:bg-red-900/30 font-medium py-3 px-6 rounded-full transition-all hover:shadow-[0_0_15px_rgba(255,0,0,0.5)] text-xl"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <ConnectButton className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-900/30 font-medium py-3 px-8 rounded-full transition-all hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] text-xl">
          Connect Wallet
        </ConnectButton>
      )}
    </div>
  );
}
