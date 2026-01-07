"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToMain = () => {
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-50">
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden">
        {/* Full Screen Illustration Background - Positioned Up */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/main.jpg"
            alt="효도 비서 일러스트"
            className="w-full h-full object-cover object-top"
            style={{ objectPosition: 'center top' }}
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-white/10"></div>
        </div>

        {/* Text Content and Button - Absolute Positioned at Top */}
        <div className="absolute top-16 left-0 right-0 px-4 z-10">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight drop-shadow-lg">
              효도 비서
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-800 mb-6 leading-relaxed drop-shadow-lg">
              어려운 스마트 용무,
              <br />
              <span className="font-semibold" style={{ color: '#7ace15' }}>이제 채팅 한 통으로</span>
              <br />
              해결하세요
            </p>
            <Link
              href="/home"
              className="inline-block text-white px-6 py-3 rounded-full text-base font-semibold transition-all transform hover:scale-105 shadow-lg"
              style={{ backgroundColor: '#7ace15', width: '200px' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#65a012'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#7ace15'}
            >
              시작하기
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        {showScrollIndicator && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <button
              onClick={scrollToMain}
              className="flex flex-col items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="스크롤"
            >
              <span className="text-sm">더 알아보기</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        )}
      </section>

      {/* Main Content */}
      <div id="main-content" className="bg-white">
        {/* Section 1: 서비스 소개 */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
              복잡한 스마트폰 사용, 이제 걱정 마세요
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              어르신들을 위한 특별한 디지털 어시스턴트 서비스입니다. 
              복잡한 앱 설치나 조작 없이, 간단한 채팅만으로 모든 일을 처리할 수 있습니다.
            </p>

            <div className="space-y-6 mt-12">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#e8f5e0' }}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#7ace15' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">간단한 채팅</h3>
                    <p className="text-gray-600">
                      복잡한 앱 조작 없이 채팅만으로 모든 서비스를 이용할 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#e8f5e0' }}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#7ace15' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">안전한 서비스</h3>
                    <p className="text-gray-600">
                      모든 결제와 예약은 안전하게 처리되며, 가족이 함께 관리할 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">24시간 지원</h3>
                    <p className="text-gray-600">
                      언제든지 필요한 서비스를 요청하면 즉시 도와드립니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: 주요 서비스 */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
              제공하는 서비스
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              일상생활에서 필요한 모든 서비스를 한 곳에서 이용하세요
            </p>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 001 1h1a1 1 0 001-1v-1h8v1a1 1 0 001 1h1a1 1 0 001-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">기차/버스 예매</h3>
                    <p className="text-gray-600">
                      복잡한 예매 사이트 조작 없이 채팅만으로 기차표와 버스표를 예매할 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3V8zm-4-5H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h10v14z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">병원 진료 예약</h3>
                    <p className="text-gray-600">
                      증상을 말씀해주시면 적절한 진료과를 추천하고 예약을 도와드립니다.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM1 2v2h2l3.6 7.59-1.35 2.45c-.15.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">장보기 서비스</h3>
                    <p className="text-gray-600">
                      필요한 물건을 말씀해주시면 배달 주문이나 장보기 리스트 작성을 도와드립니다.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">맛집/식당 예약</h3>
                    <p className="text-gray-600">
                      원하시는 음식 종류를 선택하시면 주변 맛집을 찾아 예약해드립니다.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 00-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">행정 업무 지원</h3>
                    <p className="text-gray-600">
                      주민등록등본, 가족관계증명서 등 각종 행정 서류 발급을 도와드립니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: 사용 방법 */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
              사용 방법
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              간단한 3단계로 모든 서비스를 이용하세요
            </p>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 text-white rounded-lg flex items-center justify-center flex-shrink-0 text-2xl font-bold" style={{ backgroundColor: '#7ace15' }}>
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">서비스 선택</h3>
                    <p className="text-gray-600">
                      홈 화면에서 원하는 서비스를 선택하거나 채팅으로 직접 요청하세요.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 text-white rounded-lg flex items-center justify-center flex-shrink-0 text-2xl font-bold" style={{ backgroundColor: '#7ace15' }}>
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">간단한 대화</h3>
                    <p className="text-gray-600">
                      디지털 도우미와 채팅하며 필요한 정보를 제공하세요.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 text-white rounded-lg flex items-center justify-center flex-shrink-0 text-2xl font-bold" style={{ backgroundColor: '#7ace15' }}>
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">완료 확인</h3>
                    <p className="text-gray-600">
                      예약이 완료되면 카드로 확인하고, 활동 내역에서 관리하세요.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: CTA */}
        <section className="py-20 px-4 text-white" style={{ background: 'linear-gradient(to bottom right, #7ace15, #a8e063)' }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              지금 바로 시작하세요
            </h2>
            <p className="text-xl mb-8 opacity-90">
              복잡한 스마트폰 사용, 이제 걱정 없이
              <br />
              효도 비서가 모든 것을 도와드립니다
            </p>
            <Link
              href="/home"
              className="inline-block bg-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              style={{ color: '#7ace15' }}
            >
              시작하기
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

