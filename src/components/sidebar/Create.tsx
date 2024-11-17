import { useCallback, useState } from "react";
import { Button } from "../ui/button";
import { useDateStore } from "@/store/store";
import EventPopover from "../event/EventPopover";
import { SvgIcons } from "@/lib/svgicons";
import { ChevronDown } from "lucide-react";

const Create = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleOpenPopover = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPopoverOpen(true);
  }, []);

  const handleClosePopover = useCallback(() => {
    setIsPopoverOpen(false);
  }, []);

  const { userSelectedDate } = useDateStore();

  return (
    <>
      <Button
        variant="ghost"
        className="w-[150px] justify-start rounded-full py-6 shadow"
        onClick={handleOpenPopover}
      >
        <SvgIcons.googleCreate className="mr-2 !h-8 !w-8" />
        <span> Create </span>
        <ChevronDown size={8} />
      </Button>
      {isPopoverOpen && (
        <EventPopover
          isOpen={isPopoverOpen}
          onClose={handleClosePopover}
          date={userSelectedDate.format("YYYY-MM-DD")}
        />
      )}
    </>
  );
};

export default Create;
