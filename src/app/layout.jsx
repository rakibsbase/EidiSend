import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import StructuredData from "@/components/shared/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "EidiSend - Send Digital Eid Salami & Gifts Bangladesh",
    template: "%s | EidiSend",
  },
  alternates: {
    canonical: "https://eidisend.com",
  },
  description: "EidiSend is the fastest, most secure way to send digital Eid Salami and blessings to your loved ones in Bangladesh. Share joy this Eid with digital gifts.",
  keywords: ["send Eid gift Bangladesh", "digital Salami", "Eid Mubarak gifts online Bangladesh", "EidiSend", "send money Eid", "Bangladesh Eid gifts"],
  authors: [{ name: "Rakib Aziz" }],
  creator: "Rakib Aziz",
  publisher: "EidiSend",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "EidiSend - Send Digital Eid Salami & Gifts Bangladesh",
    description: "The fastest and most secure way to send digital Eid Salami to your loved ones this Eid!",
    url: "https://eidisend.com",
    siteName: "EidiSend",
    images: [
      {
        url: "/eid_salami_bangladesh.webp",
        width: 1200,
        height: 630,
        alt: "EidiSend - Send Digital Salami",
      },
    ],
    locale: "en_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EidiSend - Send Digital Eid Salami & Gifts Bangladesh",
    description: "The fastest and most secure way to send digital Eid Salami to your loved ones this Eid!",
    images: ["/eid_salami_bangladesh.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}else{document.documentElement.style.colorScheme='light';}}catch(e){}})();` }} />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StructuredData />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
