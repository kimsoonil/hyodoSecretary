"use client";

import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-blue-600">스마트 어시스턴트</h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
              서비스 소개
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">
              이용 방법
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
              요금제
            </a>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
              무료 체험하기
            </button>
          </div>
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴 열기"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-gray-200">
            <a href="#features" className="block text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
              서비스 소개
            </a>
            <a href="#how-it-works" className="block text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
              이용 방법
            </a>
            <a href="#pricing" className="block text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
              요금제
            </a>
            <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
              무료 체험하기
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

