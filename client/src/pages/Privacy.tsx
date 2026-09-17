import SiteFooter from "../components/SiteFooter";

export default function Privacy() {
  return (
    <div className="legal-page">
      <header className="legal-header"><a href="/" className="legal-back">← 테스트로 돌아가기</a><span>KOREA SURVIVAL TEST</span></header>
      <main className="legal-content">
        <p className="legal-eyebrow">POLICY</p>
        <h1>개인정보처리방침</h1>
        <div className="legal-copy">
          <p>대한민국 생존 테스트는 이용자의 개인정보 보호를 중요하게 생각합니다.</p>
          <p>본 사이트의 테스트는 회원가입 없이 이용할 수 있으며,<br />테스트 과정에서 이름, 전화번호, 주소, 주민등록번호 등의 개인정보를 직접 수집하지 않습니다.</p>
          <p>테스트에서 선택한 YES / NO 답변은 테스트 결과 계산을 위해 사용됩니다.</p>
          <p>본 사이트는 서비스 운영 및 이용 통계 분석을 위해 쿠키 또는 유사 기술을 사용할 수 있습니다.</p>
          <p>또한 Google AdSense 등 제3자 광고 서비스를 사용할 수 있으며,<br />광고 제공 과정에서 쿠키가 사용될 수 있습니다.</p>
          <p>Google을 포함한 제3자 광고 제공업체는 쿠키를 사용하여 이용자의 이전 방문 기록 등을 기반으로 광고를 제공할 수 있습니다.</p>
          <p>이용자는 Google 광고 설정 등을 통해 맞춤 광고 설정을 관리할 수 있습니다.</p>
          <p>본 개인정보처리방침은 서비스 또는 관련 법령의 변경에 따라 수정될 수 있습니다.</p>
          <p className="effective-date">시행일: 2026년 9월 17일</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
