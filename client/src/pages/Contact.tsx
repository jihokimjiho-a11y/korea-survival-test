import SiteFooter from "../components/SiteFooter";

export default function Contact() {
  return (
    <div className="legal-page">
      <header className="legal-header"><a href="/" className="legal-back">← 테스트로 돌아가기</a><span>KOREA SURVIVAL TEST</span></header>
      <main className="legal-content contact-content">
        <p className="legal-eyebrow">CONTACT</p>
        <h1>문의하기</h1>
        <div className="legal-copy">
          <p>대한민국 생존 테스트와 관련된 문의,<br />오류 신고, 광고 및 기타 문의는 아래 이메일로 보내주세요.</p>
          <p className="email-label">이메일:</p>
          <p className="email-placeholder">[운영자 이메일 입력]</p>
          <p>확인 후 가능한 범위에서 답변드리겠습니다.</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
