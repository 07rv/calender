"use client";
import {
  CalendarEventType,
  useDateStore,
  useEventStore,
  useViewStore,
} from "@/store/store";

import Sidebar from "@/components/sidebar/Sidebar";
import WeekCalender from "./calenders/WeekCalender";
import DayCalender from "./calenders/DayCalender";
import MonthCalender from "./calenders/MonthCalender";
import EventPopover from "../event/EventPopover";
import EventSummary from "../event/EventSummary";
import { getEventsData } from "../../../db/data";
import { useEffect } from "react";
import dayjs from "dayjs";

const Calender = () => {
  const { selectedView } = useViewStore();
  const {
    isPopoverOpen,
    closePopover,
    isEventSummaryOpen,
    closeEventSummary,
    selectedEvent,
    setEvents,
    events,
  } = useEventStore();

  const { userSelectedDate } = useDateStore();

  const bookedCalender = async (): Promise<void> => {
    const events = await getEventsData();
    const mappedEvents: CalendarEventType[] = events.map((event) => ({
      id: event.id.toString(),
      date: dayjs(event.date),
      title: event.title,
      description: event.description,
    }));
    setEvents(mappedEvents);
  };

  useEffect(() => {
    bookedCalender();
  }, [events]);

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
