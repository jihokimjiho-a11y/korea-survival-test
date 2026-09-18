import { describe, expect, it, vi } from "vitest";
import { createShareData, shareResult } from "./shareResult";

describe("result sharing", () => {
  const input = {
    origin: "https://koreatest.example",
    pathname: "/",
    typeArt: "salary",
    daysLabel: "23일",
    typeIcon: "💸",
    typeTitle: "월급 환승형",
  };

  it("includes the exact displayed result, type, and URL", () => {
    const data = createShareData(input);
    expect(data.text).toBe("나의 대한민국 생존 가능 기간은 23일!\n\n💸 월급 환승형\n\n당신은 대한민국에서 며칠이나 버틸 수 있을까요?\n\nhttps://koreatest.example/?result=salary&days=23%EC%9D%BC");
    expect(data.url).toBe("https://koreatest.example/?result=salary&days=23%EC%9D%BC");
  });

  it("keeps special result labels such as 오늘 and 365일+ unchanged", () => {
    expect(createShareData({ ...input, daysLabel: "오늘" }).text).toContain("나의 대한민국 생존 가능 기간은 오늘!");
    expect(createShareData({ ...input, daysLabel: "365일+" }).text).toContain("나의 대한민국 생존 가능 기간은 365일+!");
  });

  it("uses the mobile default share sheet without copying", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    const writeText = vi.fn();
    const result = await shareResult(createShareData(input), { share, clipboard: { writeText } });
    expect(result).toBe("shared");
    expect(share).toHaveBeenCalledOnce();
    expect(writeText).not.toHaveBeenCalled();
  });

  it("does not copy when the user cancels the mobile share sheet", async () => {
    const share = vi.fn().mockRejectedValue(new DOMException("Share canceled", "AbortError"));
    const writeText = vi.fn();
    await expect(shareResult(createShareData(input), { share, clipboard: { writeText } })).rejects.toThrow("Share canceled");
    expect(writeText).not.toHaveBeenCalled();
  });

  it("copies the complete share message only when native sharing is unavailable", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    const data = createShareData(input);
    const result = await shareResult(data, { clipboard: { writeText } });
    expect(result).toBe("copied");
    expect(writeText).toHaveBeenCalledWith(data.text);
  });
});
