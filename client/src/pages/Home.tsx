import { useMemo, useState } from "react";
import { ArrowRight, Check, Menu, RotateCcw, Share2, X } from "lucide-react";

type Answer = "yes" | "no";
type Answers = Record<string, Answer>;

type Question = {
  id: string;
  text: string;
  helper?: string;
  classification?: boolean;
};

const mainQuestions: Question[] = [
  { id: "q1", text: "매달 고정적으로 들어오는 돈이 있습니까?" },
  { id: "q2", text: "현재 주거비를 직접 부담하고 있습니까?" },
  { id: "q3", text: "다음 수입이 들어오기 전에 돈이 부족했던 적이 있습니까?" },
  { id: "q4", text: "예상하지 못한 10만 원 지출이 오늘 생겨도 괜찮습니까?" },
  { id: "q5", text: "지금 수입이 끊겨도 한 달은 버틸 수 있습니까?" },
  { id: "q6", text: "배달앱을 켰다가 가격을 보고 조용히 닫은 적이 있습니까?" },
  { id: "q7", text: "택시비가 아까워 30분 이상 더 걸어서 간 적이 있습니까?" },
  { id: "q8", text: "친구가 갑자기 ‘오늘 만날래?’ 하면 약속보다 잔고가 먼저 떠오릅니까?" },
  { id: "q9", text: "지금 수입이 끊겨도 세 달은 버틸 수 있습니까?" },
  { id: "q10", text: "지금 당장 100만 원이 생긴다면 절반 이상 남겨둘 자신이 있습니까?" },
];

const types = [
  { title: "대한민국 하드모드", color: "pink", icon: "🚨", art: "hard", desc: "수입은 쉬고 있는데\n지출은 정상 영업 중입니다." },
  { title: "본진 버프형", color: "mint", icon: "🏠", art: "home", desc: "고정비 걱정 없이\n버티는 중입니다." },
  { title: "월급 환승형", color: "yellow", icon: "💸", art: "salary", desc: "월급은 매달 들어옵니다.\n하지만 통장은 경유지일 뿐입니다." },
  { title: "월말 소멸형", color: "blue", icon: "🫠", art: "end", desc: "월초의 당신과\n월말의 당신은 같은 사람이 아닙니다." },
  { title: "생존 방어력 MAX형", color: "lavender", icon: "🛡️", art: "shield", desc: "갑작스러운 지출에도 흔들리지 않고\n수입이 잠시 끊겨도 버틸 수 있습니다." },
  { title: "잔고 연명형", color: "cream", icon: "🛌", art: "sleep", desc: "현재 수입은 잠시 멈췄지만\n과거의 내가 아직 먹여 살리고 있습니다." },
  { title: "비축형", color: "mint", icon: "🐿️", art: "stock", desc: "들어온 돈을 전부 쓰지 않습니다.\n미래의 나에게 식량을 보내는 타입입니다." },
  { title: "미스터리 생존형", color: "rose", icon: "👻", art: "mystery", desc: "대한민국 생존 알고리즘이\n당신의 생존 방식을 설명하지 못했습니다." },
];

const classification = (answers: Answers): Question => {
  if (answers.q1 === "yes") return { id: "classify-work", text: "그 돈은 일을 해서 받는 돈입니까?", helper: "당신의 생존 방식을 더 잘 이해하기 위한 질문입니다.", classification: true };
  return { id: "classify-school", text: "현재 학교에 다니고 있습니까?", helper: "당신의 생존 방식을 더 잘 이해하기 위한 질문입니다.", classification: true };
};

function getResult(answers: Answers) {
  const yes = (id: string) => answers[id] === "yes";
  let days = yes("q5") ? (yes("q9") ? 130 : 55) : 15;
  days += yes("q1") ? 12 : 0;
  days -= yes("q2") ? 12 : 0;
  days -= yes("q3") ? 10 : 0;
  days += yes("q4") ? 12 : 0;
  days += yes("q10") ? 7 : 0;
  if (yes("q9")) days = Math.round(days * 1.35);
  const today = !yes("q1") && !yes("q5") && !yes("q4") && yes("q3");
  if (today) return { daysLabel: "오늘", type: types[0], kicker: "오늘도 잘 버티는 당신을 위해!", detail: "내일을 계산하기엔 데이터가 부족합니다. 그래도 오늘은 살아있습니다." };
  if (yes("q1") && yes("q4") && yes("q9") && yes("q10") && !yes("q3")) {
    days = 365;
  }
  days = Math.max(7, Math.min(days, 365));

  let type = types[7];
  if (!yes("q1") && yes("q2") && !yes("q5")) type = types[0];
  else if (!yes("q1") && !yes("q2") && yes("q5")) type = types[1];
  else if (yes("q1") && yes("q4") && yes("q9")) type = types[4];
  else if (yes("q1") && yes("q3") && !yes("q4") && yes("q8")) type = types[3];
  else if (yes("q1") && yes("q3") && (yes("q2") || yes("q8"))) type = types[2];
  else if (!yes("q1") && yes("q5")) type = types[5];
  else if (yes("q9") && yes("q10")) type = types[6];
  return { daysLabel: days === 365 ? "365일+" : `${days}일`, type, kicker: "당신의 대한민국 생존 리포트", detail: type.desc.replace("\\n", " ") };
}

