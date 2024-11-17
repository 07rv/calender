import {
  pgTable,
  text,
  timestamp,
  serial,
  varchar,
  boolean,
  index,
} from "drizzle-orm/pg-core";

export const eventsTable = pgTable("events", {
  id: serial("id").primaryKey(),
  date: timestamp("date").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
});

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    email: varchar("email", { length: 256 }).notNull(),
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
