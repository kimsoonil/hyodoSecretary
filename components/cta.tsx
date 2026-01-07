export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          지금 바로 시작해보세요
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          복잡한 디지털 업무를 간단한 대화로 해결하는 경험을 무료로 체험해보세요
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
            무료 체험 시작하기
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all">
            자세히 알아보기
          </button>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-white">
          <div>
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-blue-100">상담 지원</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">100%</div>
            <div className="text-blue-100">안전한 결제</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">무료</div>
            <div className="text-blue-100">체험 가능</div>
          </div>
        </div>
      </div>
    </section>
  );
}

