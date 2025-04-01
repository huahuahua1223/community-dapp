'use client'

import Image from 'next/image'

export default function PricingBanner() {
  return (
    <div className="relative w-full rounded-[20px] md:rounded-3xl overflow-hidden">
      <Image
        src="/pricing/NFT mobile.png"
        alt="GET YOUR COMMUNITY NFT"
        width={400}
        height={200}
        className="w-full object-cover rounded-[20px] md:rounded-3xl md:hidden"
      />
      <div className="hidden md:block relative rounded-3xl overflow-hidden">
        <div className="relative h-[360px] lg:h-[380px] xl:h-[400px] 2xl:h-[420px]">
          <Image
            src="/pricing/NFT desktop.png"
            alt="GET YOUR COMMUNITY NFT"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
} 