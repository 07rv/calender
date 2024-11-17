import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useDateStore, useEventStore } from "@/store/store";
import { getHours, isCurrentDay } from "@/lib/getTime";
import { Circle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import EventRenderer from "@/components/event/EventRenderer";

const DayCalender = () => {
  const [currentTime, setCurrentTime] = useState(dayjs());
  const { userSelectedDate, setDate } = useDateStore();
  const { openPopover, events } = useEventStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const isToday =
    userSelectedDate.format("DD-MM-YY") === dayjs().format("DD-MM-YY");
  return (
    <>
      <div className="grid grid-cols-[auto_auto_1fr] px-4">
        <div className="w-16 border-r border-gray-300 text-xs">GMT +05:30</div>
        <div className="flex w-16 flex-col items-center">
          <div className={cn("text-xs", isToday && "text-blue-600")}>
            {userSelectedDate.format("ddd")}{" "}
          </div>{" "}
          <div
            className={cn(
              "h-12 w-12 rounded-full p-2 text-2xl",
              isToday && "bg-blue-600 text-white"
            )}
          >
            {userSelectedDate.format("DD")}{" "}
          </div>
        </div>
        <div></div>
      </div>

      <ScrollArea className="h-[70vh]">
        <div className="grid grid-cols-[auto_1fr] p-4">
          <div className="w-16 border-r border-gray-300">
            {getHours.map((hour, index) => (
              <div key={index} className="relative h-12">
                <div className="absolute -top-2 text-xs text-gray-600">
                  {hour.format("h A")}
                </div>
              </div>
            ))}
          </div>

          <div className="relative border-r border-gray-300">
            {getHours.map((hour, i) => (
              <div
                key={i}
                className="relative flex h-12 cursor-pointer flex-col items-center gap-y-2 border-b border-gray-300 hover:bg-gray-100"
                onClick={() => {
                  setDate(userSelectedDate.hour(hour.hour()));
                  openPopover();
                }}
              >
                <EventRenderer
                  events={events}
                  date={userSelectedDate.hour(hour.hour())}
                  view="week"
                />
              </div>
            ))}

            {isCurrentDay(userSelectedDate) && (
              <div
                className={cn(
                  "flex items-center justify-center mt-6 absolute h-0.5 w-full bg-red-500"
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
        </div>
      </ScrollArea>
    </>
  );
};

export default DayCalender;
