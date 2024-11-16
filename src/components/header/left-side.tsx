import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

const LeftHeader = () => {
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

      <Button className="mx-8" variant={"outline"}>
        Today
      </Button>

      <div className="flex items-center gap-2">
        <ChevronLeft className="size-5 cursor-pointer font-bold" />
        <ChevronRight className="size-5 cursor-pointer font-bold" />
      </div>

      <h1 className="hidden text-xl lg:block">Oct 2024</h1>
    </div>
  );
};

export default LeftHeader;
