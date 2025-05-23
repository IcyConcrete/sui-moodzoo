// Simplest possible implementation for Next.js app router dynamic route
import NFTDetailPageClient from './page.client';

export default function Page(props: any) {
  return <NFTDetailPageClient id={props.params.id} />;
}
