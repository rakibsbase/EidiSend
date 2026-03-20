/**
 * @file page.jsx
 * @description The main landing page of EidiSend. 
 * Orchestrates various home components to provide a compelling product overview.
 */

import CTABanner from "@/components/home/CTABanner";
import HeroBanner from "@/components/home/HeroBanner";
import MotivationGenerator from "@/components/home/MotivationGenerator";
import WhySendSalami from "@/components/home/WhySendSalami";

export const metadata = {
  title: "EidiSend - Send Digital Eid Salami in Bangladesh",
  description: "Welcome to EidiSend. The premium platform for sending digital Eid Salami and celebrating holiday traditions across distance.",
  openGraph: {
    title: "EidiSend - Digital Salami Platform",
    description: "Send Eid Salami instantly with a personal touch.",
  }
};

export default function Home() {
  return (
    <main className="min-h-screen bg-page">
      {/* Visual core of the landing page */}
      <HeroBanner />
      
      {/* Informative value-proposition section */}
      <WhySendSalami />
      
      {/* Engagement-focused interactive section */}
      <MotivationGenerator />
      
      {/* Final conversion-focused banner */}
      <CTABanner />
    </main>
  );
}

