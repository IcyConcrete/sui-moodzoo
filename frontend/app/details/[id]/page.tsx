import NFTDetailPageClient from './page.client';

export default function Page({params}: {params: { id: string }}) {
  const { id } = params;
  
  return <NFTDetailPageClient id={id} />;
}