function PixelArt({ art }: { art: string }) {
  return (
    <div className={`pixel-art pixel-${art}`} aria-hidden="true">
      <div className="pixel-shadow" />
      <div className="pixel-head" />
      <div className="pixel-body" />
      <span className="pixel-symbol">{art === "salary" ? "₩" : art === "shield" ? "+" : art === "mystery" ? "?" : art === "sleep" ? "z" : art === "stock" ? "♪" : art === "home" ? "⌂" : art === "end" ? "31" : "!"}</span>
    </div>
  );
}

function Landscape({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className={`landscape ${mobile ? "landscape-mobile" : ""}`} aria-hidden="true">
      <div className="hill hill-back" /><div className="hill hill-front" />
      <div className="sign sign-left"><b>WORK</b><b>EAT</b><b>SAVE</b><b>SURVIVE</b></div>
      <div className="sign sign-right"><b>잘 버티고 있어요</b><b>당신은 이미</b><b>대단합니다! ♥</b></div>
      <div className="flower flower-a">✿</div><div className="flower flower-b">✿</div><div className="flower flower-c">✿</div>
      <div className="grass grass-a" /><div className="grass grass-b" />
    </div>
  );
}

export default function Home() {
  const [view, setView] = useState<"home" | "test" | "result">("home");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [menu, setMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const current = useMemo(() => {
    if (step === 1) return classification(answers);
    const index = step === 0 ? 0 : step - 1;
    return mainQuestions[index];
  }, [step, answers]);

  const result = useMemo(() => getResult(answers), [answers]);
  const progress = Math.min(Math.max(step, 1), 10);

  const start = () => { setAnswers({}); setStep(0); setView("test"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const answer = (value: Answer) => {
    const next = { ...answers, [current.id]: value };
    setAnswers(next);
    if (current.id === "q5" && value === "no") {
      setAnswers({ ...next, q9: "no" });
      setStep(10);
    } else if (step < 10) setStep(step + 1);
    else { setView("result"); window.scrollTo({ top: 0, behavior: "smooth" }); }
  };

  const copyResult = async () => {
    const text = `대한민국 생존 테스트 결과: ${result.daysLabel} · ${result.type.title}`;
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { setCopied(true); setTimeout(() => setCopied(false), 1800); }
  };

  if (view === "test") return (
    <main className="test-screen">
      <header className="topbar test-topbar">
        <button className="brand-lockup" onClick={() => setView("home")} aria-label="처음으로"><span>KOREA</span><span>SURVIVAL</span><span>TEST</span></button>
        <div className="progress-wrap"><div className="progress-label">SURVIVAL CHECK <b>{Math.max(1, progress)} / 10</b></div><div className="progress-track"><span style={{ width: `${Math.max(8, progress * 10)}%` }} /></div></div>
        <button className="icon-button" onClick={() => setMenu(!menu)} aria-label="메뉴"><Menu size={24} /></button>
      </header>
      {menu && <div className="menu-pop"><button onClick={() => setView("home")}>테스트 나가기</button><button onClick={copyResult}>결과 공유하기</button></div>}
      <section className="question-area">
        <div className="question-stamp">{current.classification ? "BONUS CHECK" : `Q${current.id.replace("q", "")}`}</div>
        <div className="speech-bubble small-bubble">오늘도, 잘 버티는 당신을 위해!</div>
        <h1>{current.text}</h1>
        {current.helper && <p className="question-helper">{current.helper}</p>}
        <p className="yes-no-hint">아래 버튼 중 하나를 골라주세요.</p>
        <div className="answer-buttons"><button onClick={() => answer("yes")} className="answer yes"><Check size={26} strokeWidth={3} /> YES</button><button onClick={() => answer("no")} className="answer no"><X size={26} strokeWidth={3} /> NO</button></div>
        <div className="question-footnote">당신의 답은 저장되지 않습니다 · 재미로만 즐겨주세요</div>
      </section>
      <Landscape mobile={false} />
    </main>
  );

  if (view === "result") return (
    <main className="result-screen">
      <header className="topbar result-topbar"><button className="brand-lockup" onClick={() => setView("home")}><span>KOREA</span><span>SURVIVAL</span><span>TEST</span></button><div className="result-top-note">YOUR SURVIVAL REPORT</div></header>
      <section className="result-card-wrap">
        <div className="speech-bubble result-bubble">오늘도, 잘 버티는 당신을 위해!</div>
        <p className="result-kicker">{result.kicker}</p>
        <h1>당신은 대한민국에서</h1>
        <div className="days-result"><strong>{result.daysLabel}</strong><span>버틸 수 있어요</span></div>
        <div className={`type-result type-${result.type.color}`}><PixelArt art={result.type.art} /><div><p className="result-label">당신의 생존 유형</p><h2>{result.type.icon} {result.type.title}</h2><p>{result.type.desc.split("\\n").map((line) => <span key={line}>{line}<br /></span>)}</p></div></div>
        <blockquote>{result.daysLabel === "오늘" ? "내일의 일은 내일의 내가." : "작은 절약이 큰 생존을 만듭니다."}</blockquote>
        <div className="result-actions"><button className="primary-button" onClick={start}><RotateCcw size={18} /> 다시 테스트하기</button><button className="secondary-button" onClick={copyResult}><Share2 size={18} /> {copied ? "복사했어요" : "결과 공유하기"}</button></div>
      </section><Landscape />
    </main>
  );

  return (
    <main className="home-screen">
      <header className="topbar home-topbar">
        <div className="heart-meter" aria-label="생존력"><span>♥</span><span>♥</span><span className="empty-heart">♥</span></div>
        <div className="brand-lockup desktop-brand"><span>KOREA</span><span>SURVIVAL</span><span>TEST</span></div>
        <nav><button className="nav-active" onClick={start}>테스트하기</button><button onClick={() => document.getElementById("types")?.scrollIntoView({ behavior: "smooth" })}>유형소개</button><button onClick={copyResult}>랭킹</button><button onClick={copyResult}>공유하기</button></nav>
        <div className="top-slogan"><span>STILL</span><span>SURVIVING</span><span>TOGETHER</span></div>
        <button className="mobile-menu" onClick={() => setMenu(!menu)} aria-label="메뉴"><Menu size={25} /></button>
      </header>
      {menu && <div className="home-menu"><button onClick={start}>테스트 시작하기</button><button onClick={() => document.getElementById("types")?.scrollIntoView({ behavior: "smooth" })}>생존 유형 보기</button></div>}
      <section className="hero">
        <div className="cloud cloud-one" /><div className="cloud cloud-two" /><div className="cloud cloud-three" />
        <div className="sun">☀</div><div className="bird">파이팅!<span>⌁</span></div>
        <div className="side-note side-left">버티는<br />당신이<br /><b>멋져요!</b> ♥</div><div className="side-note side-right">오늘도<br />잘 살아낸<br />당신에게<br />:)</div>
        <div className="hero-copy"><div className="speech-bubble">오늘도, 잘 버티는 당신을 위해!</div><h1>대한민국 <em>생존</em> 테스트</h1><p className="hero-sub">당신은 대한민국에서 얼마나 버틸 수 있을까요?</p><p className="hero-caption"><span>✦</span> 지금 당신의 생존력을 테스트해보세요! <span>✦</span></p></div>
        <div className="city city-left" /><div className="city city-right" />
      </section>
      <section id="types" className="types-section"><div className="type-grid">{types.map((item) => <article className={`type-card card-${item.color}`} key={item.title}><div className="type-art"><PixelArt art={item.art} /></div><h2>{item.title}</h2><p>{item.desc.split("\\n").map((line) => <span key={line}>{line}<br /></span>)}</p></article>)}</div><button className="start-button" onClick={start}>테스트 시작하기 <ArrowRight size={22} strokeWidth={3} /></button><p className="micro-copy">SMALL STEPS, BIG SURVIVAL</p></section>
      <Landscape />
    </main>
  );
}
