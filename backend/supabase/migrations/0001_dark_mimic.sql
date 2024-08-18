CREATE TABLE IF NOT EXISTS "conversation_participants_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"conversation_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "conversations_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text DEFAULT '',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "media_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"message_id" integer NOT NULL,
	"media_url" text NOT NULL,
	"media_type" varchar(2) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "messages_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"conversation_id" integer NOT NULL,
	"sender_id" integer NOT NULL,
	"content" text DEFAULT '',
	"is_read" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "typing_status_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"conversation_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"is_typing" boolean DEFAULT false,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "posts_table";--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "online_status" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "profile_picture" text DEFAULT '';--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "conversation_participants_table" ADD CONSTRAINT "conversation_participants_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "conversation_participants_table" ADD CONSTRAINT "conversation_participants_table_conversation_id_conversations_table_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "media_table" ADD CONSTRAINT "media_table_message_id_messages_table_id_fk" FOREIGN KEY ("message_id") REFERENCES "public"."messages_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages_table" ADD CONSTRAINT "messages_table_conversation_id_conversations_table_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages_table" ADD CONSTRAINT "messages_table_sender_id_users_table_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "typing_status_table" ADD CONSTRAINT "typing_status_table_conversation_id_conversations_table_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "typing_status_table" ADD CONSTRAINT "typing_status_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
