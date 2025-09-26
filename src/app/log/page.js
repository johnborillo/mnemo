'use client'
import { CiCircleInfo } from "react-icons/ci";
import CustomTooltip from "../components/CustomTooltip";
import { useJournal } from "../contexts/JournalContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Link } from "next-view-transitions";

export default function Journal() {
  const {
    hasLoggedToday,
    perceivedLength, setPerceivedLength,
    uniquePlaces, setUniquePlaces,
    newPeople, setNewPeople,
    photoBursts, setPhotoBursts,
    taskSwitches, setTaskSwitches,
    emotionMood, setEmotionMood,
    sliderLabel,
    handleSubmit,
    clearForm
  } = useJournal();

  return (
    <>
      <div className="flex-col justify-center pl-15 pr-15">
        {hasLoggedToday ?
          <div className="flex flex-col text-center justify-center gap-4">
            <h1 className="text-center text-lg font-semibold">Your entry for today is complete.</h1>
            <p>You've captured your day's essence. Come back tomorrow to reflect on new experiences.</p>
            <div>
                <Link
                  href="/insights"
                  className="inline-flex px-6 py-3 bg-[#eaf3e8] text-[#111b0e] font-semibold rounded-full shadow-lg hover:bg-[#d3f1cd] transition-all duration-300 transform hover:scale-105"
                >
                  See Insights →
                </Link>
              </div>
          </div>
          :
          <div>
            <div className="flex justify-center">
              <h1 className="text-center text-lg font-semibold">How long did today feel?</h1>
              <CustomTooltip trigger={
                <CiCircleInfo className="inline-block mb-3 ml-1 text-gray-500 dark:text-gray-400" />
              }
                tooltipContent={"Your gut sense of how long the day felt, from very short (0) to very long (100). This is the main measure we compare against your novelty signals."}
              />
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="default-range" className="block mb-2 font-medium text-gray-900 dark:text-white">Perceived Day Length</label>
              <input
                type="range"
                value={perceivedLength}
                onChange={(e) => setPerceivedLength(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-[#4B6858]"
                id="default-range"
              />
              <p className="text-center">{sliderLabel}</p>
            </div>
            <div className="mt-6">
              <h1 className="text-lg font-semibold mb-4">Mood & Novelty</h1>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col">
                  <div>
                    <label htmlFor="unique-places" className="mb-1 font-medium text-gray-900 dark:text-white">Unique places visited</label>
                    <CustomTooltip trigger={
                      <CiCircleInfo className="inline-block mb-3 ml-1 text-gray-500 dark:text-gray-400" />
                    }
                      tooltipContent={"The number of different places you visited today. New or unusual places tend to make the day feel richer and longer in memory."}
                    />
                  </div>
                  <input
                    type="number"
                    id="unique-places"
                    name="unique-places"
                    className="p-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    value={uniquePlaces}
                    min="0"
                    onChange={(e) => setUniquePlaces(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <div>
                    <label htmlFor="new-people" className="mb-1 font-medium text-gray-900 dark:text-white">New people</label>
                    <CustomTooltip trigger={
                      <CiCircleInfo className="inline-block mb-3 ml-1 text-gray-500 dark:text-gray-400" />
                    }
                      tooltipContent={"How many new people you met or interacted with today. Meeting new faces often adds novelty and stretches how the day feels in hindsight."}
                    />
                  </div>
                  <input
                    type="number"
                    id="new-people"
                    name="new-people"
                    className="p-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    value={newPeople}
                    min="0"
                    onChange={(e) => setNewPeople(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <div>
                    <label htmlFor="photo-bursts" className="mb-1 font-medium text-gray-900 dark:text-white">Photo bursts</label>
                    <CustomTooltip trigger={
                      <CiCircleInfo className="inline-block mb-3 ml-1 text-gray-500 dark:text-gray-400" />
                    }
                      tooltipContent={"Times you took multiple photos close together. Bursts often mark special or memorable moments, which add to the sense of a longer day."}
                    />
                  </div>
                  <input
                    type="number"
                    id="photo-bursts"
                    name="photo-bursts"
                    className="p-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    value={photoBursts}
                    min="0"
                    onChange={(e) => setPhotoBursts(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <div>
                    <label htmlFor="task-switches" className="mb-1 font-medium text-gray-900 dark:text-white">Task switches (estimate)</label>
                    <CustomTooltip trigger={
                      <CiCircleInfo className="inline-block mb-3 ml-1 text-gray-500 dark:text-gray-400" />
                    }
                      tooltipContent={"Rough count of how often you switched tasks or activities. More switches can make the day feel busier and longer, while fewer can make it feel routine."}
                    />
                  </div>
                  <input
                    type="number"
                    id="task-switches"
                    name="task-switches"
                    className="p-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    value={taskSwitches}
                    min="0"
                    onChange={(e) => setTaskSwitches(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <div>
                    <label htmlFor="emotion-mood" className="mb-1 font-medium text-gray-900 dark:text-white">Emotion mood (1-5)</label>
                    <CustomTooltip trigger={
                      <CiCircleInfo className="inline-block mb-3 ml-1 text-gray-500 dark:text-gray-400" />
                    }
                      tooltipContent={"A quick snapshot of how you felt overall today. Strong or varied emotions are usually encoded more deeply, adding to the richness of the day."}
                    />
                  </div>
                  <input
                    type="number"
                    id="emotion-mood"
                    name="emotion-mood"
                    min="1"
                    max="5"
                    className="p-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    value={emotionMood}
                    onChange={(e) => setEmotionMood(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              <p>Today felt like a {sliderLabel.toLowerCase()}.</p>
              <p>I visited {uniquePlaces} unique places, encountered {newPeople} new people or topics, took {photoBursts} photo bursts, switched tasks approximately {taskSwitches} times, and rated my emotional mood as {emotionMood} out of 5.</p>
              <div className="flex gap-4">
                <Dialog>
                  <DialogTrigger><p className="mt-2 px-4 py-2 bg-[#78A78D] text-white rounded-lg hover:bg-[#2a8e55] duration-300">Save Entry</p></DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Save this journal entry?</DialogTitle>
                      <DialogDescription>
                        <p>Are you sure you want to save this journal entry? Once saved, it will be added to your log and cannot be edited.</p>
                        <div className="flex justify-end gap-4 mt-4">
                          <button onClick={handleSubmit} className="px-4 py-2 bg-[#78A78D] text-white rounded-lg hover:bg-[#2a8e55] duration-300">
                            Confirm
                          </button>
                          <button onClick={() => document.querySelector('[ data-state="open"]').click()} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 duration-300">
                            Cancel
                          </button>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <button onClick={clearForm} className="mt-2 px-4 py-2 bg-[#E56B6F] text-white rounded-lg hover:bg-[#DD3C41] duration-300">Clear Entry</button>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  )
}
