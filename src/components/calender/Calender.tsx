"use client";
import { useViewStore } from "@/store/store";

import MonthCalender from "./MonthCalender";
import Sidebar from "@/components/sidebar/Sidebar";
import WeekCalender from "./WeekCalender";
import DayCalender from "./DayCalender";

const Calender = () => {
  const { selectedView } = useViewStore();
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full flex-1">
        {selectedView === "month" && <MonthCalender />}
        {selectedView === "week" && <WeekCalender />}
        {selectedView === "day" && <DayCalender />}
      </div>
    </div>
  );
};

export default Calender;
