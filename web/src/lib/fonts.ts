import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

/**
 * Amazon Ember ships with only Light and Medium. There is no Regular and no
 * Bold, so nothing may ask for 400/600/700 — the browser would synthesise it.
 */
export const amazonEmber = localFont({
  src: [
    { path: "../assets/fonts/AmazonEmber-Light.woff2", weight: "300", style: "normal" },
    { path: "../assets/fonts/AmazonEmber-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-amazon-ember",
  display: "swap",
  fallback: ["-apple-system", "Segoe UI", "Helvetica", "Arial", "sans-serif"],
  // Synthesises metric overrides on the fallback so the swap doesn't shift layout.
  adjustFontFallback: "Arial",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
