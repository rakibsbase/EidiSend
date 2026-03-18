import CTABanner from "@/components/home/CTABanner";
import HeroBanner from "@/components/home/HeroBanner";
import MotivationGenerator from "@/components/home/MotivationGenerator";
import WhySendSalami from "@/components/home/WhySendSalami";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroBanner />
      <WhySendSalami />
      <MotivationGenerator />
      <CTABanner />
    </div>
  );
}
