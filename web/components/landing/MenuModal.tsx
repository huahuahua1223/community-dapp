'use client'

import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import { useCurrentAccount, useDisconnectWallet } from '@mysten/dapp-kit'
import Link from 'next/link'

interface MenuModalProps {
  showMenuPopup: boolean;
  setShowMenuPopup: Dispatch<SetStateAction<boolean>>;
  setShowWalletPopup: Dispatch<SetStateAction<boolean>>;
}

export default function MenuModal({
  showMenuPopup,
  setShowMenuPopup,
  setShowWalletPopup
}: MenuModalProps) {
  const currentAccount = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();

  if (!showMenuPopup) return null;
  
  // 处理地址显示格式
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[200]"
      onClick={() => setShowMenuPopup(false)}
    >
      <div 
        className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8 max-w-[320px] md:max-w-[400px] w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {!currentAccount ? (
          <div className="mb-4 md:mb-6">
            <button 
              className="bg-[#FFEE32] w-full py-3 md:py-4 px-4 text-lg md:text-xl font-bold rounded-xl md:rounded-2xl hover:bg-[#F0E030] transition-colors"
              onClick={() => {
                setShowMenuPopup(false);
                setShowWalletPopup(true);
              }}
            >
              CONNECT WALLET
            </button>
          </div>
        ) : (
          <div className="mb-4 md:mb-6 space-y-4">
            {/* 账户信息卡片 */}
            <div className="bg-gradient-to-r from-[#FF3B30] to-[#FF6B52] p-4 rounded-xl text-white">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium opacity-80">Connected Wallet</p>
                  <p className="font-bold">{formatAddress(currentAccount.address)}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  className="flex-1 bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors py-2 rounded-lg text-sm font-medium"
                  onClick={() => {
                    navigator.clipboard.writeText(currentAccount.address);
                  }}
                >
                  copy address
                </button>
                <button 
                  className="flex-1 bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors py-2 rounded-lg text-sm font-medium"
                  onClick={() => {
                    window.open(`https://suiexplorer.com/address/${currentAccount.address}`, '_blank');
                  }}
                >
                  view in browser
                </button>
              </div>
            </div>

            {/* 断开连接按钮 */}
            <button 
              className="w-full py-3 md:py-4 px-4 text-lg md:text-xl font-bold rounded-xl md:rounded-2xl border-2 border-red-500 text-red-500 hover:bg-red-50 transition-all duration-300 flex items-center justify-center space-x-2"
              onClick={() => {
                disconnect();
                setShowMenuPopup(false);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>disconnect</span>
            </button>
          </div>
        )}

        <div className="space-y-2 md:space-y-3">
          {/* Profile按钮 */}
          {currentAccount && (
            <Link 
              href="/profile" 
              className="flex justify-center items-center bg-[#FF3B30] text-white py-3 md:py-4 px-4 rounded-xl md:rounded-2xl w-full hover:bg-[#E63529] transition-colors space-x-2"
              onClick={() => setShowMenuPopup(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>profile</span>
            </Link>
          )}

          {/* 社交媒体按钮 */}
          <a href="#" className="flex justify-center items-center bg-[#FF3B30] text-white py-3 md:py-4 px-4 rounded-xl md:rounded-2xl w-full hover:bg-[#E63529] transition-colors">
            <Image 
              src="/navbar/telegram.png" 
              alt="Telegram" 
              width={24} 
              height={24} 
              className="object-contain mr-3 md:w-[28px] md:h-[28px]"
            />
          </a>
          <a href="#" className="flex justify-center items-center bg-[#FF3B30] text-white py-3 md:py-4 px-4 rounded-xl md:rounded-2xl w-full hover:bg-[#E63529] transition-colors">
            <Image 
              src="/navbar/twitter.png" 
              alt="Twitter" 
              width={24} 
              height={24} 
              className="object-contain mr-3 md:w-[28px] md:h-[28px]"
            />
          </a>
          <a href="#" className="flex justify-center items-center bg-[#FF3B30] text-white py-3 md:py-4 px-4 rounded-xl md:rounded-2xl w-full hover:bg-[#E63529] transition-colors">
            <Image 
              src="/navbar/xiaohongshu.png" 
              alt="小红书" 
              width={24} 
              height={24} 
              className="object-contain mr-3 md:w-[28px] md:h-[28px]"
            />
          </a>
        </div>
        <button 
          className="flex justify-center items-center w-full border border-gray-300 rounded-xl md:rounded-2xl py-3 md:py-4 px-4 mt-4 md:mt-6 hover:bg-gray-100 transition-colors"
          onClick={() => setShowMenuPopup(false)}
        >
          <Image 
            src="/navbar/language.png" 
            alt="语言" 
            width={24} 
            height={24} 
            className="object-contain mr-3 md:w-[28px] md:h-[28px]"
          />
        </button>
      </div>
    </div>
  );
} 