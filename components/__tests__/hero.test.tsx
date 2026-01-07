import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from '@/components/hero';

describe('Hero Component', () => {
  it('메인 타이틀이 렌더링되어야 함', () => {
    render(<Hero />);
    
    const mainTitle = screen.getByText(/어려운 스마트 용무/i);
    expect(mainTitle).toBeInTheDocument();
    
    const chatTitle = screen.getByText(/이제 채팅 한 통으로/i);
    expect(chatTitle).toBeInTheDocument();
  });

  it('서비스 설명이 렌더링되어야 함', () => {
    render(<Hero />);
    
    const description = screen.getByText(/복잡한 앱 조작 없이/i);
    expect(description).toBeInTheDocument();
    
    const digitalService = screen.getByText(/디지털 심부름/i);
    expect(digitalService).toBeInTheDocument();
  });

  it('CTA 버튼들이 렌더링되어야 함', () => {
    render(<Hero />);
    
    const startButton = screen.getByRole('button', { name: /무료로 시작하기/i });
    expect(startButton).toBeInTheDocument();
    
    const browseButton = screen.getByRole('button', { name: /서비스 둘러보기/i });
    expect(browseButton).toBeInTheDocument();
  });

  it('서비스 특징들이 렌더링되어야 함', () => {
    render(<Hero />);
    
    expect(screen.getByText(/무료 체험 가능/i)).toBeInTheDocument();
    expect(screen.getByText(/24시간 상담 지원/i)).toBeInTheDocument();
    expect(screen.getByText(/안전한 결제/i)).toBeInTheDocument();
  });

  it('올바른 섹션 클래스를 가져야 함', () => {
    const { container } = render(<Hero />);
    
    const section = container.querySelector('section');
    expect(section).toHaveClass('pt-32', 'pb-20');
  });
});

