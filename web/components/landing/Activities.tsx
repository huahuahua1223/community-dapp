'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ActivityItem {
  id: number;
  title: string;
  dateRange: string;
  type: 'upcoming' | 'oncoming' | 'past';
  color?: string;
  isPlaceholder?: boolean;
}

export default function Activities() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'oncoming' | 'past'>('oncoming');
  const [currentPage, setCurrentPage] = useState(1);

  // 每页显示的项目数
  const ITEMS_PER_PAGE = 5;

  // 示例活动数据
  const activities: ActivityItem[] = [
    { 
      id: 1, 
      title: 'Web3 Co-learning Season 1', 
      dateRange: '2024.10.11~2024.11.16', 
      type: 'oncoming',
      color: 'from-blue-400 to-blue-600'
    },
    { 
      id: 2, 
      title: 'Move Hackathon', 
      dateRange: '2024.09.20~2024.10.20', 
      type: 'oncoming',
      color: 'from-red-400 to-red-600'
    },
    { 
      id: 3, 
      title: 'SUI Meetup Beijing', 
      dateRange: '2024.08.15~2024.08.16', 
      type: 'oncoming',
      color: 'from-purple-400 to-purple-600'
    },
    { 
      id: 4, 
      title: 'Web3 Builder Workshop', 
      dateRange: '2024.07.11~2024.08.11', 
      type: 'oncoming',
      color: 'from-red-400 to-red-600'
    },
    { 
      id: 5, 
      title: 'Move Language Tutorial', 
      dateRange: '2024.06.01~2024.07.01', 
      type: 'oncoming',
      color: 'from-purple-400 to-purple-600'
    },
    { 
      id: 6, 
      title: 'SUI Developers Conference', 
      dateRange: '2024.05.15~2024.05.16', 
      type: 'past',
      color: 'from-green-400 to-green-600'
    },
    { 
      id: 7, 
      title: 'Web3 Co-learning Season 2', 
      dateRange: '2024.11.20~2024.12.20', 
      type: 'upcoming',
      color: 'from-blue-400 to-blue-600'
    },
    { 
      id: 8, 
      title: 'Move Advanced Workshop', 
      dateRange: '2024.12.01~2024.12.15', 
      type: 'upcoming',
      color: 'from-red-400 to-red-600'
    },
    { 
      id: 9, 
      title: 'SUI Ecosystem Summit', 
      dateRange: '2024.04.10~2024.04.11', 
      type: 'past',
      color: 'from-green-400 to-green-600'
    },
    { 
      id: 10, 
      title: 'Blockchain Security Workshop', 
      dateRange: '2024.03.20~2024.03.21', 
      type: 'past',
      color: 'from-purple-400 to-purple-600'
    },
    { 
      id: 11, 
      title: 'DeFi Development Course', 
      dateRange: '2024.08.20~2024.09.20', 
      type: 'oncoming',
      color: 'from-blue-400 to-blue-600'
    },
    { 
      id: 12, 
      title: 'Smart Contract Security', 
      dateRange: '2024.09.01~2024.09.15', 
      type: 'oncoming',
      color: 'from-red-400 to-red-600'
    },
    { 
      id: 13, 
      title: 'Web3 Gaming Summit', 
      dateRange: '2025.01.15~2025.01.16', 
      type: 'upcoming',
      color: 'from-purple-400 to-purple-600'
    },
    { 
      id: 14, 
      title: 'NFT Art Exhibition', 
      dateRange: '2024.02.15~2024.02.16', 
      type: 'past',
      color: 'from-blue-400 to-blue-600'
    },
    { 
      id: 15, 
      title: 'Crypto Trading Workshop', 
      dateRange: '2024.07.20~2024.07.21', 
      type: 'oncoming',
      color: 'from-green-400 to-green-600'
    }
  ];

  // 过滤活动数据
  const filteredActivities = activities.filter(item => item.type === activeTab);
  
  // 计算总页数
  const totalPages = Math.ceil(filteredActivities.length / ITEMS_PER_PAGE);
  
  // 获取当前页的数据（包含占位数据）
  const getCurrentPageItems = (isMobile: boolean = false) => {
    const itemsPerPage = isMobile ? ITEMS_PER_PAGE : ITEMS_PER_PAGE;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredActivities.slice(startIndex, endIndex);
    
    // 如果当前项目数少于每页显示数，添加占位项
    if (currentItems.length < itemsPerPage) {
      const placeholders = Array(itemsPerPage - currentItems.length).fill(null).map((_, index) => ({
        id: `placeholder-${index}`,
        title: '',
        dateRange: '',
        type: activeTab,
        color: 'from-gray-400 to-gray-600',
        isPlaceholder: true
      }));
      return [...currentItems, ...placeholders];
    }
    
    return currentItems;
  };

  // 处理翻页
  const handlePrevPage = () => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
  };
  
  const handleNextPage = () => {
    setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
  };

  // 处理标签切换
  const handleTabChange = (tab: 'upcoming' | 'oncoming' | 'past') => {
    setActiveTab(tab);
    setCurrentPage(1); // 重置页码到第一页
  };

  return (
    <div>
      {/* 标题部分 */}
      <div className="bg-black text-white py-4 px-5 md:py-6 rounded-t-3xl md:rounded-none">
        <div className="max-w-7xl mx-auto md:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className="text-4xl md:text-5xl font-black tracking-wide">ACTIVITIES</h2>
            <div className="bg-[#FFFC26] rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
              <Image 
                src="/landingpage/activites/solar_list-bold-duotone.png"
                alt="menu icon"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
          </div>
          
          {/* 选项卡 */}
          <div className="flex justify-between text-lg md:text-xl font-bold md:justify-start md:space-x-16 lg:space-x-24">
            <button 
              className={`transition-colors ${activeTab === 'upcoming' ? 'text-[#FFEE32]' : 'text-[#8A891B]'}`}
              onClick={() => handleTabChange('upcoming')}
            >
              UPCOMING
            </button>
            <button 
              className={`transition-colors ${activeTab === 'oncoming' ? 'text-[#FFEE32]' : 'text-[#8A891B]'}`}
              onClick={() => handleTabChange('oncoming')}
            >
              ONCOMING
            </button>
            <button 
              className={`transition-colors ${activeTab === 'past' ? 'text-[#FFEE32]' : 'text-[#8A891B]'}`}
              onClick={() => handleTabChange('past')}
            >
              PAST
            </button>
          </div>
        </div>
      </div>
      
      {/* 活动内容 */}
      <div className="bg-black pt-6 pb-10 px-5 md:py-8 lg:py-10 relative min-h-[320px] md:min-h-[250px] rounded-b-3xl md:rounded-none">
        <div className="max-w-7xl mx-auto relative md:px-6 lg:px-8">
          {/* 左右导航箭头 */}
          <button 
            className="absolute left-[-10px] md:left-[-20px] top-1/2 transform -translate-y-1/2 text-white text-4xl md:text-5xl z-10 w-10 h-10 flex items-center justify-center"
            onClick={handlePrevPage}
          >
            &lt;
          </button>
          
          {/* 移动端使用垂直堆叠布局 */}
          <div className="space-y-5 md:hidden px-4">
            {getCurrentPageItems(true).map((activity) => (
              <div 
                key={activity.id} 
                className={`flex items-center transition-transform ${!activity.isPlaceholder && 'hover:scale-105'}`}
              >
                <div className="mr-4">
                  <Image 
                    src="/landingpage/activites/icon.png" 
                    alt="Activity Icon" 
                    width={80} 
                    height={80} 
                    className={`object-contain ${activity.isPlaceholder ? 'opacity-30' : ''}`}
                  />
                </div>
                <div className={`text-white ${activity.isPlaceholder ? 'opacity-30' : ''}`}>
                  <h3 className="text-2xl font-bold">{activity.title || 'Upcoming Activity'}</h3>
                  <p className="text-xl">{activity.dateRange || 'Date TBD'}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 桌面端使用水平轮播布局 */}
          <div className="hidden md:grid md:grid-cols-5 md:gap-4 px-6">
            {getCurrentPageItems(false).map((activity) => (
              <div 
                key={activity.id} 
                className={`relative rounded-3xl overflow-hidden transition-transform ${!activity.isPlaceholder && 'hover:scale-105'}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${activity.color} ${activity.isPlaceholder ? 'opacity-30' : 'opacity-80'}`}>
                  <div className="absolute inset-0 bg-[url('/landingpage/activites/icon.png')] bg-cover mix-blend-overlay"></div>
                </div>
                <div className="relative p-4 text-white">
                  <h3 className="text-xl font-bold">{activity.title || 'Upcoming Activity'}</h3>
                  <p className="text-sm mt-2">{activity.dateRange || 'Date TBD'}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className="absolute right-[-10px] md:right-[-20px] top-1/2 transform -translate-y-1/2 text-white text-4xl md:text-5xl z-10 w-10 h-10 flex items-center justify-center"
            onClick={handleNextPage}
          >
            &gt;
          </button>
          
          {/* 分页指示器 */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <div 
                key={index} 
                className={`w-4 h-4 md:w-3 md:h-3 rounded-full cursor-pointer ${currentPage === index + 1 ? 'bg-white' : 'bg-gray-600'}`}
                onClick={() => setCurrentPage(index + 1)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 