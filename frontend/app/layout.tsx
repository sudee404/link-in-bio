import "./globals.css";
import { Inter } from "next/font/google";
import { AOSInit } from "@/components/aos-init";
import Providers from "./providers";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LinkFolio - Your Ultimate Link in Bio",
  description: "Showcase all your important links in one beautiful page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider>
        <AOSInit />
        <body className={inter.className} suppressHydrationWarning>
          <Providers> {children}</Providers>
        </body>
      </ThemeProvider>
    </html>
  );
}
