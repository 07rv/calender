"use client";
import { useDateStore, useEventStore, useViewStore } from "@/store/store";

import Sidebar from "@/components/sidebar/Sidebar";
import WeekCalender from "./calenders/WeekCalender";
import DayCalender from "./calenders/DayCalender";
import MonthCalender from "./calenders/MonthCalender";
import EventPopover from "../event/EventPopover";
import EventSummary from "../event/EventSummary";

const Calender = () => {
  const { selectedView } = useViewStore();

  const {
    isPopoverOpen,
    closePopover,
    isEventSummaryOpen,
    closeEventSummary,
    selectedEvent,
  } = useEventStore();

  const { userSelectedDate } = useDateStore();

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full flex-1">
        {selectedView === "month" && <MonthCalender />}
        {selectedView === "week" && <WeekCalender />}
        {selectedView === "day" && <DayCalender />}
      </div>

      {isPopoverOpen && (
        <EventPopover
          isOpen={isPopoverOpen}
          onClose={closePopover}
          date={userSelectedDate.format("YYYY-MM-DD")}
        />
      )}

      {isEventSummaryOpen && selectedEvent && (
        <EventSummary
          isOpen={isEventSummaryOpen}
          onClose={closeEventSummary}
          event={selectedEvent}
        />
      )}
    </div>
  );
};

export default Calender;
