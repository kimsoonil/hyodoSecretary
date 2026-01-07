export default function Features() {
  const features = [
    {
      title: "대화형 예약·구매 엔진",
      subtitle: "Conversational Booking",
      description: "카카오톡 형태의 채팅창에서 '이번 주 토요일 오후 2시에 대전 가는 기차표 끊어줘'라고 말하면 상담원이 최적의 옵션을 제안하고 결제까지 완료합니다.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      services: ["기차표/버스표 예매", "병원 진료 예약", "골프장 부킹", "인기 식당 예약"],
    },
    {
      title: "행정 및 민원 서류 대행 가이드",
      subtitle: "Administrative Support",
      description: "복잡한 보안 인증 과정을 비서가 원격으로 안내하거나, 대행 가능한 서류는 위임받아 처리합니다.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      services: ["주민등록등본 발급", "건강보험 납부확인서", "정부24 업무 지원"],
    },
    {
      title: "시니어 특화 오프라인 동행 매칭",
      subtitle: "Senior Companion Service",
      description: "단순 예약에서 나아가, 대형병원 진료 시 동행하여 수납과 처방전 수령을 돕는 '동행 매니저'를 연결해드립니다.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      services: ["병원 동행 서비스", "수납 및 처방전 수령 도움", "전문 동행 매니저 연결"],
    },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            핵심 서비스 기능
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            복잡한 디지털 업무를 간단한 대화로 해결하는 3가지 솔루션
          </p>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 hover:shadow-xl transition-all transform hover:-translate-y-2"
            >
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-blue-600 font-semibold mb-4">{feature.subtitle}</p>
              <p className="text-gray-700 mb-6 leading-relaxed">{feature.description}</p>
              <ul className="space-y-2">
                {feature.services.map((service, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

