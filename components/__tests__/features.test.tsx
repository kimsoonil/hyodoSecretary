import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Features from '@/components/features';

describe('Features Component', () => {
  it('섹션 타이틀이 렌더링되어야 함', () => {
    render(<Features />);
    
    const title = screen.getByText(/핵심 서비스 기능/i);
    expect(title).toBeInTheDocument();
  });

  it('섹션 설명이 렌더링되어야 함', () => {
    render(<Features />);
    
    const description = screen.getByText(/복잡한 디지털 업무를 간단한 대화로 해결하는 3가지 솔루션/i);
    expect(description).toBeInTheDocument();
  });

  it('3개의 주요 기능이 렌더링되어야 함', () => {
    render(<Features />);
    
    // 대화형 예약·구매 엔진
    expect(screen.getByText(/대화형 예약·구매 엔진/i)).toBeInTheDocument();
    expect(screen.getByText(/Conversational Booking/i)).toBeInTheDocument();
    
    // 행정 및 민원 서류 대행 가이드
    expect(screen.getByText(/행정 및 민원 서류 대행 가이드/i)).toBeInTheDocument();
    expect(screen.getByText(/Administrative Support/i)).toBeInTheDocument();
    
    // 시니어 특화 오프라인 동행 매칭
    expect(screen.getByText(/시니어 특화 오프라인 동행 매칭/i)).toBeInTheDocument();
    expect(screen.getByText(/Senior Companion Service/i)).toBeInTheDocument();
  });

  it('각 기능의 서비스 목록이 렌더링되어야 함', () => {
    render(<Features />);
    
    // 대화형 예약·구매 엔진 서비스들
    expect(screen.getByText(/기차표\/버스표 예매/i)).toBeInTheDocument();
    expect(screen.getByText(/병원 진료 예약/i)).toBeInTheDocument();
    expect(screen.getByText(/골프장 부킹/i)).toBeInTheDocument();
    expect(screen.getByText(/인기 식당 예약/i)).toBeInTheDocument();
    
    // 행정 서류 대행 서비스들
    expect(screen.getByText(/주민등록등본 발급/i)).toBeInTheDocument();
    expect(screen.getByText(/건강보험 납부확인서/i)).toBeInTheDocument();
    expect(screen.getByText(/정부24 업무 지원/i)).toBeInTheDocument();
    
    // 동행 매칭 서비스들
    expect(screen.getByText(/병원 동행 서비스/i)).toBeInTheDocument();
    expect(screen.getByText(/수납 및 처방전 수령 도움/i)).toBeInTheDocument();
    expect(screen.getByText(/전문 동행 매니저 연결/i)).toBeInTheDocument();
  });

  it('각 기능의 설명이 렌더링되어야 함', () => {
    render(<Features />);
    
    expect(screen.getByText(/카카오톡 형태의 채팅창에서/i)).toBeInTheDocument();
    expect(screen.getByText(/복잡한 보안 인증 과정을 비서가 원격으로 안내하거나/i)).toBeInTheDocument();
    expect(screen.getByText(/단순 예약에서 나아가/i)).toBeInTheDocument();
  });

  it('올바른 섹션 ID를 가져야 함', () => {
    const { container } = render(<Features />);
    
    const section = container.querySelector('section#features');
    expect(section).toBeInTheDocument();
  });
});

