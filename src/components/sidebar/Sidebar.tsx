import { cn } from "@/lib/utils";
import Create from "./Create";
import SideBarCalendar from "./SideBarCalendar";
import SearchUsers from "./SearchUsers";
import MyCalendars from "./MyCalendars";
import { useToggleSideBarStore } from "@/store/store";

const Sidebar = () => {
  const { isSideBarOpen } = useToggleSideBarStore();
  return (
    <aside
      className={cn(
        "w-92 hidden border-t px-2 py-3 transition-all duration-300 ease-in-out lg:block",
        !isSideBarOpen && "lg:hidden"
      )}
    >
      <Create />
      <SideBarCalendar />
      <SearchUsers />
      <MyCalendars />
    </aside>
  );
};

export default Sidebar;
