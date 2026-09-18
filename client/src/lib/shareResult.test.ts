import { describe, expect, it, vi } from "vitest";
import { createResultShareData, shareResult } from "./shareResult";

describe("result sharing", () => {
  const input = {
    origin: "https://koreatest.example",
    pathname: "/",
    typeArt: "mystery",
    daysLabel: "42일",
    typeTitle: "미스터리 생존형",
  };

  it("creates a share URL that restores the exact result", () => {
    const data = createResultShareData(input);
    expect(data.url).toBe("https://koreatest.example/?result=mystery&days=42%EC%9D%BC");
    expect(data.text).toContain("미스터리 생존형");
  });

  it("uses the mobile Web Share API when available", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    const result = await shareResult(createResultShareData(input), { share });
    expect(result).toBe("shared");
    expect(share).toHaveBeenCalledWith(expect.objectContaining({ url: expect.stringContaining("result=mystery") }));
  });

  it("copies the result URL when Web Share is unavailable", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    const result = await shareResult(createResultShareData(input), { clipboard: { writeText } });
    expect(result).toBe("copied");
    expect(writeText).toHaveBeenCalledWith("https://koreatest.example/?result=mystery&days=42%EC%9D%BC");
  });
});
