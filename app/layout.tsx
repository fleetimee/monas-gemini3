import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeTransitionProvider } from "@/components/ui/ThemeTransition";
import { BookingModalProvider } from "@/components/ui/BookingModalProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Monas | National Monument of Indonesia",
  description: "A digital tribute to the symbol of Indonesian independence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeTransitionProvider>
            <BookingModalProvider>
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </BookingModalProvider>
          </ThemeTransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
