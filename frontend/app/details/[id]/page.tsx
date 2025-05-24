import NFTDetailPageClient from './page.client';

export default async function Page({params}: {params: Promise<{ id: string }>}) {
  const { id } = await params;
  
  return <NFTDetailPageClient id={id} />;
}
