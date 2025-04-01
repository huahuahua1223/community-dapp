'use client'

import Image from 'next/image'
import { useState } from 'react'

interface NFTItem {
  id: number;
  price: string;
  name: string;
  address: string;
  likes: number;
  image?: string;
}

export default function NFTWall() {
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [isHovered4, setIsHovered4] = useState(false);
  const [isHovered5, setIsHovered5] = useState(false);

  // 示例NFT数据
  const nfts: NFTItem[] = [
    {
      id: 1,
      price: "27.56",
      name: "Courtyard",
      address: "0xbb4..d387",
      likes: 999
    },
    {
      id: 2,
      price: "27.56",
      name: "Courtyard",
      address: "0xbb4..d387",
      likes: 999
    },
    {
      id: 3,
      price: "27.56",
      name: "Courtyard",
      address: "0xbb4..d387",
      likes: 999
    },
    {
      id: 4,
      price: "27.56",
      name: "Courtyard",
      address: "0xbb4..d387",
      likes: 999
    }
  ];
  
  return (
    <div>
      <div className="bg-black md:rounded-none">
        <div className="max-w-7xl mx-auto px-3 md:px-6 lg:px-8">
          <div className="text-white p-4 md:p-6 rounded-t-2xl md:rounded-none">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black">MEMEBERS NFT WALL</h2>
              <div className="bg-[#FFFC26] rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
                <Image
                  src="/landingpage/activites/solar_list-bold-duotone.png"
                  alt="列表"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black md:rounded-none">
        {/* <div className="max-w-7xl mx-auto px-3 md:px-6 lg:px-8"> */}
        <div className="p-4 md:p-6 rounded-b-2xl md:rounded-none">
          {/* 移动端双列滚动区域 */}
          <div className="flex gap-3 h-[500px] md:hidden">
            {/* 左列 - 向下滚动 */}
            <div
              className="flex-1 overflow-hidden relative"
              onMouseEnter={() => setIsHovered1(true)}
              onMouseLeave={() => setIsHovered1(false)}
            >
              <div
                className="space-y-3 animate-scroll-down"
                style={{
                  animationPlayState: isHovered1 ? "paused" : "running"
                }}
              >
                {[...nfts, ...nfts, ...nfts].map((nft, index) => (
                  <NFTCard
                    key={`nft-left-${nft.id}-${index}`}
                    nft={nft}
                  />
                ))}
              </div>
            </div>

            {/* 右列 - 向上滚动 */}
            <div
              className="flex-1 overflow-hidden relative"
              onMouseEnter={() => setIsHovered2(true)}
              onMouseLeave={() => setIsHovered2(false)}
            >
              <div
                className="space-y-3 animate-scroll-up"
                style={{
                  animationPlayState: isHovered2 ? "paused" : "running"
                }}
              >
                {[...nfts, ...nfts, ...nfts].map((nft, index) => (
                  <NFTCard
                    key={`nft-right-${nft.id}-${index}`}
                    nft={nft}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 桌面端五列滚动区域 */}
          <div className="hidden md:flex gap-3 md:gap-4 lg:gap-5 h-[600px] lg:h-[700px]">
            {/* 第一列 - 向下滚动 */}
            <div
              className="flex-1 overflow-hidden relative"
              onMouseEnter={() => setIsHovered1(true)}
              onMouseLeave={() => setIsHovered1(false)}
            >
              <div
                className="space-y-4 animate-scroll-down"
                style={{
                  animationPlayState: isHovered1 ? "paused" : "running",
                  animationDuration: "30s"
                }}
              >
                {[...nfts, ...nfts, ...nfts].map((nft, index) => (
                  <NFTCard
                    key={`nft-col1-${nft.id}-${index}`}
                    nft={nft}
                  />
                ))}
              </div>
            </div>

            {/* 第二列 - 向上滚动 */}
            <div
              className="flex-1 overflow-hidden relative"
              onMouseEnter={() => setIsHovered2(true)}
              onMouseLeave={() => setIsHovered2(false)}
            >
              <div
                className="space-y-4 animate-scroll-up"
                style={{
                  animationPlayState: isHovered2 ? "paused" : "running",
                  animationDuration: "35s"
                }}
              >
                {[...nfts, ...nfts, ...nfts].map((nft, index) => (
                  <NFTCard
                    key={`nft-col2-${nft.id}-${index}`}
                    nft={nft}
                  />
                ))}
              </div>
            </div>

            {/* 第三列 - 向下滚动 */}
            <div
              className="flex-1 overflow-hidden relative"
              onMouseEnter={() => setIsHovered3(true)}
              onMouseLeave={() => setIsHovered3(false)}
            >
              <div
                className="space-y-4 animate-scroll-down"
                style={{
                  animationPlayState: isHovered3 ? "paused" : "running",
                  animationDuration: "28s"
                }}
              >
                {[...nfts, ...nfts, ...nfts].map((nft, index) => (
                  <NFTCard
                    key={`nft-col3-${nft.id}-${index}`}
                    nft={nft}
                  />
                ))}
              </div>
            </div>

            {/* 第四列 - 向上滚动 */}
            <div
              className="flex-1 overflow-hidden relative"
              onMouseEnter={() => setIsHovered4(true)}
              onMouseLeave={() => setIsHovered4(false)}
            >
              <div
                className="space-y-4 animate-scroll-up"
                style={{
                  animationPlayState: isHovered4 ? "paused" : "running",
                  animationDuration: "33s"
                }}
              >
                {[...nfts, ...nfts, ...nfts].map((nft, index) => (
                  <NFTCard
                    key={`nft-col4-${nft.id}-${index}`}
                    nft={nft}
                  />
                ))}
              </div>
            </div>

            {/* 第五列 - 向下滚动 */}
            <div
              className="flex-1 overflow-hidden relative"
              onMouseEnter={() => setIsHovered5(true)}
              onMouseLeave={() => setIsHovered5(false)}
            >
              <div
                className="space-y-4 animate-scroll-down"
                style={{
                  animationPlayState: isHovered5 ? "paused" : "running",
                  animationDuration: "31s"
                }}
              >
                {[...nfts, ...nfts, ...nfts].map((nft, index) => (
                  <NFTCard
                    key={`nft-col5-${nft.id}-${index}`}
                    nft={nft}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>

      {/* 底部说明文字 */}
      <div className="mt-6 md:mt-8 bg-white rounded-3xl p-6 md:p-8 pb-4 md:pb-6 text-center relative">
        {/* 移动端布局 */}
        <div className="md:hidden">
          <p className="text-sm leading-relaxed font-bold mb-16">
            Co-learning, co-creating,
            <br />
            and co-exhibiting
            <br />
            emphasize collaboration in learning,
            <br />
            creating, and showcasing.
            <br />
            Together,
            <br />
            they form a cycle that fosters innovation,
            <br />
            reflection, and sustainable practices.
          </p>
          <div className="absolute bottom-6 right-4 translate-y-1/3">
            <Image
              src="/landingpage/mascot.png"
              alt="Mascot"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>
        </div>

        {/* 桌面端布局 - mascot 插入到文字中间，两行文字格式 */}
        <div className="hidden md:block relative">
          <div className="flex flex-col items-center">
            {/* 大屏幕布局 - 水平排列 */}
            <div className="hidden lg:flex flex-row items-center justify-center text-lg font-bold py-2">
              <div className="text-right pr-4 max-w-max">
                <p>Co-learning, co-creating, and co-exhibiting</p>
                <p>Together, they form a cycle that fosters</p>
              </div>

              <div className="flex-shrink-0 mx-2">
                <div className="relative" style={{ top: '30px' }}>
                  <Image
                    src="/landingpage/mascot.png"
                    alt="Mascot"
                    width={240}
                    height={240}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              <div className="text-left pl-4 max-w-max">
                <p>emphasize collaboration in learning, creating, and showcasing.</p>
                <p>innovation, reflection, and sustainable practices.</p>
              </div>
            </div>

            {/* 中等屏幕布局 - 水平排列但更紧凑 */}
            <div className="flex lg:hidden flex-row items-center justify-center text-base font-bold">
              <div className="text-right pr-2 max-w-max">
                <p>Co-learning, co-creating, and co-exhibiting</p>
                <p>Together, they form a cycle that fosters</p>
              </div>

              <div className="flex-shrink-0 mx-1">
                <div className="relative" style={{ top: '25px' }}>
                  <Image
                    src="/landingpage/mascot.png"
                    alt="Mascot"
                    width={180}
                    height={180}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              <div className="text-left pl-2 max-w-max">
                <p>emphasize collaboration in learning, creating, and showcasing.</p>
                <p>innovation, reflection, and sustainable practices.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface NFTCardProps {
  nft: NFTItem;
}

function NFTCard({ nft }: NFTCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* NFT图片 */}
      <div className="relative aspect-square bg-white">
        <Image 
          src="/landingpage/star1.png"
          alt={`NFT ${nft.id}`}
          fill
          className="object-cover"
        />
      </div>
      
      {/* NFT信息 */}
      <div className="p-3 md:p-4 space-y-2 md:space-y-3">
        <div className="flex items-start gap-2">
          <Image 
            src="/landingpage/members/ethereum.png"
            alt="ETH"
            width={16}
            height={16}
            className="mt-1 md:w-[18px] md:h-[18px]"
          />
          <div className="flex flex-col">
            <span className="font-bold text-sm md:text-base">{nft.price}<sup>ETH</sup></span>
            <span className="text-xs md:text-sm text-gray-500">Recent Prices</span>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 md:w-7 md:h-7 bg-gray-200 rounded-full mt-0.5"></div>
          <div className="flex flex-col">
            <span className="text-sm md:text-base">{nft.name}</span>
            <div className="flex items-center gap-1">
              <span className="text-xs md:text-sm text-gray-500">{nft.address}</span>
              <Image 
                src="/landingpage/members/tabler_copy.png"
                alt="Copy"
                width={12}
                height={12}
                className="cursor-pointer md:w-[14px] md:h-[14px]"
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center bg-[#FFFC26] rounded-full py-1 md:py-1.5">
          <Image 
            src="/landingpage/members/like.png"
            alt="likes"
            width={16}
            height={16}
            className="mr-1 md:w-[18px] md:h-[18px]"
          />
          <span className="text-sm md:text-base font-medium">{nft.likes}</span>
        </div>
      </div>
    </div>
  );
} 