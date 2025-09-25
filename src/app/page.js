'use client'

import Link from "next/link";
import { getJournalEntry } from "./utils/getJournalEntry";
import { useState, useEffect } from "react"
import { getTopTwoDrivers } from "./utils/getTopTwoDrivers";
import { getTodayDateString } from "./utils/getTodayDateString";
import RecentDaysOverview from "./components/RecentDaysOverview";

export default function Home() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const entries = await getJournalEntry(7);
      setData(entries);
      setLoading(false);
    };
    fetchData();
  }, []);

  const today = getTodayDateString();
  const todayData = data?.[0]?.date === today ? data[0] : null;
  const loggedToday = !!todayData;

  const dayLengthText = (() => {
    if (!todayData) return "";
    if (todayData.perceivedLength <= 20) return "today flew by quick";
    if (todayData.perceivedLength <= 40) return "felt shorter than usual";
    if (todayData.perceivedLength <= 60) return "average routine day";
    if (todayData.perceivedLength <= 80) return "pretty long day";
    if (todayData.perceivedLength <= 100) return "felt longer than usual";
  })();

  return (
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
        ) : loggedToday ? (
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
      <div className="mb-4 ">
        <h2 className="text-lg font-extrabold">Weekly Insights Preview</h2>
      </div>
    </div>
  );
}
