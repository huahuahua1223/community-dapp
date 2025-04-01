'use client'

import Image from 'next/image'

// 捐赠地址
const donationAddress = "0x3f4373c29de186e1ccebfb223fb4350e457cf689b08e60aadbc26e82ddbcd9a5";

// 自动计算地址拆分点，确保地址平均分为两部分
const midPoint = Math.ceil(donationAddress.length / 2);

// 自动分割地址为两部分
const addressFirstPart = donationAddress.substring(0, midPoint);
const addressSecondPart = donationAddress.substring(midPoint);

// 复制捐赠地址到剪贴板
const copyToClipboard = () => {
  navigator.clipboard.writeText(donationAddress)
    .then(() => {
      alert('捐赠地址已复制到剪贴板');
    })
    .catch(err => {
      console.error('复制失败:', err);
    });
};

// 主要的Donate组件，在移动端独立显示
export default function Donate() {
  return (
    <div className="flex justify-center md:hidden w-full">
      <div className="bg-[#FFFC26] rounded-[20px] p-3 md:p-5 lg:p-6 overflow-hidden w-full">
        {/* 标题部分 */}
        <div className="flex items-center mb-4 md:mb-6">
          <Image 
            src="/card-donateus/emoji-moneymouthface.png" 
            alt="Money Face" 
            width={40} 
            height={40} 
            className="mr-3 md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px]"
          />
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#333]">DONATE US</h3>
        </div>
        
        {/* 地址部分 */}
        <div className="bg-[#3A3A00] text-white rounded-full py-3 px-4 md:py-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center flex-1 min-w-0">
            <Image 
              src="/card-donateus/sui.png" 
              alt="Sui" 
              width={28} 
              height={28} 
              className="mr-2 md:mr-3 flex-shrink-0 md:w-[32px] md:h-[32px] lg:w-[36px] lg:h-[36px]"
            />
            <div className="text-xs md:text-sm lg:text-base leading-tight break-all mr-2 md:mr-3 flex-1 min-w-0">
              <div>{addressFirstPart}</div>
              <div>{addressSecondPart}</div>
            </div>
            <button 
              onClick={copyToClipboard}
              className="flex-shrink-0 ml-1 md:ml-2 hover:opacity-80 transition-opacity"
              aria-label="复制地址"
            >
              <Image 
                src="/card-donateus/Copy.png" 
                alt="Copy" 
                width={24} 
                height={24} 
                className="md:w-[28px] md:h-[28px] lg:w-[32px] lg:h-[32px]"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 集成到Footer中的Donate组件
export function DonateInline() {
  return (
    <div className="bg-[#FFFC26] rounded-2xl p-4 overflow-hidden w-full max-w-[360px]">
      {/* 标题部分 */}
      <div className="flex items-center mb-3">
        <Image 
          src="/card-donateus/emoji-moneymouthface.png" 
          alt="Money Face" 
          width={36} 
          height={36} 
          className="mr-2"
        />
        <h3 className="text-xl lg:text-2xl font-bold text-[#333]">DONATE US</h3>
      </div>
      
      {/* 地址部分 */}
      <div className="bg-[#3A3A00] text-white rounded-full py-2 px-3 lg:py-3 lg:px-4 flex items-center justify-between">
        <div className="flex items-center flex-1 min-w-0">
          <Image 
            src="/card-donateus/sui.png" 
            alt="Sui" 
            width={24} 
            height={24} 
            className="mr-2 flex-shrink-0"
          />
          <div className="text-xs leading-tight break-all mr-2 flex-1 min-w-0 truncate">
            {donationAddress}
          </div>
          <button 
            onClick={copyToClipboard}
            className="flex-shrink-0 ml-1 hover:opacity-80 transition-opacity"
            aria-label="复制地址"
          >
            <Image 
              src="/card-donateus/Copy.png" 
              alt="Copy" 
              width={20} 
              height={20} 
            />
          </button>
        </div>
      </div>
    </div>
  );
} 