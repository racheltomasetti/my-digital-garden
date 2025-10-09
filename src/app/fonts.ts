import { Kalam, Dancing_Script, Noto_Sans } from "next/font/google";

export const kalam = Kalam({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
