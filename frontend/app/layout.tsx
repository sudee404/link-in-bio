import { Inter } from "next/font/google";
import { AOSInit } from "@/components/aos-init";
import Providers from "./providers";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <AOSInit />
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          <Providers> {children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
