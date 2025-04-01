'use client'

import { useCurrentAccount } from '@mysten/dapp-kit'
import { CategorizedObjects } from '@/utils/assetsHelpers'
import { useState } from 'react'

// 导入拆分后的组件
import Header from './Header'
import Introduction from './Introduction'
import Activities from './Activities'
import CoPartners from './CoPartners'
import NFTWall from './NFTWall'
import Donate from './Donate'
import Footer from './Footer'
import WalletModal from './WalletModal'
import MenuModal from './MenuModal'

interface ResponsiveViewProps {
  userObjects: CategorizedObjects | null;
}

export default function ResponsiveView({ userObjects }: ResponsiveViewProps) {
  console.log('userObjects', userObjects);
  // 移动端逻辑
  const [showMenuPopup, setShowMenuPopup] = useState(false);
  const [showWalletPopup, setShowWalletPopup] = useState(false);
  const [username, setUsername] = useState('');
  const [twitterAccount, setTwitterAccount] = useState('');
  
  // 使用钩子获取当前连接的账户
  const currentAccount = useCurrentAccount();

  // 处理地址显示格式
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const handleSaveProfile = () => {
    if (currentAccount) {
      setShowWalletPopup(false);
      console.log("保存资料", {
        wallet: currentAccount.address,
        username: username,
        twitter: twitterAccount
      });
    } else {
      alert("请先连接钱包");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#302F2F] md:bg-white font-sans">
      {/* 响应式Header组件 */}
      <Header 
        setShowMenuPopup={setShowMenuPopup} 
        setShowWalletPopup={setShowWalletPopup} 
      />

      {/* 主要内容 - 响应式布局 */}
      <main className="pt-0 md:pt-20 overflow-visible space-y-4 md:space-y-0 px-3 md:px-0">      
        {/* 介绍区域 - 全宽 */}
        <div className="md:w-screen md:relative md:left-1/2 md:right-1/2 md:-ml-[50vw] md:-mr-[50vw] md:overflow-hidden">
          <div className="rounded-b-[20px] overflow-hidden md:rounded-none">
            <Introduction />
          </div>
        </div>
        
        {/* 活动区域 - 全宽 */}
        <div className="md:w-screen md:relative md:left-1/2 md:right-1/2 md:-ml-[50vw] md:-mr-[50vw]">
          <div className="rounded-[20px] overflow-hidden md:rounded-none">
            <Activities />
          </div>
        </div>
        
        {/* 合作伙伴区域 - 全宽 */}
        <div className="md:w-screen md:relative md:left-1/2 md:right-1/2 md:-ml-[50vw] md:-mr-[50vw]">
          <div className="rounded-[20px] overflow-hidden md:rounded-none">
            <CoPartners />
          </div>
        </div>
        
        {/* NFT墙 - 全宽 */}
        <div className="md:w-screen md:relative md:left-1/2 md:right-1/2 md:-ml-[50vw] md:-mr-[50vw]">
          <div className="rounded-[20px] overflow-hidden md:rounded-none">
            <NFTWall />
          </div>
        </div>
        
        {/* 捐赠区域 */}
        <div className="rounded-[20px] overflow-hidden md:rounded-none bg-[#302F2F] md:bg-transparent">
          <Donate />
        </div>
      </main>
      
      {/* 页脚 */}
      <div className="mt-4 md:mt-0">
        <div className="md:w-screen md:relative md:left-1/2 md:right-1/2 md:-ml-[50vw] md:-mr-[50vw]">
          <div className="px-3 md:px-0">
            <div className="bg-[#302F2F] md:bg-transparent rounded-[20px] md:rounded-none overflow-hidden">
              <Footer />
            </div>
          </div>
        </div>
      </div>

      {/* 弹窗组件 */}
      <MenuModal 
        showMenuPopup={showMenuPopup}
        setShowMenuPopup={setShowMenuPopup}
        setShowWalletPopup={setShowWalletPopup}
      />

      <WalletModal 
        showWalletPopup={showWalletPopup}
        setShowWalletPopup={setShowWalletPopup}
        setShowMenuPopup={setShowMenuPopup}
        formatAddress={formatAddress}
        username={username}
        setUsername={setUsername}
        twitterAccount={twitterAccount}
        setTwitterAccount={setTwitterAccount}
        handleSaveProfile={handleSaveProfile}
      />
    </div>
  );
} 