// app/layout.jsx
import { DM_Sans, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata = {
  title: "Smart AI Hub - AI Operations for Local Businesses",
  description:
    "One platform with AI receptionist, workflow automations, and document intelligence - pre-built for your industry. Live in under an hour.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetBrainsMono.variable}`}
    >
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
