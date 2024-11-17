"use client";
import { useViewStore } from "@/store/store";

import Sidebar from "@/components/sidebar/Sidebar";
import WeekCalender from "./calenders/WeekCalender";
import DayCalender from "./calenders/DayCalender";
import MonthCalender from "./calenders/MonthCalender";

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
