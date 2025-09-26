'use client'
import { useState, useEffect } from "react"
import { getTopTwoDrivers } from "./utils/getTopTwoDrivers";
import RecentDaysOverview from "./components/RecentDaysOverview";
import { Link } from "next-view-transitions";
import { useJournal } from "./contexts/JournalContext";
import { getJournalEntry } from "./utils/getJournalEntry";
import { processDataForInsights } from "./utils/stats";
import WelcomeModal from "./components/WelcomeModal";

export default function Home() {
  const { data, hasLoggedToday, todayData, dayLengthText, loading } = useJournal();
  const [insightsData, setInsightsData] = useState(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const days = await getJournalEntry();

      if (days.length > 0) {
        const insights = processDataForInsights(days);
        setInsightsData(insights);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingComplete = localStorage.getItem('onboardingComplete');
    if (!onboardingComplete) {
      setShowWelcomeModal(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    setShowWelcomeModal(false);
  };

  return (
    <>
      <WelcomeModal 
        isOpen={showWelcomeModal} 
        onComplete={handleOnboardingComplete}
      />
      <div className="pl-15 pr-15">
      <h1 className="mb-4 text-lg font-extrabold">Today's Status</h1>
      <div
        className="mb-4 bg-cover flex flex-col items-stretch justify-end rounded-xl pt-[132px]"
        style={{
          backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%), url("/images/background1.png")',
          backgroundPosition: 'center'
        }}
      >
        {loading ? (
          // skeleton loader
          <div className="mx-auto w-full gap-4 p-4">
            <div className="flex animate-pulse space-x-4">
              <div className="flex-1 space-y-3 py-5">
                <div className="w-[30%] h-2 rounded bg-gray-200"></div>
                <div className="space-y-3">
                  <div className="w-[10%] h-2 rounded bg-gray-200"></div>
                  <div className="h-2 w-[20%] rounded bg-gray-200"></div>
                </div>
              </div>
            </div>
          </div>
        ) : hasLoggedToday ? (
          // logged today
          <div className="flex w-full items-end justify-between gap-4 p-4">
            <div className="flex max-w-[440px] flex-1 flex-col gap-1">
              <p className="text-white tracking-light text-2xl font-bold leading-tight max-w-[440px]">
                You rated today: {todayData.perceivedLength} / 100 ({dayLengthText}).
              </p>
              <p className="text-white text-base font-medium leading-normal">
                Key drivers: {getTopTwoDrivers(todayData)}.
              </p>
            </div>
          </div>
        ) : (
          // not logged today
          <div className="flex w-full items-end justify-between gap-4 p-4">
            <div className="flex max-w-[440px] flex-1 flex-col gap-1">
              <p className="text-white tracking-light text-2xl font-bold leading-tight max-w-[440px]">
                How long did today feel?
              </p>
              <div>
                <Link
                  href="/log"
                  className="inline-flex px-6 py-3 bg-[#4B6858] text-white font-semibold rounded-full shadow-lg hover:bg-[#4B6858] transition-all duration-300 transform hover:scale-105"
                >
                  Log your day →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-extrabold mb-4">Recent Days Overview</h2>
        <RecentDaysOverview data={data} />
      </div>
      <div>
        <h2 className="text-lg font-extrabold mb-4">Weekly Insights Preview</h2>
        <div className="mb-4 bg-cover bg-gray-100 flex flex-col items-stretch justify-end rounded-xl p-[40px]">
          {loading ? (
            // skeleton loader
            <div className="mx-auto w-full gap-4 p-4">
              <div className="flex animate-pulse space-x-4">
                <div className="flex-1 space-y-3 py-5">
                  <div className="w-[30%] h-2 rounded bg-gray-200"></div>
                  <div className="space-y-3">
                    <div className="w-[10%] h-2 rounded bg-gray-200"></div>
                    <div className="h-2 w-[20%] rounded bg-gray-200"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex w-full text-center justify-center gap-4 p-4">
              <div className="flex max-w-[440px] flex-1 flex-col gap-1">
                <p className="text-black mb-2 tracking-light text-2xl font-bold leading-tight max-w-[440px]">
                  {insightsData?.enriched?.length > 7 ?
                    <div>
                      <p className="mb-1">This week, novelty {insightsData?.weeklyStats?.weeklyNoveltyImpact < 0 ? `subtracted ${insightsData?.weeklyStats?.weeklyNoveltyImpact.toFixed(2)}` : `added ${insightsData?.weeklyStats?.weeklyNoveltyImpact.toFixed(2)}`} to your days' perceived length.</p>
                      <Link
                        href="/insights"
                        className="inline-flex text-[#68907a] font-semibold transition-all duration-300 transform hover:scale-105"
                      >
                        <p className="text-md">See full insights →</p>
                      </Link>
                    </div>
                    :
                    <p className="text-md">Log at least 7 entries to get personalized weekly insights and discover trends in your days.</p>
                  }
                </p>

              </div>
            </div>
          )}
        </div>
        <div className={"text-black font-extralight"}>
          <p>Want tomorrow to feel longer? Try a new cafe on your walk!</p>
        </div>
      </div>
    </div>
    </>
  );
}
