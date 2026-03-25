import { Inter, Playfair_Display, Noto_Serif_JP } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const notoSerifJP = Noto_Serif_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-serif-jp",
  preload: false,
  text: "\u9580\u9053\u6280\u6226\u4F5C\u8A89\u7D50",
});
