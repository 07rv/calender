"use server";

import { db } from "./db";
import { eventsTable } from "./schema";

export async function createEvent(
  formData: FormData
): Promise<{ error: string } | { success: boolean }> {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;

  if (!title || !description || !date || !time) {
    return { error: "All fields are required" };
  }

  const dateTime = new Date(`${date}T${time}:00`);

  try {
    await db.insert(eventsTable).values({
      title,
      description,
      date: dateTime,
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating event:", error);
    return { error: "Failed to create event" };
  }
}
