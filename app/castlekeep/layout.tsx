import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CastleKeep | headwinds",
  robots: { index: false, follow: false },
};

export default function CastleKeepLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
