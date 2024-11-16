import MonthCalender from "./MonthCalender";
import Sidebar from "@/components/sidebar/Sidebar";

const Calender = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full flex-1">
        <MonthCalender />
      </div>
    </div>
  );
};

export default Calender;
