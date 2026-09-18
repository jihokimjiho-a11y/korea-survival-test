/// <reference types="vite/client" />

declare global {
  interface Window {
    Kakao?: {
      isInitialized?: () => boolean;
      init: (appKey: string) => void;
      Share: { sendDefault: (payload: Record<string, unknown>) => void };
    };
  }
}

export {};
