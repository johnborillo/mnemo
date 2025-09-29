import { LuCalendarCheck } from "react-icons/lu";
import { getTopTwoDrivers } from "../utils/getTopTwoDrivers";
import { getDayOfWeek } from "../utils/getDayOfWeek";

function RenderDays({ item }) {
  const topDrivers = getTopTwoDrivers(item)

  const score = (() => {
    if (!item) return "";
    if (item?.perceivedLength >= 60 && item?.perceivedLength < 70) return "⭐";
    if (item?.perceivedLength >= 70 && item?.perceivedLength < 80) return "⭐⭐";
    if (item?.perceivedLength >= 80) return "⭐⭐⭐";
  })();

  return (
    <div className="mb-3">
      <div className="flex">
        <LuCalendarCheck className="mr-4" />
        <p>{getDayOfWeek(item?.date)} ({item?.date})</p>
      </div>
      <div className="flex">
        <div
          className="ml-1.5 inline-block w-0.5 h-[40px] self-stretch bg-[#68907a]">
        </div>
        <div className={"flex items-center gap-2 mb-3 ml-6 text-[#68907a] font-extralight"}>
          <p>{item?.perceivedLength} {score}</p>
          <p>({topDrivers})</p>
        </div>
      </div>
    </div>
  )
}

export default function RecentDaysOverview({ data }) {

  return (
    <>
      <div>
        {data?.map((item, index) => (
          <RenderDays key={index} id={index - 1} item={item} />
        ))}
      </div>
    </>
  )
}
