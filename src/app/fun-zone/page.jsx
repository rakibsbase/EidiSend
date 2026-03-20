import EidPersonality from "@/components/funZone/EidPersonality";
import SalamiCalculator from "@/components/funZone/SalamiCalculator";
import SurpriseBox from "@/components/funZone/SurpriseBox";

export const metadata = {
  title: "Eid Fun Zone - Salami Calculator & Games",
  description: "Experience the Joy of Eid with our Fun Zone. Calculate your Salami, take the Eid Personality Quiz, and more!",
};

export default function FunZonePage() {
  return (
    <main className="w-full min-h-screen bg-page py-12 md:py-16">
      <div className="max-w-[91.666667%] mx-auto flex flex-col gap-6">

        {/* Page Header */}
        <div className="text-center">
          <p className="text-sm font-medium mb-2 text-brand-theme">
            You found it 🎉
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-2 text-theme-primary">
            The Fun Zone
          </h1>
          <p className="text-sm max-w-sm mx-auto text-theme-subtle">
            No Salami here. Just chaos, questionable quizzes, and a 
            calculator that judges you.
          </p>
        </div>

        {/* Row 1 — SurpriseBox full width */}
        <div className="w-full">
          <SurpriseBox />
        </div>

        {/* Row 2 — Calculator + Quiz */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
          <SalamiCalculator />
          <EidPersonality />
        </div>

      </div>
    </main>
  );
}
