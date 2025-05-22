import React from 'react';
import NFTDetailPageClient from './page.client';


// This is a dynamic route component that will receive the NFT id as a parameter
export default function NFTDetailPage({ params }: { params: { id: string } }) {
  return <NFTDetailPageClient id={params.id} />;
}
