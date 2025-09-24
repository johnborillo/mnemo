'use client';
import Link from "next/link";

export default function About() {
  return (
    <main className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-5xl font-extrabold text-center text-[#4B6858] mb-10">About Mnemo</h1>
        
        <div className="prose prose-lg prose-blue text-gray-700">
          <p className="lead text-xl text-gray-800 mb-8">
            This app helps you understand how your days <strong className="text-[#4B6858]">feel</strong> in
            hindsight — why some days fly by, while others feel long and rich.
          </p>

          <h2 className="text-3xl font-bold text-[#4B6858] mt-12 mb-4 border-b-2 border-[#D0F0DE] pb-2">How It Works</h2>
          <p>
            Every night you log how long the day <em>felt</em> on a 0–100 slider.
            Along with that, you can tag things like how many new places you went,
            new people you met, photos you took, task switches, and your mood.
          </p>
          <p>
            These signals combine into something we call <strong className="text-[#4B6858]">novelty</strong>.
            The more unusual and varied your day is compared to your personal
            baseline, the higher your novelty score.
          </p>

          <h2 className="text-3xl font-bold text-[#4B6858] mt-12 mb-4 border-b-2 border-[#D0F0DE] pb-2">What “Novelty” Means</h2>
          <p>
            Novelty isn’t just doing a lot — it’s about how different today was
            compared to your <em>usual</em>. For example:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>If you normally go to 1 place but today you went to 4 → that’s novel.</li>
            <li>If you usually meet nobody new but today you met 3 people → novel.</li>
            <li>If you took way more photos than normal → novel.</li>
          </ul>

          <h2 className="text-3xl font-bold text-[#4B6858] mt-12 mb-4 border-b-2 border-[#D0F0DE] pb-2">Why Standard Deviation Matters</h2>
          <p>
            To measure “different,” the app looks at your average behavior and how
            much it normally varies (this is called{" "}
            <strong className="text-[#4B6858]">standard deviation</strong>). Then it scores each day by how
            far it is from your personal norm (a <strong className="text-[#4B6858]">z-score</strong>).
          </p>
          <p>
            Example: If you usually visit 2 places a day (average) with a spread of
            ±1 (SD), then a day with 4 places = <strong className="text-[#4B6858]">+2 SD</strong> = unusually
            novel.
          </p>

          <h2 className="text-3xl font-bold text-[#4B6858] mt-12 mb-4 border-b-2 border-[#D0F0DE] pb-2">Novelty Density</h2>
          <p>
            Your daily novelty score is the sum of all those z-scores:
          </p>
          <p className="italic text-[#4B6858] text-lg">
            Novelty = places + people + photos + task switches (+ mood variability)
          </p>
          <p>
            Positive = richer, more unusual than normal. Negative = more routine.
          </p>

          <h2 className="text-3xl font-bold text-[#4B6858] mt-12 mb-4 border-b-2 border-[#D0F0DE] pb-2">Link to Felt Time</h2>
          <p>
            Research shows that richer, more novel days get encoded with more
            memory “chunks,” which makes them feel longer in hindsight. Routine days
            leave fewer traces and feel shorter.
          </p>
          <p>
            The app compares your <strong className="text-[#4B6858]">novelty density</strong> with your{" "}
            <strong className="text-[#4B6858]">perceived length</strong> rating to see what really stretches
            time for you.
          </p>

          <h2 className="text-3xl font-bold text-[#4B6858] mt-12 mb-4 border-b-2 border-[#D0F0DE] pb-2">What You’ll See</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong className="text-[#4B6858]">Weekly Summary:</strong> average perceived length and how
              strongly novelty and time feelings correlated.
            </li>
            <li>
              <strong className="text-[#4B6858]">Top Drivers:</strong> which factors (places, people, photos,
              switches) mattered most for you this week.
            </li>
            <li>
              <strong className="text-[#4B6858]">Today’s Insight:</strong> plain-language feedback, e.g.
              “Today felt long because you met more new people than usual.”
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-[#4B6858] mt-12 mb-4 border-b-2 border-[#D0F0DE] pb-2">Privacy</h2>
          <p>
            All data stays on your device. You can export it anytime as a JSON file
            if you want to analyze or share it.
          </p>

          <div className="mt-12 text-center">
            <Link 
              href="/" 
              className="inline-flex items-center px-8 py-4 bg-[#4B6858] text-white font-semibold rounded-full shadow-lg hover:bg-[#4B6858] transition-all duration-300 transform hover:scale-105"
            >
              Get Started →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
