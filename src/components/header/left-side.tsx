import { Menu } from "lucide-react";
import { Button } from "../ui/button";

const LeftHeader = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="hidden item-center lg:flex">
        <Button variant={"ghost"} className="rounded-full p-2">
          <Menu className="size-6" />
        </Button>
      </div>
    </div>
  );
};

export default LeftHeader;
