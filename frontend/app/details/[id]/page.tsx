import NFTDetailPageClient from './page.client';

// 异步页面组件
export default async function Page(props: {
  params: Promise<{ id: string }>;
}) {
  // 获取路由参数
  const { id } = await props.params;
  
  // 这里可以异步获取 NFT 数据
  // 例如: const nftData = await fetchNFTData(id);
  
  // 渲染客户端组件
  return <NFTDetailPageClient id={id} />;
}
