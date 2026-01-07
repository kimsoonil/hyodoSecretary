import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Pricing from '@/components/pricing';

describe('Pricing Component', () => {
  it('섹션 타이틀이 렌더링되어야 함', () => {
    render(<Pricing />);
    
    const title = screen.getByText(/요금제/i);
    expect(title).toBeInTheDocument();
  });

  it('섹션 설명이 렌더링되어야 함', () => {
    render(<Pricing />);
    
    const description = screen.getByText(/사용 패턴에 맞는 최적의 플랜을 선택하세요/i);
    expect(description).toBeInTheDocument();
  });

  it('3개의 요금제 플랜이 렌더링되어야 함', () => {
    render(<Pricing />);
    
    // Basic 플랜
    expect(screen.getByText(/Basic/i)).toBeInTheDocument();
    expect(screen.getByText(/월간 구독권/i)).toBeInTheDocument();
    expect(screen.getByText(/19,900/i)).toBeInTheDocument();
    
    // Gold 플랜
    expect(screen.getByText(/Gold/i)).toBeInTheDocument();
    expect(screen.getByText(/프리미엄 구독/i)).toBeInTheDocument();
    expect(screen.getByText(/49,900/i)).toBeInTheDocument();
    
    // Pay-per-use 플랜
    expect(screen.getByText(/Pay-per-use/i)).toBeInTheDocument();
    expect(screen.getByText(/건당 이용료/i)).toBeInTheDocument();
    // 가격은 여러 곳에 나타날 수 있으므로 getAllByText 사용
    const prices3000 = screen.getAllByText(/3,000/i);
    expect(prices3000.length).toBeGreaterThan(0);
  });

  it('각 플랜의 설명이 렌더링되어야 함', () => {
    render(<Pricing />);
    
    expect(screen.getByText(/월 3회 예매 대행, 24시간 전화 상담 지원/i)).toBeInTheDocument();
    expect(screen.getByText(/무제한 예매 대행, 병원 동행 매칭 할인, 자녀 리포트 제공/i)).toBeInTheDocument();
    expect(screen.getByText(/비구독자 대상 단발성 예약 대행/i)).toBeInTheDocument();
  });

  it('각 플랜의 주요 기능들이 렌더링되어야 함', () => {
    render(<Pricing />);
    
    // Basic 플랜 기능 (설명과 기능 목록 모두에 나타나므로 getAllByText 사용)
    const monthlyBookings = screen.getAllByText(/월 3회 예매 대행/i);
    expect(monthlyBookings.length).toBeGreaterThan(0);
    const support24h = screen.getAllByText(/24시간 전화 상담 지원/i);
    expect(support24h.length).toBeGreaterThan(0);
    
    // Gold 플랜 기능 (설명에도 나타나므로 getAllByText 사용)
    const unlimitedBookings = screen.getAllByText(/무제한 예매 대행/i);
    expect(unlimitedBookings.length).toBeGreaterThan(0);
    const hospitalDiscount = screen.getAllByText(/병원 동행 매칭 할인/i);
    expect(hospitalDiscount.length).toBeGreaterThan(0);
    const childReport = screen.getAllByText(/자녀 리포트 제공/i);
    expect(childReport.length).toBeGreaterThan(0);
    expect(screen.getByText(/패밀리 페이 기능/i)).toBeInTheDocument();
    
    // Pay-per-use 플랜 기능 (설명에도 나타나므로 getAllByText 사용)
    const oneTimeBooking = screen.getAllByText(/단발성 예약 대행/i);
    expect(oneTimeBooking.length).toBeGreaterThan(0);
    expect(screen.getByText(/건당 3,000~5,000원/i)).toBeInTheDocument();
  });

  it('Gold 플랜이 인기 플랜으로 표시되어야 함', () => {
    render(<Pricing />);
    
    const popularBadge = screen.getByText(/인기 플랜/i);
    expect(popularBadge).toBeInTheDocument();
  });

  it('각 플랜에 시작하기 버튼이 있어야 함', () => {
    render(<Pricing />);
    
    const startButtons = screen.getAllByText(/시작하기/i);
    expect(startButtons).toHaveLength(3);
  });

  it('B2B 문의 섹션이 렌더링되어야 함', () => {
    render(<Pricing />);
    
    expect(screen.getByText(/B2B 파트너십 문의는 별도로 연락주세요/i)).toBeInTheDocument();
    
    const b2bButton = screen.getByText(/B2B 문의하기/i);
    expect(b2bButton).toBeInTheDocument();
  });

  it('올바른 섹션 ID를 가져야 함', () => {
    const { container } = render(<Pricing />);
    
    const section = container.querySelector('section#pricing');
    expect(section).toBeInTheDocument();
  });
});

