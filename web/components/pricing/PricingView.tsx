'use client'

import { useCurrentAccount } from '@mysten/dapp-kit'
import { CategorizedObjects } from '@/utils/assetsHelpers'
import { useState } from 'react'

// 导入组件
import Header from '../landing/Header'
import Footer from '../landing/Footer'
import Donate from '../landing/Donate'
import WalletModal from '../landing/WalletModal'
import MenuModal from '../landing/MenuModal'
import PricingContent from './PricingContent'

interface PricingViewProps {
  userObjects: CategorizedObjects | null;
}

interface PricingOption {
  id: string;
  title: string;
  highlightedText: string;
  regularText: string;
  imageSrc: string;
}

export default function PricingView({ userObjects }: PricingViewProps) {
  console.log("userObjects", userObjects);
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

  // 处理Get It按钮点击
  const handleGetIt = (optionId: string) => {
    if (!currentAccount) {
      // 如果用户未连接钱包，显示钱包连接弹窗
      setShowWalletPopup(true);
    } else {
      // 如果用户已连接钱包，则可以进行后续操作
      console.log(`用户选择了 ${optionId} 选项`);
      // 这里可以添加mint NFT的逻辑
      alert(`您已选择 ${optionId} 选项！即将进行Mint操作...`);
    }
  };

  // 定义价格选项
  const pricingOptions: PricingOption[] = [
    {
      id: "rich",
      title: "I'm fucking rich",
      highlightedText: "rich",
      regularText: "I'm fucking",
      imageSrc: "/pricing/rich.png"
    },
    {
      id: "money",
      title: "Take my money",
      highlightedText: "money",
      regularText: "Take my",
      imageSrc: "/pricing/money.png"
    },
    {
      id: "free",
      title: "Free mint",
      highlightedText: "Free",
      regularText: "mint",
      imageSrc: "/pricing/free.png"
    }
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#302F2F] md:bg-white font-sans flex flex-col overflow-hidden">
      {/* 响应式Header组件 */}
      <Header 
        setShowMenuPopup={setShowMenuPopup} 
        setShowWalletPopup={setShowWalletPopup} 
        BorderRadius={true}
      />

      {/* 主要内容 - 使用PricingContent组件 */}
      <div className="flex-grow flex flex-col">
        <PricingContent pricingOptions={pricingOptions} onGetIt={handleGetIt} />
      </div>
      
      {/* 捐赠区域 和 页脚 */}
      <div className="mt-0">
        <div className="px-3 mt-6 md:px-6 lg:px-8 max-w-screen-2xl mx-auto w-full">
          <div className="py-0">
            <div className="bg-[#302F2F] md:bg-transparent rounded-[20px] md:rounded-none">
              <Donate />
            </div>
          </div>
        </div>
        <div className="px-3 mt-4 md:px-0">
          <div className="bg-[#302F2F] md:bg-transparent rounded-[20px] md:rounded-none">
            <Footer />
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