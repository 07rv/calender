"use server";

import { sql } from "drizzle-orm";
import { db } from "./db";
import { usersTable } from "./schema";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { UserType } from "../type/types";
interface Credentials {
  name: string;
  email: string;
  password: string;
}

// export async function createEvent(
//   formData: FormData
// ): Promise<{ error: string } | { success: boolean }> {
//   const title = formData.get("title") as string;
//   const description = formData.get("description") as string;
//   const date = formData.get("date") as string;
//   const time = formData.get("time") as string;

//   if (!title || !description || !date || !time) {
//     return { error: "All fields are required" };
//   }

//   const dateTime = new Date(`${date}T${time}:00`);

//   try {
//     await db.insert(eventsTable).values({
//       title,
//       description,
//       date: dateTime,
//     });

//     return { success: true };
//   } catch (error) {
//     console.error("Error creating event:", error);
//     return { error: "Failed to create event" };
//   }
// }

export async function createUser(
  user: Credentials
): Promise<{ error: string } | { success: boolean }> {
  try {
    const userexist = await db
      .select()
      .from(usersTable)
      .where(sql`${usersTable.email} = ${user.email}`);

    if (userexist.length > 0) {
      return { error: "User Already exists" };
    }

    await db.insert(usersTable).values({
      name: user.name,
      password: hashSync(user.password, genSaltSync(10)),
      email: user.email,
      createdOn: sql`CURRENT_TIMESTAMP`,
      updatedOn: sql`CURRENT_TIMESTAMP`,
    });
    return { success: true };
  } catch (error) {
    return { error: "Failed to create event" };
  }
}

export async function getUser(
  email: string
): Promise<{ error: string } | { success: boolean } | { user: UserType }> {
  try {
    const user = await db
      .select()
      .from(usersTable)
      .where(sql`${usersTable.email} = ${email}`);

    const usertype: UserType = {
      id: user[0].id.toString(),
      name: user[0].name!,
      email: user[0].email,
      image: user[0].image!,
      connectToGoogle: user[0].connectToGoogle || false,
    };
    if (user && user.length > 0) {
      return { success: true, user: usertype };
    }
    return { success: false, error: "No user found" };
  } catch {
    return { success: false, error: "Failed to get user" };
  }
}
