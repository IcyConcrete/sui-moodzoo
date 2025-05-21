'use client';

import { WalletProvider as SuietWalletProvider } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import { ReactNode } from 'react';

export function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <SuietWalletProvider>
      {children}
    </SuietWalletProvider>
  );
}
