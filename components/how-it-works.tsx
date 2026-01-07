export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "No-Manual UI",
      description: "매뉴얼이 필요 없는 단순성. 큰 글씨, 고대비 색상, 음성 인식 우선으로 누구나 쉽게 이용할 수 있습니다.",
      icon: "🎯",
    },
    {
      number: "02",
      title: "자녀 공유 기능",
      description: "부모님이 예매한 내역(기차 시간, 병원 예약 등)이 자녀에게 실시간 알림으로 전송되어 안심을 제공합니다.",
      icon: "👨‍👩‍👧",
    },
    {
      number: "03",
      title: "Safe-Payment",
      description: "자녀의 카드를 미리 등록해두면, 부모님이 요청한 건에 대해 자녀가 승인 버튼만 누르면 결제되는 '패밀리 페이'를 제공합니다.",
      icon: "💳",
    },
    {
      number: "04",
      title: "하이브리드 상담",
      description: "단순 검색은 AI가, 실제 결제 및 복잡한 예약은 전문 교육을 받은 컨시어지 상담원이 처리하여 신뢰도를 확보합니다.",
      icon: "🤝",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            사용자 경험 설계 전략
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            시니어와 자녀 모두를 위한 안전하고 편리한 서비스
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <div className="text-blue-600 font-bold text-sm mb-2">{step.number}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

