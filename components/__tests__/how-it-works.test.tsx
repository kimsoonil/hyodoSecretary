import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HowItWorks from '@/components/how-it-works';

describe('HowItWorks Component', () => {
  it('섹션 타이틀이 렌더링되어야 함', () => {
    render(<HowItWorks />);
    
    const title = screen.getByText(/사용자 경험 설계 전략/i);
    expect(title).toBeInTheDocument();
  });

  it('섹션 설명이 렌더링되어야 함', () => {
    render(<HowItWorks />);
    
    const description = screen.getByText(/시니어와 자녀 모두를 위한 안전하고 편리한 서비스/i);
    expect(description).toBeInTheDocument();
  });

  it('4개의 단계가 렌더링되어야 함', () => {
    render(<HowItWorks />);
    
    expect(screen.getByText(/No-Manual UI/i)).toBeInTheDocument();
    expect(screen.getByText(/자녀 공유 기능/i)).toBeInTheDocument();
    expect(screen.getByText(/Safe-Payment/i)).toBeInTheDocument();
    expect(screen.getByText(/하이브리드 상담/i)).toBeInTheDocument();
  });

  it('각 단계의 설명이 렌더링되어야 함', () => {
    render(<HowItWorks />);
    
    expect(screen.getByText(/매뉴얼이 필요 없는 단순성/i)).toBeInTheDocument();
    expect(screen.getByText(/부모님이 예매한 내역/i)).toBeInTheDocument();
    expect(screen.getByText(/자녀의 카드를 미리 등록해두면/i)).toBeInTheDocument();
    expect(screen.getByText(/단순 검색은 AI가/i)).toBeInTheDocument();
  });

  it('각 단계의 번호가 렌더링되어야 함', () => {
    render(<HowItWorks />);
    
    expect(screen.getByText(/01/i)).toBeInTheDocument();
    expect(screen.getByText(/02/i)).toBeInTheDocument();
    expect(screen.getByText(/03/i)).toBeInTheDocument();
    expect(screen.getByText(/04/i)).toBeInTheDocument();
  });

  it('각 단계의 아이콘이 렌더링되어야 함', () => {
    render(<HowItWorks />);
    
    expect(screen.getByText(/🎯/i)).toBeInTheDocument();
    expect(screen.getByText(/👨‍👩‍👧/i)).toBeInTheDocument();
    expect(screen.getByText(/💳/i)).toBeInTheDocument();
    expect(screen.getByText(/🤝/i)).toBeInTheDocument();
  });

  it('올바른 섹션 ID를 가져야 함', () => {
    const { container } = render(<HowItWorks />);
    
    const section = container.querySelector('section#how-it-works');
    expect(section).toBeInTheDocument();
  });
});

