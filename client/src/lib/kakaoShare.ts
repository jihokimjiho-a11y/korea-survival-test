export type KakaoShareInput = {
  appKey: string;
  origin: string;
  pathname: string;
  typeArt: string;
  daysLabel: string;
  typeTitle: string;
  imageUrl: string;
};

export type KakaoSdk = {
  isInitialized?: () => boolean;
  init: (appKey: string) => void;
  Share: { sendDefault: (payload: Record<string, unknown>) => void };
};

export function createKakaoFeedPayload(input: Omit<KakaoShareInput, "appKey">) {
  const params = new URLSearchParams({ result: input.typeArt, days: input.daysLabel });
  const resultUrl = `${input.origin}${input.pathname}?${params.toString()}`;
  const shareText = `나의 대한민국 생존 가능 기간은 ${input.daysLabel}!\n💸 ${input.typeTitle}\n당신은 대한민국에서 며칠이나 버틸 수 있을까요?`;
  return {
    objectType: "feed",
    content: {
      title: shareText,
      description: "YES / NO 질문으로 알아보는 대한민국 생존 테스트",
      imageUrl: input.imageUrl,
      link: { mobileWebUrl: resultUrl, webUrl: resultUrl },
    },
    buttons: [{ title: "테스트 결과 보기", link: { mobileWebUrl: resultUrl, webUrl: resultUrl } }],
  };
}

export function sendKakaoResult(input: KakaoShareInput, sdk: KakaoSdk): void {
  if (!input.appKey) throw new Error("VITE_KAKAO_JS_KEY가 설정되지 않았습니다.");
  if (!sdk.isInitialized?.()) sdk.init(input.appKey);
  sdk.Share.sendDefault(createKakaoFeedPayload(input));
}
