"use client";

import { useViewStore } from "@/store/store";
import { signOut, useSession } from "next-auth/react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut } from "lucide-react";

const RightHeader = () => {
  const { setView } = useViewStore();
  const { data: session } = useSession();

  return (
    <div className="flex items-center space-x-4">
      <Select onValueChange={(v) => setView(v)}>
        <SelectTrigger className="w-24 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="month">Month</SelectItem>
          <SelectItem value="week">Week</SelectItem>
          <SelectItem value="day">Day</SelectItem>
        </SelectContent>
      </Select>

      <Avatar>
        <AvatarImage src={session?.user?.image ? session?.user?.image : ""} />
        <AvatarFallback className="bg-gray-200">
          {session?.user?.name?.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <LogOut
        className="cursor-pointer"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          signOut();
        }}
      />
    </div>
  );
};

export default RightHeader;
