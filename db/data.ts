"use client";

import dayjs from "dayjs";
import { db } from "./db";

// export const getEventsData = async () => {
//   try {
//     const data = await db.query.eventsTable.findMany();

//     return data.map((event) => ({
//       ...event,
//       date: dayjs(event.date).toISOString(), // Convert Dayjs to string
//     }));
//   } catch (error) {
//     console.error("Error fetching data from the database:", error);
//     return [];
//   }
// };
