export default function Pricing() {
  const plans = [
    {
      name: "Basic",
      subtitle: "월간 구독권",
      price: "19,900",
      period: "월",
      description: "월 3회 예매 대행, 24시간 전화 상담 지원",
      features: [
        "월 3회 예매 대행",
        "24시간 전화 상담 지원",
        "기차표/버스표 예매",
        "병원 진료 예약",
        "식당 예약 대행",
      ],
      popular: false,
    },
    {
      name: "Gold",
      subtitle: "프리미엄 구독",
      price: "49,900",
      period: "월",
      description: "무제한 예매 대행, 병원 동행 매칭 할인, 자녀 리포트 제공",
      features: [
        "무제한 예매 대행",
        "병원 동행 매칭 할인",
        "자녀 리포트 제공",
        "행정 서류 대행 가이드",
        "우선 상담 지원",
        "패밀리 페이 기능",
      ],
      popular: true,
    },
    {
      name: "Pay-per-use",
      subtitle: "건당 이용료",
      price: "3,000",
      period: "건당",
      description: "비구독자 대상 단발성 예약 대행",
      features: [
        "단발성 예약 대행",
        "기차표/버스표 예매",
        "병원 진료 예약",
        "식당 예약",
        "건당 3,000~5,000원",
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            요금제
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            사용 패턴에 맞는 최적의 플랜을 선택하세요
          </p>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-6 sm:p-8 ${
                plan.popular
                  ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl md:transform md:scale-105"
                  : "bg-gray-50 border-2 border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                  인기 플랜
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={`text-sm mb-4 ${plan.popular ? "text-blue-100" : "text-gray-600"}`}>
                  {plan.subtitle}
                </p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={`ml-2 ${plan.popular ? "text-blue-100" : "text-gray-600"}`}>
                    원 / {plan.period}
                  </span>
                </div>
                <p className={`mt-4 text-sm ${plan.popular ? "text-blue-100" : "text-gray-600"}`}>
                  {plan.description}
                </p>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg
                      className={`w-5 h-5 mr-2 mt-0.5 flex-shrink-0 ${
                        plan.popular ? "text-yellow-400" : "text-green-500"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className={plan.popular ? "text-white" : "text-gray-700"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-full font-semibold transition-all ${
                  plan.popular
                    ? "bg-white text-blue-600 hover:bg-gray-100"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                시작하기
              </button>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            B2B 파트너십 문의는 별도로 연락주세요
          </p>
          <button className="text-blue-600 hover:text-blue-700 font-semibold">
            B2B 문의하기 →
          </button>
        </div>
      </div>
    </section>
  );
}

