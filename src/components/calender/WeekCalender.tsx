import { getHours, getWeekDays } from "@/lib/getTime";
import { useDateStore } from "@/store/store";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { ScrollArea } from "../ui/scroll-area";
import { Circle } from "lucide-react";

const WeekCalender = () => {
  const { userSelectedDate } = useDateStore();

  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_1fr_1fr] place-items-center px-4 py-2">
        <div className="w-16 border-gray-300 mt-3">
          <div className="relative h-16">
            <div className="absolute top-2 text-xs text-gray-600">
              GMT +05:30
            </div>
          </div>
        </div>
        {getWeekDays(userSelectedDate).map(({ currentDate, today }, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={cn("text-xs", today && "text-blue-600")}>
              {currentDate.format("ddd")}
            </div>
            <div
              className={cn(
                "h-12 w-12 rounded-full p-2 text-2xl",
                today && "bg-blue-600 text-white"
              )}
            >
              {currentDate.format("DD")}{" "}
            </div>
          </div>
        ))}
      </div>

      <ScrollArea className="h-[70vh]">
        <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_1fr_1fr] px-4 py-2">
          <div className="w-16 border-r border-gray-300">
            {getHours.map((hour, index) => (
              <div key={index} className="relative h-12">
                <div className="absolute -top-2 text-xs text-gray-600">
                  {hour.format("h A")}
                </div>
              </div>
            ))}
          </div>

          {getWeekDays(userSelectedDate).map(
            ({ isCurrentDay, today }, index) => {
              const dayDate = userSelectedDate
                .startOf("week")
                .add(index, "day");

              return (
                <div key={index} className="relative border-r border-gray-300">
                  {getHours.map((hour, i) => (
                    <div
                      key={i}
                      className="relative flex h-12 cursor-pointer flex-col items-center gap-y-2 border-b border-gray-300 hover:bg-gray-100"
                    ></div>
                  ))}
                  {/* Current time indicator */}

                  {isCurrentDay(dayDate) && today && (
                    <div
                      className={cn(
                        "flex items-center justify-center absolute mt-6 h-0.5 w-full bg-red-500"
                      )}
                      style={{
                        top: `${(currentTime.hour() / 24) * 100}%`,
                      }}
                    >
                      <div className="absolute px-2 -translate-x-1/2 bg-white left-1/2">
                        <Circle className="w-3 h-3" color="red" />
                      </div>
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>
      </ScrollArea>
    </>
  );
};

export default WeekCalender;
