"use client";

import { getMonth } from "@/lib/getTime";
import { Fragment } from "react";

const MonthCalender = () => {
  const currMonth = getMonth();

  return (
    <section className="grid grid-cols-7 grid-rows-5 lg:h-[100vh]">
      {currMonth.map((row, r_idx) => (
        <Fragment key={r_idx}>
          {row.map((day, c_idx) => (
            <h3 key={c_idx}>{day.format("D")}</h3>
          ))}
        </Fragment>
      ))}
    </section>
  );
};

export default MonthCalender;
