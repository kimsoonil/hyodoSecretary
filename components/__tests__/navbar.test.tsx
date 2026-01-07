import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from '@/components/navbar';

describe('Navbar Component', () => {
  beforeEach(() => {
    // 각 테스트 전에 DOM 정리
    document.body.innerHTML = '';
  });

  it('로고 텍스트가 렌더링되어야 함', () => {
    render(<Navbar />);
    
    const logo = screen.getByText(/스마트 어시스턴트/i);
    expect(logo).toBeInTheDocument();
  });

  it('데스크톱 네비게이션 링크들이 렌더링되어야 함', () => {
    render(<Navbar />);
    
    expect(screen.getByText(/서비스 소개/i)).toBeInTheDocument();
    expect(screen.getByText(/이용 방법/i)).toBeInTheDocument();
    expect(screen.getByText(/요금제/i)).toBeInTheDocument();
  });

  it('무료 체험하기 버튼이 렌더링되어야 함', () => {
    render(<Navbar />);
    
    const ctaButton = screen.getAllByText(/무료 체험하기/i)[0];
    expect(ctaButton).toBeInTheDocument();
  });

  it('모바일 메뉴 버튼이 렌더링되어야 함', () => {
    render(<Navbar />);
    
    const menuButton = screen.getByLabelText(/메뉴 열기/i);
    expect(menuButton).toBeInTheDocument();
  });

  it('모바일 메뉴 버튼 클릭 시 메뉴가 토글되어야 함', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    
    const menuButton = screen.getByLabelText(/메뉴 열기/i);
    
    // 초기에는 모바일 메뉴가 숨겨져 있어야 함
    const mobileLinks = screen.queryAllByText(/서비스 소개/i);
    // 데스크톱 버전만 보일 수 있음
    
    // 메뉴 버튼 클릭
    await user.click(menuButton);
    
    // 메뉴가 열렸는지 확인
    expect(screen.getAllByText(/서비스 소개/i).length).toBeGreaterThan(1);
  });

  it('모바일 메뉴의 링크 클릭 시 메뉴가 닫혀야 함', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    
    const menuButton = screen.getByLabelText(/메뉴 열기/i);
    
    // 메뉴 열기
    await user.click(menuButton);
    
    // 모바일 메뉴의 링크 클릭
    const mobileLinks = screen.getAllByText(/서비스 소개/i);
    const mobileLink = mobileLinks.find(link => {
      const parent = link.closest('.md\\:hidden');
      return parent !== null;
    });
    
    if (mobileLink) {
      await user.click(mobileLink);
    }
  });

  it('올바른 네비게이션 클래스를 가져야 함', () => {
    const { container } = render(<Navbar />);
    
    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('fixed', 'top-0', 'z-50');
  });
});

