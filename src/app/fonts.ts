import { Kalam, Dancing_Script } from "next/font/google";
import localFont from "next/font/local";

export const kalam = Kalam({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const perpetua = localFont({
  src: "./fonts/perpetua.ttf",
  variable: "--font-perpetua",
});
