import type { Metadata } from "next";
import "./styles/styles.scss";
import localFont from "next/font/local";

const title = localFont({
  src: '../public/fonts/WDXLLubrifontTC-Regular.ttf',
  variable: '--title-font',
  weight: '400',
  style: 'normal',
})

export const metadata: Metadata = {
  title: "Varis Smart Office",
  description: "Automated control of Varis Smart Office environment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={`${title.variable} varis-office`}>
        {children}
      </body>
    </html>
  );
}
