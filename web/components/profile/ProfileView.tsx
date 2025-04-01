'use client'

import { useCurrentAccount } from '@mysten/dapp-kit'
import { CategorizedObjects } from '@/utils/assetsHelpers'
import { useState, useEffect } from 'react'

// 导入组件
import Header from '../landing/Header'
import Footer from '../landing/Footer'
import Donate from '../landing/Donate'
import WalletModal from '../landing/WalletModal'
import MenuModal from '../landing/MenuModal'
import ProfileCard from './ProfileCard'
import MintProjects from './MintProjects'
import ProfileEditModal from './ProfileEditModal'

interface ProfileViewProps {
  userObjects: CategorizedObjects | null;
}

export default function ProfileView({ userObjects }: ProfileViewProps) {
  console.log("userObjects", userObjects);
  // 移动端逻辑
  const [showMenuPopup, setShowMenuPopup] = useState(false);
  const [showWalletPopup, setShowWalletPopup] = useState(false);
  const [username, setUsername] = useState('NEXTART');
  const [twitterAccount, setTwitterAccount] = useState('');
  const [bio] = useState('');
  const [avatarUrl] = useState('/profile/avatar.png');
  const [showEditForm, setShowEditForm] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // 使用钩子获取当前连接的账户
  const currentAccount = useCurrentAccount();

  // 检测设备类型
  useEffect(() => {
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
        username,
        twitter: twitterAccount,
        bio,
        avatarUrl
      });
      setShowEditForm(false);
    } else {
      alert("请先连接钱包");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#302F2F] md:bg-white font-sans flex flex-col overflow-hidden">
      {/* 响应式Header组件 */}
      <Header 
        setShowMenuPopup={setShowMenuPopup} 
        setShowWalletPopup={setShowWalletPopup} 
        BorderRadius={true}
      />

      {/* 主要内容 - 响应式布局 */}
      <main className="flex-grow flex flex-col md:pt-24 overflow-hidden">      
        <div className="px-3 md:px-6 lg:px-8 max-w-screen-2xl mx-auto w-full flex-grow flex flex-col">
          {/* 个人资料页面 */}
          <div className="py-3 flex-grow flex flex-col">
            {currentAccount ? (
              <div className="lg:flex lg:space-x-8 lg:items-start flex-grow h-full">
                {/* 左侧 - Mint项目 (桌面端) */}
                <div className="lg:flex-grow lg:w-[800px] order-2 lg:order-1">
                  {/* 在桌面端显示的Mint项目 */}
                  <div className="hidden lg:block">
                    <MintProjects />
                  </div>
                </div>
                
                {/* 右侧 - 个人资料卡片 (桌面端) */}
                <div className="lg:w-[380px] order-1 lg:order-2 lg:sticky lg:top-2">
                  <div className="md:bg-transparent">
                    <ProfileCard 
                      address={currentAccount.address}
                      username={username}
                      avatarUrl={avatarUrl}
                      onEditClick={() => setShowEditForm(true)}
                    />
                  </div>
                </div>
                
                {/* 移动端上下布局 - 仅在移动端显示Mint项目 */}
                <div className="lg:hidden mt-3 w-full">
                  <div className="rounded-[20px]">
                    <MintProjects />
                  </div>
                </div>
                
                {/* 个人资料编辑弹窗 */}
                <ProfileEditModal
                  username={username}
                  setUsername={setUsername}
                  twitterAccount={twitterAccount}
                  setTwitterAccount={setTwitterAccount}
                  address={currentAccount.address}
                  onSave={handleSaveProfile}
                  onCancel={() => setShowEditForm(false)}
                  isOpen={showEditForm}
                />
              </div>
            ) : (
              <div className="text-center py-12 flex-grow flex flex-col items-center justify-center bg-black rounded-[20px] md:bg-transparent md:rounded-none">
                <p className="text-white md:text-gray-600 mb-4">请先连接钱包以查看个人资料</p>
                <button
                  onClick={() => isMobile ? setShowMenuPopup(true) : setShowWalletPopup(true)}
                  className="bg-[#FFFC26] px-8 py-3 rounded-xl font-bold hover:bg-[#F0E030] transition-colors"
                >
                  连接钱包
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* 捐赠区域 和 页脚 */}
      <div className="mt-0">
        <div className="px-3 md:px-6 lg:px-8 max-w-screen-2xl mx-auto w-full">
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