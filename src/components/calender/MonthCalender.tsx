"use client";

import { Fragment } from "react";
import MonthViewBox from "./view/MonthViewBox";
import { useDateStore } from "@/store/store";

const MonthCalender = () => {
  const { twoDMonthArray } = useDateStore();

  return (
    <section className="grid grid-cols-7 grid-rows-5 lg:h-[100vh]">
      {twoDMonthArray.map((row, r_idx) => (
        <Fragment key={r_idx}>
          {row.map((day, c_idx) => (
            <MonthViewBox key={c_idx} day={day} rowIndex={r_idx} />
          ))}
        </Fragment>
      ))}
    </section>
  );
};

export default MonthCalender;
