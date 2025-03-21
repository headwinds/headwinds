import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
//import "cross-country/dist/bundle.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import App from "./app";

const inter = Inter({ subsets: ["latin"] });
const GA_TRACKING_ID = "G-PEMG3PDD0R";

export const metadata: Metadata = {
  title: "headwinds",
  description: "a prometheus of web desgin & development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <App>{children}</App>
        <GoogleAnalytics gaId={GA_TRACKING_ID} />
      </body>
    </html>
  );
}
