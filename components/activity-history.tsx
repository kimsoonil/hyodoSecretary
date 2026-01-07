"use client";

import { useState } from "react";
import Link from "next/link";

interface ActivityCardProps {
  icon: React.ReactNode;
  title: string;
  time: string;
  status?: string;
  statusColor?: string;
  isActive?: boolean;
  actionButton?: React.ReactNode;
  detailLink?: string;
  iconColor: string;
}

function ActivityCard({
  icon,
  title,
  time,
  status,
  statusColor = "bg-gray-100 text-gray-600",
  isActive = false,
  actionButton,
  detailLink,
  iconColor,
}: ActivityCardProps) {
  return (
    <div className={`bg-white rounded-xl p-4 mb-3 ${isActive ? "border-l-4 border-blue-500" : ""}`}>
      <div className="flex items-start gap-3">
        <div 
          className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${iconColor || ''}`}
          style={!iconColor ? { backgroundColor: '#7ace15' } : {}}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-2">{time}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {actionButton}
              {status && (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                  {status}
                </span>
              )}
            </div>
            {detailLink && (
              <Link href={detailLink} className="text-sm font-medium" style={{ color: '#7ace15' }}>
                상세 보기 &gt;
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ActivityHistory() {
  const [activeTab, setActiveTab] = useState<"in-progress" | "past">("in-progress");

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header - Fixed */}
      <header className="bg-white px-4 pt-4 pb-4 flex-shrink-0 z-10 border-b border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/choice" className="p-2 -ml-2">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-lg font-bold text-gray-900 flex-1">활동 내역</h1>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("in-progress")}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              activeTab === "in-progress"
                ? "text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            style={activeTab === "in-progress" ? { backgroundColor: '#7ace15' } : {}}
          >
            진행 중
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              activeTab === "past"
                ? "text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            style={activeTab === "past" ? { backgroundColor: '#7ace15' } : {}}
          >
            지난 내역
          </button>
        </div>
      </header>

      {/* Content - Scrollable */}
      <main className="flex-1 overflow-y-auto px-4 pt-6 pb-32">
        {activeTab === "in-progress" ? (
          <>
            {/* Today Section */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">오늘</h2>
              <span className="text-sm text-gray-500">10월 24일</span>
            </div>

            {/* Payment Approval Card */}
            <Link href="/payment" className="block mb-3">
              <div className="bg-white rounded-xl p-4 border-l-4" style={{ borderLeftColor: '#7ace15' }}>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#7ace15' }}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 mb-1">결제 승인 대기</h3>
                    <p className="text-sm text-gray-600 mb-2">서울도시가스 공과금 • 194,500원</p>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-200">
                        납부 기한 경과
                      </span>
                      <span className="text-xs text-gray-500">승인 필요</span>
                    </div>
                  </div>
                  <div className="flex items-center flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            <ActivityCard
              icon={
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
              }
              title="병원 동행"
              time="오후 2:15 픽업 예정"
              isActive={true}
              iconColor=""
              actionButton={
                <button className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1" style={{ backgroundColor: '#e8f5e0', color: '#7ace15' }}>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  곧 도착함
                </button>
              }
              detailLink="/activity/1"
            />

            <ActivityCard
              icon={
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
              }
              title="장보기 배달"
              time="오후 5:00 예정"
              status="대기 중"
              statusColor="bg-gray-100 text-gray-600"
              iconColor=""
            />

            {/* Tomorrow Section */}
            <div className="mt-8 mb-4">
              <h2 className="text-lg font-bold text-gray-900">내일</h2>
            </div>

            <ActivityCard
              icon={
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z"/>
                </svg>
              }
              title="손주와 영상 통화"
              time="10월 25일 오전 10:00"
              status="예약됨"
              statusColor="bg-gray-100 text-gray-600"
              iconColor="bg-purple-400"
            />

            <ActivityCard
              icon={
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.36 2.72L20.78 4.14 15 9.93l-4-4L2.22 12.5l1.41 1.41L11 7.93l4 4 7.36-7.36zM5.93 19.36l-1.41-1.41L11 12.07l1.41 1.41-6.48 6.88z"/>
                </svg>
              }
              title="청소 서비스"
              time="10월 25일 오후 2:00"
              status="예약됨"
              statusColor="bg-gray-100 text-gray-600"
              iconColor="bg-orange-400"
            />
          </>
        ) : (
          <>
            {/* Yesterday Section */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">어제</h2>
              <span className="text-sm text-gray-500">10월 23일</span>
            </div>

            <ActivityCard
              icon={
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 001 1h1a1 1 0 001-1v-1h8v1a1 1 0 001 1h1a1 1 0 001-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
                </svg>
              }
              title="KTX/무궁화호 예매"
              time="10월 23일 오전 9:00 출발"
              status="완료"
              statusColor="bg-gray-100 text-gray-600"
              iconColor="bg-blue-500"
              detailLink="/activity/2"
            />

            <ActivityCard
              icon={
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
                </svg>
              }
              title="맛집/식당 예약"
              time="10월 23일 오후 7:00"
              status="완료"
              statusColor="bg-gray-100 text-gray-600"
              iconColor="bg-orange-500"
              detailLink="/activity/3"
            />

            {/* Last Week Section */}
            <div className="mt-8 mb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">지난주</h2>
                <span className="text-sm text-gray-500">10월 16일 ~ 10월 22일</span>
              </div>
            </div>

            <ActivityCard
              icon={
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3V8zm-4-5H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h10v14z"/>
                </svg>
              }
              title="병원 진료 예약"
              time="10월 20일 오전 10:30"
              status="완료"
              statusColor="bg-gray-100 text-gray-600"
              iconColor="bg-red-500"
              detailLink="/activity/4"
            />

            <ActivityCard
              icon={
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
              }
              title="장보기 배달"
              time="10월 18일 오후 3:00"
              status="완료"
              statusColor="bg-gray-100 text-gray-600"
              iconColor=""
              detailLink="/activity/5"
            />

            <ActivityCard
              icon={
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 00-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
                </svg>
              }
              title="행정 업무 지원"
              time="10월 17일 오전 11:00"
              status="완료"
              statusColor="bg-gray-100 text-gray-600"
              iconColor="bg-purple-500"
              detailLink="/activity/6"
            />

            {/* Earlier Section */}
            <div className="mt-8 mb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">이전 내역</h2>
                <span className="text-sm text-gray-500">10월 초</span>
              </div>
            </div>

            <ActivityCard
              icon={
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z"/>
                </svg>
              }
              title="손주와 영상 통화"
              time="10월 10일 오전 10:00"
              status="완료"
              statusColor="bg-gray-100 text-gray-600"
              iconColor="bg-purple-400"
              detailLink="/activity/7"
            />

            <ActivityCard
              icon={
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.36 2.72L20.78 4.14 15 9.93l-4-4L2.22 12.5l1.41 1.41L11 7.93l4 4 7.36-7.36zM5.93 19.36l-1.41-1.41L11 12.07l1.41 1.41-6.48 6.88z"/>
                </svg>
              }
              title="청소 서비스"
              time="10월 5일 오후 2:00"
              status="완료"
              statusColor="bg-gray-100 text-gray-600"
              iconColor="bg-orange-400"
              detailLink="/activity/8"
            />
          </>
        )}
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 w-full max-w-[428px] px-4">
        <Link
          href="/chat"
          className="w-full text-white rounded-full px-6 py-4 shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
          style={{ backgroundColor: '#7ace15', width: '200px', margin: '0 auto' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#65a012'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#7ace15'}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="font-medium">새 요청</span>
        </Link>
      </div>
    </div>
  );
}

