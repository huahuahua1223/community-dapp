'use client'

import Image from 'next/image'

interface PricingOption {
  id: string;
  title: string;
  highlightedText: string;
  regularText: string;
  imageSrc: string;
}

interface PricingOptionsProps {
  options: PricingOption[];
  onGetIt: (optionId: string) => void;
}

export default function PricingOptions({ options, onGetIt }: PricingOptionsProps) {
  return (
    <div className="space-y-3 mb-3 md:mb-0 md:max-w-full md:mx-auto md:p-0 md:flex md:flex-col md:justify-between">
      {options.map((option) => (
        <div 
          key={option.id}
          className="bg-black rounded-[20px] md:rounded-3xl overflow-hidden p-4 md:p-6 h-[160px] md:h-[120px] lg:h-[130px] relative hover:bg-gray-900 transition-colors cursor-pointer text-white"
          onClick={() => onGetIt(option.id)}
        >
          {/* 移动端布局 */}
          <div className="md:hidden">
            {/* 图片 */}
            <div className="w-28 h-28 relative">
              <Image
                src={option.imageSrc}
                alt={option.title}
                width={112}
                height={112}
                className="object-contain"
              />
            </div>
            
            {/* 文字区域 */}
            <div className="absolute bottom-4 left-4 max-w-[60%]">
              <h3 className="text-3xl font-bold whitespace-nowrap">
                {option.id === 'free' ? (
                  <>
                    <span className="text-[#FFFC26]">{option.highlightedText}</span>
                    <span className="text-white"> {option.regularText}</span>
                  </>
                ) : (
                  <>
                    <span className="text-white">{option.regularText} </span>
                    <span className="text-[#FFFC26]">{option.highlightedText}</span>
                  </>
                )}
              </h3>
            </div>
            
            {/* 按钮 */}
            <div className="absolute right-6 top-6">
              <button 
                className="bg-[#FFFC26] text-black font-bold py-3 px-8 rounded-full hover:bg-yellow-300 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onGetIt(option.id);
                }}
              >
                GET IT
              </button>
            </div>
          </div>
          
          {/* 桌面端布局 */}
          <div className="hidden md:flex md:flex-row md:items-center md:h-full">
            {/* 左侧图片 */}
            <div className="w-38 h-24 relative flex-shrink-0">
              <Image
                src={option.imageSrc}
                alt={option.title}
                width={130}
                height={108}
                className="object-contain"
              />
            </div>
            
            {/* 右侧内容区 - 文字在上，按钮在下 */}
            <div className="flex flex-col justify-center ml-6 flex-grow">
              {/* 文字区域 */}
              <h3 className="text-2xl font-bold whitespace-nowrap mb-3">
                {option.id === 'free' ? (
                  <>
                    <span className="text-[#FFFC26]">{option.highlightedText}</span>
                    <span className="text-white"> {option.regularText}</span>
                  </>
                ) : (
                  <>
                    <span className="text-white">{option.regularText} </span>
                    <span className="text-[#FFFC26]">{option.highlightedText}</span>
                  </>
                )}
              </h3>
              
              {/* 按钮 */}
              <button 
                className="bg-[#FFFC26] text-black font-bold py-2 px-20 rounded-full hover:bg-yellow-300 transition-colors w-max"
                onClick={(e) => {
                  e.stopPropagation();
                  onGetIt(option.id);
                }}
              >
                GET IT
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 