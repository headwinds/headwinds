import type { Metadata } from "next";
import { Agbalumo, Inter } from "next/font/google";
import "./globals.css";
//import "cross-country/dist/bundle.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { MDXLayout } from "./mdx-layout";
import App from "./app";

const inter = Inter({ subsets: ["latin"] });
const agbalumo = Agbalumo({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-agbalumo",
});
const GA_TRACKING_ID = "G-PEMG3PDD0R";

export const metadata: Metadata = {
  title: "headwinds",
  description: "a prometheus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${agbalumo.variable}`}>
        <MDXLayout>
          <App>{children}</App>
        </MDXLayout>
        <GoogleAnalytics gaId={GA_TRACKING_ID} />
      </body>
    </html>
  );
}
