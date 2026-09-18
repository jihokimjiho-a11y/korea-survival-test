export type ShareResultInput = {
  origin: string;
  pathname: string;
  typeArt: string;
  daysLabel: string;
  typeIcon: string;
  typeTitle: string;
};

export type ShareDataLike = { title: string; text: string; url: string };
export type ShareAdapter = {
  share?: (data: ShareDataLike) => Promise<void>;
  clipboard?: { writeText: (text: string) => Promise<void> };
};

export function createShareData(input: ShareResultInput): ShareDataLike {
  const params = new URLSearchParams({ result: input.typeArt, days: input.daysLabel });
  const url = `${input.origin}${input.pathname}?${params.toString()}`;
  const text = `나의 대한민국 생존 가능 기간은 ${input.daysLabel}!\n\n${input.typeIcon} ${input.typeTitle}\n\n당신은 대한민국에서 며칠이나 버틸 수 있을까요?\n\n${url}`;
  return { title: "대한민국 생존 테스트 결과", text, url };
}

export async function shareResult(data: ShareDataLike, adapter: ShareAdapter): Promise<"shared" | "copied"> {
  if (adapter.share) {
    await adapter.share(data);
    return "shared";
  }
  if (!adapter.clipboard) throw new Error("공유 기능을 지원하지 않는 브라우저입니다.");
  await adapter.clipboard.writeText(data.text);
  return "copied";
}
