CREATE TYPE "public"."type" AS ENUM('event', 'task', 'appointment');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "calender" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer,
	"type" "type" DEFAULT 'event',
	"title" text NOT NULL,
	"date" timestamp NOT NULL,
	"description" text NOT NULL,
	"createdOn" timestamp NOT NULL,
	"updatedOn" timestamp,
	"deleteAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"image" varchar(256),
	"connectToGoogle" boolean DEFAULT false,
	"createdOn" timestamp NOT NULL,
	"updatedOn" timestamp NOT NULL,
	"deleteAt" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "calender" ADD CONSTRAINT "calender_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "emailIdx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "nameIdx" ON "users" USING btree ("name");