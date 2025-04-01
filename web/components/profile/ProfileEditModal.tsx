'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useDisconnectWallet } from '@mysten/dapp-kit'

interface ProfileEditModalProps {
  username: string;
  setUsername: (username: string) => void;
  twitterAccount: string;
  setTwitterAccount: (twitter: string) => void;
  bio?: string;
  setBio?: (bio: string) => void;
  avatarUrl?: string;
  setAvatarUrl?: (url: string) => void;
  address: string;
  onSave: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

export default function ProfileEditModal({
  username,
  setUsername,
  twitterAccount,
  setTwitterAccount,
  address,
  onSave,
  onCancel,
  isOpen
}: ProfileEditModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { mutate: disconnectWallet } = useDisconnectWallet();
  
  // 处理地址显示格式
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `0x${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
  };
  
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[200] flex items-end md:items-center justify-center">
      <div 
        className={`w-full md:w-[500px] max-w-md bg-white md:rounded-3xl rounded-t-3xl p-6 pb-8 transition-transform duration-300 ease-out
          ${isOpen ? 
            'md:translate-y-0 md:animate-none translate-y-0 animate-slide-up' : 
            'md:translate-y-0 translate-y-full'
          }`}
      >
        {/* 顶部把手 - 仅在移动端显示 */}
        <div className="flex justify-center mb-4 md:hidden">
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
        </div>
        
        {/* 标题 */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Edit profile</h2>
          <p className="text-gray-500">Edit your profile here. Click save when you&apos;re done.</p>
        </div>
        
        {/* 钱包地址 */}
        <div className="mb-6">
          <button 
            className="w-full py-3 px-4 text-base font-bold rounded-full bg-[#E3F2FD] text-[#2D90EA] flex items-center justify-center hover:bg-[#C1E1FC] transition-colors"
            onClick={() => disconnectWallet()}
          >
            <Image 
              src="/sui.png" 
              alt="Sui" 
              width={20} 
              height={20} 
              className="mr-2" 
            />
            {formatAddress(address)}
          </button>
        </div>

        {/* 用户名 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none"
            placeholder="Nextart"
          />
        </div>

        {/* Twitter账号 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your X(Twitter) account
          </label>
          <input
            type="text"
            value={twitterAccount}
            onChange={(e) => setTwitterAccount(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none"
            placeholder="@nextart"
          />
        </div>

        {/* 按钮组 */}
        <div className="space-y-3">
          <button
            onClick={onSave}
            className="w-full bg-[#FFFC26] text-black py-3 rounded-full font-medium"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="w-full bg-white text-black py-3 rounded-full font-medium border border-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
} 