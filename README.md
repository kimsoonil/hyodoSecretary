# 스마트 어시스턴트 - 포트폴리오 랜딩 페이지

## 프로젝트 개요

"어려운 스마트 용무, 이제 채팅 한 통으로 해결하세요"를 슬로건으로 하는 디지털 심부름 서비스의 포트폴리오용 랜딩 페이지입니다.

### 주요 기능

- **대화형 예약·구매 엔진**: 기차표, 병원 예약, 식당 예약 등을 채팅으로 간편하게
- **행정 및 민원 서류 대행**: 복잡한 정부24 업무를 대행
- **시니어 특화 오프라인 동행 매칭**: 병원 동행 서비스 제공

### 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Deployment**: Vercel (권장)

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
```

### 프로덕션 실행

```bash
npm start
```

## 프로젝트 구조

```
smart-assistant/
├── app/
│   ├── layout.tsx      # 루트 레이아웃
│   ├── page.tsx        # 메인 페이지
│   └── globals.css     # 전역 스타일
├── components/
│   ├── navbar.tsx      # 네비게이션 바
│   ├── hero.tsx        # 히어로 섹션
│   ├── features.tsx    # 기능 소개
│   ├── how-it-works.tsx # 사용 방법
│   ├── pricing.tsx     # 요금제
│   ├── cta.tsx         # 행동 유도 섹션
│   └── footer.tsx      # 푸터
└── package.json
```

## 주요 특징

- ✅ 완전 반응형 디자인 (모바일 우선)
- ✅ 부드러운 스크롤 네비게이션
- ✅ 모던한 UI/UX 디자인
- ✅ 접근성 고려 (ARIA 라벨 등)
- ✅ SEO 최적화

## 배포

Vercel에 배포하는 것을 권장합니다:

```bash
npm install -g vercel
vercel
```

또는 GitHub에 푸시한 후 Vercel 대시보드에서 연결하세요.

## 라이선스

포트폴리오용 프로젝트입니다.
