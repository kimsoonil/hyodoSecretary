"use client";

import Link from "next/link";
import { useState } from "react";

export default function PaymentApproval() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <header className="bg-white px-4 pt-4 pb-4 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link href="/activity" className="p-2 -ml-2">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-base font-bold text-gray-900 flex-1">결제 승인 (패밀리 페이)</h1>
        </div>
      </header>

      {/* Payment Request Header */}
      <div className="px-4 pt-6 pb-4">
        <p className="text-sm font-medium mb-1" style={{ color: '#7ace15' }}>어머니의 AI 비서로부터</p>
        <p className="text-gray-900 text-lg font-semibold">결제 요청이 도착했습니다</p>
      </div>

      {/* Payment Details Card */}
      <div className="px-4 mb-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          {/* Company Icon */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-teal-700 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.5a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white" style={{ backgroundColor: '#7ace15' }}>
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Company Name */}
          <h2 className="text-xl font-bold text-gray-900 text-center mb-2">서울도시가스</h2>
          <p className="text-sm text-gray-500 text-center mb-4">공과금 납부 • #9822-4122</p>

          {/* Amount */}
          <div className="text-center mb-3">
            <p className="text-3xl font-bold" style={{ color: '#7ace15' }}>194,500원</p>
          </div>

          {/* Overdue Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-1 px-3 py-1 border border-red-500 rounded-md bg-red-50">
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-medium text-red-600">납부 기한 경과</span>
            </div>
          </div>

          {/* Payment Information */}
          <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200">
            <div>
              <p className="text-xs text-gray-500 mb-1">납부 기한</p>
              <p className="text-sm font-medium text-gray-900">2023년 10월 24일</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">요청자</p>
              <p className="text-sm font-medium text-gray-900">어머니 (음성 요청)</p>
            </div>
          </div>

          {/* Detailed Bill View */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full bg-gray-50 rounded-lg p-3 flex items-center justify-between mb-3"
          >
            <span className="text-sm text-gray-700">청구 상세 내역 보기</span>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform ${showDetails ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showDetails && (
            <div className="bg-gray-50 rounded-lg p-4 mb-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">기본요금</span>
                  <span className="text-gray-900 font-medium">15,000원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">사용량</span>
                  <span className="text-gray-900 font-medium">179,500원</span>
                </div>
              </div>
            </div>
          )}

          {/* Original Bill */}
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
            </svg>
            청구서 원본 확인
          </div>
        </div>
      </div>


      {/* Action Buttons */}
      <div className="px-4 space-y-3">
        <button 
          className="w-full text-white rounded-xl py-4 px-6 flex items-center justify-center font-semibold shadow-lg active:scale-95 transition-all"
          style={{ backgroundColor: '#7ace15' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#65a012'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#7ace15'}
        >
          결제 승인하기
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button className="bg-white border border-gray-300 text-gray-900 rounded-xl py-3 px-4 font-medium hover:bg-gray-50 active:scale-95 transition-all">
            문의하기
          </button>
          <button className="bg-white border border-gray-300 text-red-600 rounded-xl py-3 px-4 font-medium hover:bg-gray-50 active:scale-95 transition-all">
            거절하기
          </button>
        </div>
      </div>
    </div>
  );
}

