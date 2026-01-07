"use client";

import Link from "next/link";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  href: string;
  iconColor: string;
}

function ServiceCard({ icon, title, href, iconColor }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow active:scale-95"
    >
      <div 
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${iconColor || ''}`}
        style={!iconColor ? { backgroundColor: '#7ace15' } : {}}
      >
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-900 text-center">{title}</span>
    </Link>
  );
}

export default function HomeScreen() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white px-4 pt-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <button className="p-2" aria-label="메뉴">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-gray-900">나의 비서</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
        
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">안녕하세요, 박영희님</h2>
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2" style={{ backgroundColor: '#e8f5e0' }}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#7ace15' }}>
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-gray-900">비서 대기중</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm">오늘 어떤 도움이 필요하신가요?</p>
      </header>

      {/* Service Grid */}
      <main className="px-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <ServiceCard
            href="/chat?message=기차/버스 예매"
            icon={
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 001 1h1a1 1 0 001-1v-1h8v1a1 1 0 001 1h1a1 1 0 001-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
              </svg>
            }
            title="기차/버스 예매"
            iconColor="bg-blue-500"
          />
          
          <ServiceCard
            href="/chat?message=병원 진료 예약"
            icon={
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3V8zm-4-5H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h10v14z"/>
              </svg>
            }
            title="병원 진료 예약"
            iconColor="bg-red-500"
          />
          
          <ServiceCard
            href="/chat?message=장보기"
            icon={
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM1 2v2h2l3.6 7.59-1.35 2.45c-.15.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            }
            title="장보기"
            iconColor=""
          />
          
          <ServiceCard
            href="/chat?message=맛집/식당 예약"
            icon={
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
              </svg>
            }
            title="맛집/식당 예약"
            iconColor="bg-orange-500"
          />
          
          <ServiceCard
            href="/chat?message=행정 업무 지원"
            icon={
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 00-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
              </svg>
            }
            title="행정 업무 지원"
            iconColor="bg-purple-500"
          />
          
          <ServiceCard
            href="/chat"
            icon={
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            }
            title="기타 문의"
            iconColor="bg-gray-500"
          />
        </div>
      </main>

      {/* Voice Input Button */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-[428px] px-4">
        <button 
          className="text-white rounded-full py-4 px-6 flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all"
          style={{ backgroundColor: '#7ace15', width: '200px', margin: '0 auto' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#65a012'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#7ace15'}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">눌러서 말하기</span>
        </button>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[428px] bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center mx-auto">
          <Link href="/home" className="flex flex-col items-center gap-1 py-2">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs text-gray-600">홈</span>
          </Link>
          <Link href="/activity" className="flex flex-col items-center gap-1 py-2">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs text-gray-400">내 정보</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

