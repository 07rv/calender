import { cn } from "@/lib/utils";
import { useDateStore, useEventStore } from "@/store/store";
import dayjs from "dayjs";

const MonthViewBox = ({
  day,
  rowIndex,
}: {
  day: dayjs.Dayjs | null;
  rowIndex: number;
}) => {
  if (!day) {
    return (
      <div className="h-12 w-full border md:h-28 md:w-full lg:h-full"></div>
    );
  }
  const { openPopover, events } = useEventStore();
  const { setDate } = useDateStore();
  const isFirstDayOfMonth = day.date() === 1;
  const isToday = day.format("DD-MM-YY") === dayjs().format("DD-MM-YY");

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setDate(day);
    openPopover();
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col items-center gap-y-2 border",
        "transition-all hover:bg-violet-50"
      )}
      onClick={handleClick}
    >
      <div className="flex flex-col item-center">
        {rowIndex === 0 && (
          <h4 className="text-xs text-gray-500">
            {day.format("ddd").toUpperCase()}
          </h4>
        )}
        <h4
          className={cn(
            "text-center mt-1 text-sm",
            isToday &&
              "flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white"
          )}
        >
          {isFirstDayOfMonth ? day.format("MMM D") : day.format("D")}
        </h4>
      </div>
    </div>
  );
};

export default MonthViewBox;
