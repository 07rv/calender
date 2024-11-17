import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  serial,
  varchar,
  boolean,
  index,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

export const typesEnum = pgEnum("type", ["event", "task", "appointment"]);

export const calenderTable = pgTable("calender", {
  id: serial("id").primaryKey(),
  userId: integer("userId").references(() => usersTable.id),
  type: typesEnum().default("event"),
  title: text("title").notNull(),
  date: timestamp("date").notNull(),
  guest: text("guests")
    .array()
    .default(sql`'{}'::text[]`),
  description: text("description").notNull(),
  createdOn: timestamp("createdOn").notNull(),
  updatedOn: timestamp("updatedOn"),
  deleteAt: timestamp("deleteAt"),
});

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    email: varchar("email", { length: 256 }).notNull().unique(),
    password: varchar("password", { length: 256 }).notNull(),
    image: varchar("image", { length: 256 }),
    connectToGoogle: boolean("connectToGoogle").default(false),
    createdOn: timestamp("createdOn").notNull(),
    updatedOn: timestamp("updatedOn").notNull(),
    deleteAt: timestamp("deleteAt"),
  },
  (table) => {
    return {
      emailIdx: index("emailIdx").on(table.email),
      nameIdx: index("nameIdx").on(table.name),
    };
  }
);
