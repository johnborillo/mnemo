import { useState, useCallback, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

function NoveltyChart({ noveltyData }) {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Disable animations after initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFirstRender(false);
    }, 1000); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = useCallback((state) => {
    if (state && state.activeTooltipIndex !== undefined) {
      setHoveredIndex(state.activeTooltipIndex);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const sortedData = [...noveltyData]
    .filter(item => new Date(item.date) >= sevenDaysAgo)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow p-6">
      <h2 className="text-lg font-bold mb-4">Novelty Over Time</h2>
      <ResponsiveContainer width={800} height={400}>
        <LineChart
          data={sortedData}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
          <XAxis dataKey="date" className="text-xs" />
          <YAxis />
          <Tooltip
            active={true}
            isAnimationActive={!isFirstRender}
          />
          <Line
            type="monotone"
            dataKey="novelty"
            stroke="#4B6858"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
            isAnimationActive={isFirstRender}
          />
        </LineChart>
      </ResponsiveContainer>
      <div
        className={`
        overflow-hidden transition-all duration-500 ease-in-out
        ${hoveredIndex !== null 
          ? 'max-h-[400px] opacity-100 mt-4' 
          : 'max-h-0 opacity-0 mt-0'
        }
      `}
      >
        <div className="p-6 rounded-lg bg-gray-50 border border-gray-100 shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">Date:</span>
                  <span className="font-medium">{sortedData[hoveredIndex]?.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">Perceived Length:</span>
                  <span className="font-medium">{sortedData[hoveredIndex]?.perceivedLength}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">Unique Places Visited:</span>
                  <span className="font-medium">{sortedData[hoveredIndex]?.uniquePlaces}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">New People Encountered:</span>
                  <span className="font-medium">{sortedData[hoveredIndex]?.newPeople}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">Photo Bursts:</span>
                  <span className="font-medium">{sortedData[hoveredIndex]?.photoBursts}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">Task Switches:</span>
                  <span className="font-medium">{sortedData[hoveredIndex]?.taskSwitches}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 pt-3 border-t border-gray-200">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">Mood:</span>
                  <span className="font-medium">{sortedData[hoveredIndex]?.emotionMood}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">Novelty:</span>
                  <span className="font-medium">{sortedData[hoveredIndex]?.novelty}</span>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoveltyChart;
