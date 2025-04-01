'use client'

import Image from 'next/image'
import Link from 'next/link'
import { DonateInline } from './Donate'

export default function Footer() {
  return (
    <>
      {/* 移动端布局 - 仅在小屏幕显示 */}
      <div className="md:hidden">
        <div>
          <div className="bg-black text-white py-8 px-6 rounded-[20px] relative" 
               style={{ 
                 border: '2px solid transparent',
                 backgroundImage: 'linear-gradient(black, black), linear-gradient(to bottom, #FFEE00, #FF3B30)',
                 backgroundOrigin: 'border-box',
                 backgroundClip: 'padding-box, border-box'
               }}>
            <div className="mb-8">
              <div className="mb-6">
                <Image 
                  src="/landingpage/nextart.png" 
                  alt="NEXT ART" 
                  width={200} 
                  height={70} 
                  className="object-contain"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <Image 
                    src="/qr-code-Join wechat group.png" 
                    alt="QR Code" 
                    width={120} 
                    height={120} 
                    className="mx-auto mb-2"
                  />
                  <p className="text-sm">Join wechat group</p>
                </div>
                <div className="text-center">
                  <Image 
                    src="/qr-code-Contact assistant.png" 
                    alt="QR Code" 
                    width={120} 
                    height={120} 
                    className="mx-auto mb-2"
                  />
                  <p className="text-sm">Contact assistant</p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="mb-8">
                <h3 className="text-[#FFEE00] text-2xl font-bold mb-3">COMMUNITY</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-[#FFEE00] hover:text-white text-xl transition-colors">
                      Financial Reports
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="text-[#FFEE00] text-2xl font-bold mb-3">LEARN</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-[#FFEE00] hover:text-white text-xl transition-colors">
                      Upcoming Co-learning
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-[#FFEE00] hover:text-white text-xl transition-colors">
                      Oncoming Co-learning
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-[#FFEE00] hover:text-white text-xl transition-colors">
                      Past Co-learning
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-[#FFEE00] text-2xl font-bold mb-3">Follow</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-[#FFEE00] hover:text-white text-xl transition-colors">
                      X
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-[#FFEE00] hover:text-white text-xl transition-colors">
                      Telegram
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-[#FFEE00] hover:text-white text-xl transition-colors">
                      Xiaohongshu
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 桌面端整合布局 - 仅在中等及以上屏幕显示 */}
      <div className="hidden md:block">
        <div className="bg-black text-white py-10 px-12 lg:py-4 lg:px-16 rounded-3xl relative mx-auto" 
             style={{ 
               border: '2px solid transparent',
               backgroundImage: 'linear-gradient(black, black), linear-gradient(to right, #FFEE00, #FF3B30)',
               backgroundOrigin: 'border-box',
               backgroundClip: 'padding-box, border-box'
             }}>
          <div className="flex flex-wrap lg:flex-nowrap items-start justify-between gap-8">
            {/* 左侧：LOGO和二维码 */}
            <div className="flex-shrink-0 w-full lg:w-auto max-w-xs">
              <div className="mb-8">
                <Image 
                  src="/landingpage/nextart.png" 
                  alt="NEXT ART" 
                  width={200} 
                  height={70} 
                  className="object-contain mb-6"
                />
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <Image 
                      src="/qr-code-Join wechat group.png" 
                      alt="QR Code" 
                      width={100} 
                      height={100} 
                      className="mx-auto mb-2"
                    />
                    <p className="text-xs lg:text-sm">Join wechat group</p>
                  </div>
                  <div className="text-center">
                    <Image 
                      src="/qr-code-Contact assistant.png" 
                      alt="QR Code" 
                      width={100} 
                      height={100} 
                      className="mx-auto mb-2"
                    />
                    <p className="text-xs lg:text-sm">Contact assistant</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 中间：导航链接 */}
            <div className="flex flex-grow justify-evenly gap-8">
              <div>
                <h3 className="text-[#FFEE00] text-xl lg:text-2xl font-bold mb-4">COMMUNITY</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="#" className="text-[#FFEE00] hover:text-white text-base lg:text-xl transition-colors">
                      Financial Reports
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-[#FFEE00] text-xl lg:text-2xl font-bold mb-4">LEARN</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="#" className="text-[#FFEE00] hover:text-white text-base lg:text-xl transition-colors">
                      Upcoming Co-learning
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-[#FFEE00] hover:text-white text-base lg:text-xl transition-colors">
                      Oncoming Co-learning
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-[#FFEE00] hover:text-white text-base lg:text-xl transition-colors">
                      Past Co-learning
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-[#FFEE00] text-xl lg:text-2xl font-bold mb-4">Follow</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="#" className="text-[#FFEE00] hover:text-white text-base lg:text-xl transition-colors">
                      X
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-[#FFEE00] hover:text-white text-base lg:text-xl transition-colors">
                      Telegram
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-[#FFEE00] hover:text-white text-base lg:text-xl transition-colors">
                      Xiaohongshu
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* 右侧：捐赠组件 */}
            <div className="flex-shrink-0 w-full lg:w-auto">
              <DonateInline />
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 