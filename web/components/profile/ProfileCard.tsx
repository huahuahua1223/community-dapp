'use client'

import Image from 'next/image'

interface ProfileCardProps {
  address: string;
  username: string;
  avatarUrl?: string;
  totalCredits?: number;
  growthRate?: number;
  monthlyStats?: number[];
  onEditClick?: () => void;
}

export default function ProfileCard({
  address,
  username,
  avatarUrl = '/profile/avatar.png',
  totalCredits = 12345.67,
  growthRate = 20.1,
  monthlyStats = [20, 40, 30, 25, 35, 40, 45, 35, 40, 45, 50],
  onEditClick
}: ProfileCardProps) {
  
  // 处理地址显示格式
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `0x${address.substring(0, 4)}_${address.substring(address.length - 4)}`;
  };

  return (
    <div className="w-full bg-black md:rounded-3xl p-4 md:p-4 text-white mb-2 rounded-[20px]">
      <h2 className="text-2xl md:text-lg font-bold mb-6 md:mb-2">Profile&Event</h2>
      
      {/* 用户信息区域 */}
      <div className="flex flex-col items-center">
        {/* 头像 */}
        <div className="w-20 h-20 md:w-16 md:h-16 rounded-full overflow-hidden mb-4 md:mb-3">
          <Image 
            src={avatarUrl} 
            alt="Profile Avatar" 
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>
        
        {/* 用户名 */}
        <h3 className="text-2xl md:text-lg font-bold mb-1 md:mb-1">{username || 'NEXTART'}</h3>
        
        {/* 地址 */}
        <p className="text-base md:text-sm text-gray-400 mb-2 md:mb-1">@{username?.toLowerCase() || 'nextart'}</p>
        <div className="flex items-center mb-3 md:mb-2">
          <Image 
            src="/profile/sui.png" 
            alt="SUI" 
            width={16}
            height={16}
            className="mr-2 md:mr-1.5 md:w-4 md:h-4"
          />
          <span className="text-sm md:text-sm text-blue-400">{formatAddress(address)}</span>
        </div>
        
        {/* 编辑按钮 */}
        <button 
          className="bg-[#FFFC26] text-black px-6 md:px-5 py-2 md:py-1.5 rounded-full font-medium text-base md:text-sm mb-6 md:mb-4"
          onClick={onEditClick}
        >
          Edit
        </button>
        
        {/* 总积分统计 */}
        <div className="w-full mb-4 md:mb-3">
          <p className="text-base md:text-sm text-gray-400 mb-2 md:mb-1">Total credits</p>
          <p className="text-4xl md:text-2xl font-bold text-[#FFFC26] mb-2 md:mb-1">{totalCredits.toLocaleString()}</p>
          <p className="text-sm md:text-sm text-green-400">+{growthRate}% from last month</p>
        </div>
        
        {/* 图表 */}
        <div className="w-full h-24 md:h-24 flex items-end justify-between mt-2 md:mt-2">
          {monthlyStats.map((value, index) => (
            <div 
              key={index}
              className="bg-[#FFFC26] w-[7%]"
              style={{ height: `${value * 2}px` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}