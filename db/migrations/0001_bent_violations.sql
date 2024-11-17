CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"image" varchar(256),
	"connectToGoogle" boolean DEFAULT false,
	"createdOn" timestamp NOT NULL,
	"updatedOn" timestamp NOT NULL,
	"deleteAt" timestamp
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "emailIdx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "nameIdx" ON "users" USING btree ("name");