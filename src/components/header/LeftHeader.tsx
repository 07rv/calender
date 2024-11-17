"use client";

import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useDateStore, useViewStore } from "@/store/store";
import dayjs from "dayjs";

const LeftHeader = () => {
  const todaysDate = dayjs();
  const { userSelectedDate, setDate, setMonth, selectedMonthIndex } =
    useDateStore();
  const { selectedView } = useViewStore();
  const handleTodayClick = () => {
    switch (selectedView) {
      case "month":
        setMonth(dayjs().month());
        break;
      case "week":
        setDate(todaysDate);
        break;
      case "day":
        setDate(todaysDate);
        setMonth(dayjs().month());
        break;
      default:
        break;
    }
  };

  const handlePrevClick = () => {
    switch (selectedView) {
      case "month":
        setMonth(selectedMonthIndex - 1);
        break;
      case "week":
        setDate(userSelectedDate.subtract(1, "week"));
        break;
      case "day":
        setDate(userSelectedDate.subtract(1, "day"));
        break;
      default:
        break;
    }
  };

  const handleNextClick = () => {
    switch (selectedView) {
      case "month":
        setMonth(selectedMonthIndex + 1);
        break;
      case "week":
        setDate(userSelectedDate.add(1, "week"));
        break;
      case "day":
        setDate(userSelectedDate.add(1, "day"));
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="hidden items-center lg:flex">
        <Button variant="ghost" className="rounded-full p-2">
          <Menu className="size-6" />
        </Button>
        <Image
          className="mx-2"
          src={`/calendar_16_2x.png`}
          width={40}
          height={40}
          alt="calendar"
        />
        <h1 className="text-xl">Calendar</h1>
      </div>

      <Button onClick={handleTodayClick} className="mx-8" variant={"outline"}>
        Today
      </Button>

      <div className="flex items-center gap-2">
        <ChevronLeft
          onClick={handlePrevClick}
          className="size-5 cursor-pointer font-bold"
        />
        <ChevronRight
          onClick={handleNextClick}
          className="size-5 cursor-pointer font-bold"
        />
      </div>

      <h1 className="hidden text-xl lg:block">
        {selectedView == "month" ? (
          <>
            {dayjs(new Date(dayjs().year(), selectedMonthIndex)).format(
              "MMMM YYYY"
            )}
          </>
        ) : (
          <> {userSelectedDate.format("MMMM YYYY")}</>
        )}
      </h1>
    </div>
  );
};

export default LeftHeader;
