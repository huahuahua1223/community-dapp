'use client'

import Image from 'next/image'
import { useState } from 'react'

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
}

interface MintProjectsProps {
  projects?: Project[];
}

export default function MintProjects({ 
  projects = [
    { id: 1, title: "Create project", description: "Deploy your new project in one-click." },
    { id: 2, title: "Create project", description: "Deploy your new project in one-click." },
    { id: 3, title: "Create project", description: "Deploy your new project in one-click." },
    { id: 4, title: "Create project", description: "Deploy your new project in one-click." },
    { id: 5, title: "Create project", description: "Deploy your new project in one-click." },
  ]
}: MintProjectsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;
  
  // 计算总页数
  const totalPages = Math.ceil(projects.length / projectsPerPage) || 1;
  
  // 获取当前页面显示的项目
  const currentProjects = projects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );
  
  // 页面导航
  const goToPage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full flex flex-col h-full">
      {/* 移动端布局 */}
      <div className="md:hidden flex flex-col h-full">
        {/* 项目卡片容器 - 可滚动区域 */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-4 mb-4">
            {currentProjects.map((project) => (
              <div key={project.id} className="bg-white md:bg-white rounded-[20px] md:rounded-2xl p-5 md:p-3">
                {/* 占位图 */}
                <div className="w-full aspect-[2/1] bg-gray-800 rounded-2xl mb-4 flex items-center justify-center">
                  {project.imageUrl ? (
                    <Image 
                      src={project.imageUrl} 
                      alt={project.title}
                      width={200}
                      height={100}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                  )}
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-black mb-1">{project.title}</h3>
                  <p className="text-base text-gray-400">{project.description}</p>
                </div>
                
                <button className="w-full bg-[#FFFC26] text-black py-3 rounded-full font-bold text-center text-base">
                  Mint
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* 移动端分页控件 - 固定在底部 */}
        <div className="mt-auto pt-4 pb-4">
          <div className="flex items-center justify-center space-x-1">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center ${currentPage === 1 ? 'text-black' : 'text-gray-400'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <span className="text-xs text-gray-500">Previous</span>
            
            {/* 页码按钮 */}
            {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
              const pageNumber = i + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => goToPage(pageNumber)}
                  className={`w-6 h-6 flex items-center justify-center rounded-lg ${
                    currentPage === pageNumber
                      ? 'bg-white font-bold'
                      : 'text-white'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            
            {totalPages > 3 && <span className="text-white">...</span>}
            
            <span className="text-xs text-gray-500">Next</span>
            
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center ${currentPage === totalPages ? 'text-black' : 'text-gray-400'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 桌面端布局 */}
      <div className="hidden md:flex md:flex-col">
        {/* 项目卡片容器 - 固定高度 */}
        <div className="min-h-[400px]">
          <div className="space-y-2 mb-2">
            {currentProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl p-8">
                <div className="flex items-center">
                  {/* 占位图 */}
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-6">
                    {project.imageUrl ? (
                      <Image 
                        src={project.imageUrl} 
                        alt={project.title}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-base font-bold">{project.title}</h3>
                    <p className="text-xs text-gray-500">{project.description}</p>
                  </div>

                  <button className="ml-6 bg-[#FFFC26] text-black py-2.5 px-8 rounded-full font-bold text-center text-base">
                    Mint
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 桌面端分页控件 */}
        <div className="flex items-center justify-center space-x-1 pb-8">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center ${currentPage === 1 ? 'text-gray-400' : 'text-white md:text-black'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <span className="text-xs text-gray-400 md:text-gray-500">Previous</span>
          
          {/* 页码按钮 */}
          {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
            const pageNumber = i + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => goToPage(pageNumber)}
                className={`w-6 h-6 flex items-center justify-center rounded-lg ${
                  currentPage === pageNumber
                    ? 'bg-[#FFFC26] font-bold md:bg-white md:border md:border-gray-200 md:shadow-sm'
                    : 'text-white md:text-gray-600'
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
          
          {/* 如果有更多页面，显示省略号 */}
          {totalPages > 3 && <span className="text-white md:text-gray-600">...</span>}
          
          <span className="text-xs text-gray-400 md:text-gray-500">Next</span>
          
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center ${currentPage === totalPages ? 'text-gray-400' : 'text-white md:text-black'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}