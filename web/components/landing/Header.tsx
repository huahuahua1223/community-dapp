'use client'

import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import { useCurrentAccount, useDisconnectWallet } from '@mysten/dapp-kit'
import Link from 'next/link'

interface HeaderProps {
  setShowMenuPopup: Dispatch<SetStateAction<boolean>>;
  setShowWalletPopup: Dispatch<SetStateAction<boolean>>;
  BorderRadius?: boolean;
}

export default function Header({ setShowMenuPopup, setShowWalletPopup, BorderRadius = false }: HeaderProps) {
  const currentAccount = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();

  // 处理地址显示格式
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <header className="w-full bg-transparent z-[100]">
      {/* 移动端Header */}
      <div className="px-3 md:hidden">
        <div className={`bg-white ${BorderRadius ? 'rounded-[20px]' : 'rounded-t-[20px]'} w-full py-3 px-5 flex justify-between items-center`}>
          <Link href="/" className="flex items-center">
            <Image 
              src="/navbar/logo.png" 
              alt="NEXT ART" 
              width={150} 
              height={40} 
              className="object-contain"
            />
          </Link>
          <button 
            className="p-0 bg-[#FFFC26] rounded-full w-12 h-12 flex items-center justify-center"
            onClick={() => setShowMenuPopup(true)}
          >
            <Image 
              src="/landingpage/activites/solar_list-bold-duotone.png" 
              alt="菜单" 
              width={48} 
              height={48} 
              className="object-contain"
            />
          </button>
        </div>
      </div>

      {/* 桌面端Header */}
      <div className="hidden md:block fixed top-0 left-0 right-0 bg-white z-[100]">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <Image 
                src="/navbar/logo.png" 
                alt="NEXT ART" 
                width={180} 
                height={48} 
                className="object-contain"
              />
            </Link>
            
            {/* 桌面端显示的菜单内容 */}
            <div className="flex items-center space-x-4">
              {/* 钱包连接状态 */}
              {!currentAccount ? (
                <button 
                  className="bg-[#FFEE32] py-2 px-4 text-base font-bold rounded-full hover:bg-[#F0E030] transition-colors"
                  onClick={() => setShowWalletPopup(true)}
                >
                  CONNECT WALLET
                </button>
              ) : (
                <div className="flex items-center space-x-3">
                  {/* 钱包信息和断开连接下拉菜单 */}
                  <div className="relative group">
                    <button className="flex items-center space-x-2 bg-gradient-to-r from-[#FF3B30] to-[#FF6B52] text-white py-2 px-4 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium">{formatAddress(currentAccount.address)}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* 下拉菜单 */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-[101]">
                      {/* 个人资料链接 */}
                      <Link
                        href="/profile"
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Profile</span>
                      </Link>

                      <button 
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center space-x-2"
                        onClick={() => {
                          navigator.clipboard.writeText(currentAccount.address);
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                        <span>Copy Address</span>
                      </button>
                      <button 
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center space-x-2"
                        onClick={() => {
                          window.open(`https://suiexplorer.com/address/${currentAccount.address}`, '_blank');
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span>View in Browser</span>
                      </button>
                      <hr className="my-2" />
                      <button 
                        className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50 flex items-center space-x-2"
                        onClick={() => disconnect()}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Disconnect</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 社交媒体图标 */}
              <div className="flex items-center space-x-2">
                <a href="#" className="flex justify-center items-center bg-[#FF3B30] text-white p-2 rounded-full hover:bg-[#E63529] transition-colors">
                  <Image 
                    src="/navbar/telegram.png" 
                    alt="Telegram" 
                    width={20} 
                    height={20} 
                    className="object-contain"
                  />
                </a>
                <a href="#" className="flex justify-center items-center bg-[#FF3B30] text-white p-2 rounded-full hover:bg-[#E63529] transition-colors">
                  <Image 
                    src="/navbar/twitter.png" 
                    alt="Twitter" 
                    width={20} 
                    height={20} 
                    className="object-contain"
                  />
                </a>
                <a href="#" className="flex justify-center items-center bg-[#FF3B30] text-white p-2 rounded-full hover:bg-[#E63529] transition-colors">
                  <Image 
                    src="/navbar/xiaohongshu.png" 
                    alt="小红书" 
                    width={20} 
                    height={20} 
                    className="object-contain"
                  />
                </a>
                <button 
                  className="flex justify-center items-center border border-gray-300 rounded-full p-2 hover:bg-gray-100 transition-colors"
                  aria-label="切换语言"
                >
                  <Image 
                    src="/navbar/language.png" 
                    alt="语言" 
                    width={20} 
                    height={20} 
                    className="object-contain"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}