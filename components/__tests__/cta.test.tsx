import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CTA from '@/components/cta';

describe('CTA Component', () => {
  it('메인 타이틀이 렌더링되어야 함', () => {
    render(<CTA />);
    
    const title = screen.getByText(/지금 바로 시작해보세요/i);
    expect(title).toBeInTheDocument();
  });

  it('설명 텍스트가 렌더링되어야 함', () => {
    render(<CTA />);
    
    const description = screen.getByText(/복잡한 디지털 업무를 간단한 대화로 해결하는 경험을 무료로 체험해보세요/i);
    expect(description).toBeInTheDocument();
  });

  it('CTA 버튼들이 렌더링되어야 함', () => {
    render(<CTA />);
    
    const startButton = screen.getByRole('button', { name: /무료 체험 시작하기/i });
    expect(startButton).toBeInTheDocument();
    
    const learnMoreButton = screen.getByRole('button', { name: /자세히 알아보기/i });
    expect(learnMoreButton).toBeInTheDocument();
  });

  it('통계 정보가 렌더링되어야 함', () => {
    render(<CTA />);
    
    expect(screen.getByText(/24\/7/i)).toBeInTheDocument();
    expect(screen.getByText(/상담 지원/i)).toBeInTheDocument();
    
    expect(screen.getByText(/100%/i)).toBeInTheDocument();
    expect(screen.getByText(/안전한 결제/i)).toBeInTheDocument();
    
    // "무료"는 여러 곳에 나타나므로 getAllByText 사용
    const freeTexts = screen.getAllByText(/무료/i);
    expect(freeTexts.length).toBeGreaterThan(0);
    expect(screen.getByText(/체험 가능/i)).toBeInTheDocument();
  });

  it('올바른 섹션 클래스를 가져야 함', () => {
    const { container } = render(<CTA />);
    
    const section = container.querySelector('section');
    expect(section).toHaveClass('bg-gradient-to-r', 'from-blue-600', 'to-purple-600');
  });
});

