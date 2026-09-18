export type ResultShareInput = {
  origin: string;
  pathname: string;
  typeArt: string;
  daysLabel: string;
  typeTitle: string;
};

export type ShareAdapter = {
  share?: (data: ShareData) => Promise<void>;
  clipboard?: { writeText: (text: string) => Promise<void> };
};

export function createResultShareData(input: ResultShareInput): ShareData {
  const params = new URLSearchParams({ result: input.typeArt, days: input.daysLabel });
  return {
    title: "대한민국 생존 테스트 결과",
    text: `나는 ${input.typeTitle}! 대한민국에서 ${input.daysLabel} 버틸 수 있어요.`,
    url: `${input.origin}${input.pathname}?${params.toString()}`,
  };
}

export async function shareResult(data: ShareData, adapter: ShareAdapter): Promise<"shared" | "copied"> {
  if (adapter.share) {
    await adapter.share(data);
    return "shared";
  }
  if (!adapter.clipboard) throw new Error("공유 기능을 지원하지 않는 브라우저입니다.");
  await adapter.clipboard.writeText(data.url ?? "");
  return "copied";
}
