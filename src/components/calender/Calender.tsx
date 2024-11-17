"use client";
import { useDateStore, useEventStore, useViewStore } from "@/store/store";

import Sidebar from "@/components/sidebar/Sidebar";
import WeekCalender from "./calenders/WeekCalender";
import DayCalender from "./calenders/DayCalender";
import MonthCalender from "./calenders/MonthCalender";
import EventPopover from "../event/EventPopover";
import EventSummary from "../event/EventSummary";
import { useCallback, useEffect } from "react";

const Calender = () => {
  const { selectedView } = useViewStore();
  const {
    isPopoverOpen,
    closePopover,
    isEventSummaryOpen,
    closeEventSummary,
    selectedEvent,
    setEvents,
  } = useEventStore();

  const { userSelectedDate } = useDateStore();

  const bookedCalender = useCallback(async (): Promise<void> => {
    // const eventsData = await getEventsData();
    // const mappedEvents: CalendarEventType[] = eventsData.map((event) => ({
    //   id: event.id.toString(),
    //   date: dayjs(event.date),
    //   title: event.title,
    //   description: event.description,
    // }));
    // setEvents(mappedEvents);
  }, [setEvents]);

  useEffect(() => {
    bookedCalender();
  }, [bookedCalender]);

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
