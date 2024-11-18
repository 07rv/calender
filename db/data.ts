"use client";

import dayjs from "dayjs";
import { db } from "./db";
import { getUser } from "./eventactions";
import { calenderTable } from "./schema";
import { sql } from "drizzle-orm";

export const getEventsData = async (email: string | null | undefined) => {
  try {
    if (email) {
      const response = await getUser(email);

      if (response.success) {
        const user = response.user;
        if (user) {
          const data = await db
            .select()
            .from(calenderTable)
            .where(sql`${calenderTable.userId} = ${user.id}`);

          return data.map((event) => ({
            ...event,
            id: event.id,
            title: event.title,
            type: event.type,
            description: event.description,
            guest: [],
            date: dayjs(event.date).toISOString(),
          }));
        }
      }
    }

    return [];
  } catch (error) {
    console.error("Error fetching data from the database:", error);
    return [];
  }
};
