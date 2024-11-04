import { GoogleAnalytics } from "@next/third-parties/google";
import "cross-country/dist/bundle.css";
import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Inter } from "next/font/google";
import Header from "@components/header/header";
import Footer from "@components/footer/footer";
import "./globals.css";

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
    <ViewTransitions>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          {children}
          <Footer />
        </body>
        <GoogleAnalytics gaId={GA_TRACKING_ID} />
      </html>
    </ViewTransitions>
  );
}
