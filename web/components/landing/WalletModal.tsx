'use client'

import { ConnectModal, useCurrentAccount, useDisconnectWallet } from '@mysten/dapp-kit'
import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface WalletModalProps {
  showWalletPopup: boolean;
  setShowWalletPopup: Dispatch<SetStateAction<boolean>>;
  setShowMenuPopup: Dispatch<SetStateAction<boolean>>;
  formatAddress: (address: string) => string;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  twitterAccount: string;
  setTwitterAccount: Dispatch<SetStateAction<string>>;
  handleSaveProfile: () => void;
}

export default function WalletModal({
  showWalletPopup,
  setShowWalletPopup,
  setShowMenuPopup,
  formatAddress,
  username,
  setUsername,
  twitterAccount,
  setTwitterAccount,
  handleSaveProfile
}: WalletModalProps) {
  const currentAccount = useCurrentAccount();
  const { mutate: disconnectWallet } = useDisconnectWallet();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 初始化检查
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // 首次运行
    checkMobile();
    
    // 添加窗口大小变化监听
    window.addEventListener('resize', checkMobile);
    
    // 清理监听器
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!showWalletPopup) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center z-[200] overflow-y-auto"
      onClick={() => setShowWalletPopup(false)}
    >
      <div 
        className="bg-white rounded-t-[20px] md:rounded-[30px] shadow-lg p-4 md:p-6 w-full md:w-[500px] lg:w-[600px] max-h-[95vh] md:max-h-[90vh] overflow-y-auto animate-slide-up md:animate-fade-in md:my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mb-2 md:hidden">
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">Add profile</h2>
        <p className="text-gray-500 mb-4 md:mb-5 text-sm md:text-base">
          To get the community nft you first need to connect with the sui wallet and add your profile here. Click save when you&apos;re done.
        </p>
        
        <div className="mb-4 md:mb-6">
          {currentAccount ? (
            <button 
              className="w-full py-2 md:py-3 px-4 text-base md:text-lg font-bold rounded-full bg-[#E3F2FD] text-[#2D90EA] flex items-center justify-center hover:bg-[#C1E1FC] transition-colors"
              onClick={() => disconnectWallet()}
            >
              <Image 
                src="/sui.png" 
                alt="Sui" 
                width={20} 
                height={20} 
                className="mr-2 md:w-[24px] md:h-[24px]" 
              />
              {formatAddress(currentAccount.address)}
            </button>
          ) : (
            <ConnectModal
              trigger={
                <button className="w-full py-2 md:py-3 px-4 text-base md:text-lg font-bold rounded-full bg-[#2D90EA] text-white flex items-center justify-center hover:bg-[#1B7CD0] transition-colors">
                  <Image 
                    src="/sui.png" 
                    alt="Sui" 
                    width={20} 
                    height={20} 
                    className="mr-2 md:w-[24px] md:h-[24px]" 
                  />
                  Connect With Sui Wallet
                </button>
              }
            />
          )}
        </div>
        
        <div className="space-y-4 md:space-y-5">
          <div>
            <label className="block text-lg md:text-xl font-medium text-gray-900 mb-1">Username</label>
            <input 
              type="text"
              placeholder="Nextart"
              className="w-full p-3 md:p-4 border border-gray-300 rounded-full text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-[#2D90EA] focus:border-transparent transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={!currentAccount}
            />
          </div>
          
          <div>
            <label className="block text-lg md:text-xl font-medium text-gray-900 mb-1">Your X(Twitter) account</label>
            <input 
              type="text"
              placeholder="@nextart"
              className="w-full p-3 md:p-4 border border-gray-300 rounded-full text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-[#2D90EA] focus:border-transparent transition-all"
              value={twitterAccount}
              onChange={(e) => setTwitterAccount(e.target.value)}
              disabled={!currentAccount}
            />
          </div>
        </div>
        
        <div className="mt-5 md:mt-6 space-y-2 md:space-y-3">
          <button 
            className={`w-full py-3 md:py-4 rounded-full text-lg md:text-xl font-bold transition-colors ${
              currentAccount ? 'bg-[#FFEE32] hover:bg-[#F0E030]' : 'bg-gray-200 text-gray-500'
            }`}
            onClick={handleSaveProfile}
            disabled={!currentAccount}
          >
            Save
          </button>
          
          <button 
            className="w-full py-3 md:py-4 border border-gray-300 rounded-full text-lg md:text-xl font-bold hover:bg-gray-100 transition-colors"
            onClick={() => {
              setShowWalletPopup(false);
              if (isMobile) {
                setShowMenuPopup(true);
              }
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
} 