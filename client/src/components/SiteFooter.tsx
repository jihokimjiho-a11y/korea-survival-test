export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <nav className="footer-links" aria-label="사이트 안내">
        <a href="/privacy">개인정보처리방침</a>
        <span aria-hidden="true">·</span>
        <a href="/contact">문의하기</a>
      </nav>
      <p>© 2026 대한민국 생존 테스트</p>
      <p>본 테스트의 결과는 재미를 위한 참고용이며 실제 금융 진단이 아닙니다.</p>
    </footer>
  );
}
