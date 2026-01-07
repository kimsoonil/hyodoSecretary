import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/footer';

describe('Footer Component', () => {
  it('회사명이 렌더링되어야 함', () => {
    render(<Footer />);
    
    const companyNames = screen.getAllByText(/스마트 어시스턴트/i);
    expect(companyNames.length).toBeGreaterThan(0);
    // h3 태그에 있는 회사명 확인
    expect(companyNames[0]).toBeInTheDocument();
  });

  it('슬로건이 렌더링되어야 함', () => {
    render(<Footer />);
    
    const slogan = screen.getByText(/어려운 스마트 용무, 이제 채팅 한 통으로 해결하세요/i);
    expect(slogan).toBeInTheDocument();
  });

  it('서비스 섹션 링크들이 렌더링되어야 함', () => {
    render(<Footer />);
    
    expect(screen.getByText(/서비스 소개/i)).toBeInTheDocument();
    expect(screen.getByText(/이용 방법/i)).toBeInTheDocument();
    expect(screen.getByText(/요금제/i)).toBeInTheDocument();
  });

  it('회사 섹션 링크들이 렌더링되어야 함', () => {
    render(<Footer />);
    
    expect(screen.getByText(/회사 소개/i)).toBeInTheDocument();
    expect(screen.getByText(/채용/i)).toBeInTheDocument();
    expect(screen.getByText(/파트너십/i)).toBeInTheDocument();
  });

  it('고객지원 섹션 링크들이 렌더링되어야 함', () => {
    render(<Footer />);
    
    expect(screen.getByText(/자주 묻는 질문/i)).toBeInTheDocument();
    expect(screen.getByText(/문의하기/i)).toBeInTheDocument();
    expect(screen.getByText(/이용약관/i)).toBeInTheDocument();
  });

  it('저작권 정보가 렌더링되어야 함', () => {
    render(<Footer />);
    
    const copyright = screen.getByText(/© 2024 스마트 어시스턴트/i);
    expect(copyright).toBeInTheDocument();
  });

  it('올바른 footer 클래스를 가져야 함', () => {
    const { container } = render(<Footer />);
    
    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('bg-gray-900', 'text-gray-300');
  });
});

