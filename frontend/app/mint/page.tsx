import { Suspense } from 'react';
import MintPageClient from './page.client';

// Wrap client component in Suspense to handle useSearchParams()
export default function Page() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-cyan-400">Loading...</div>}>
      <MintPageClient />
    </Suspense>
  );
}
