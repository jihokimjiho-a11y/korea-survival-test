import { describe, expect, it, vi } from "vitest";
import { createKakaoFeedPayload, sendKakaoResult } from "./kakaoShare";

describe("Kakao Talk Share", () => {
  const input = {
    appKey: "test-js-key",
    origin: "https://koreatest.example",
    pathname: "/",
    typeArt: "salary",
    daysLabel: "23일",
    typeTitle: "월급 환승형",
    imageUrl: "https://koreatest.example/assets/salary.png",
  };

  it("builds a feed with result days, type, representative image, and result link", () => {
    const payload = createKakaoFeedPayload(input);
    expect(payload.objectType).toBe("feed");
    expect(payload.content).toMatchObject({ imageUrl: input.imageUrl });
    expect(payload.content.title).toContain("23일");
    expect(payload.content.title).toContain("월급 환승형");
    expect(payload.content.link.webUrl).toBe("https://koreatest.example/?result=salary&days=23%EC%9D%BC");
  });

  it("initializes the Kakao SDK once and sends via sendDefault", () => {
    const sendDefault = vi.fn();
    const init = vi.fn();
    const sdk = { init, Share: { sendDefault } };
    sendKakaoResult(input, sdk);
    expect(init).toHaveBeenCalledWith("test-js-key");
    expect(sendDefault).toHaveBeenCalledWith(expect.objectContaining({ objectType: "feed" }));
  });
});
