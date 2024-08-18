import { integer, pgTable, serial, text, timestamp, boolean, varchar } from 'drizzle-orm/pg-core';

// Users Table
export const usersTable = pgTable('users_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  age: integer('age').notNull(),
  onlineStatus: boolean('online_status').default(false),  // Online/offline status
  profilePicture: text('profile_picture').default(''),    // URL to profile picture
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

// Conversations Table (for multi-user or private chats)
export const conversationsTable = pgTable('conversations_table', {
  id: serial('id').primaryKey(),
  title: text('title').default(''),                      // Optional for group chats
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

// Conversation Participants Table
export const conversationParticipantsTable = pgTable('conversation_participants_table', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => usersTable.id, { onDelete: 'cascade' }).notNull(),
  conversationId: integer('conversation_id')
    .references(() => conversationsTable.id, { onDelete: 'cascade' })
    .notNull(),
});

// Messages Table
export const messagesTable = pgTable('messages_table', {
  id: serial('id').primaryKey(),
  conversationId: integer('conversation_id')
    .references(() => conversationsTable.id, { onDelete: 'cascade' })
    .notNull(),
  senderId: integer('sender_id').references(() => usersTable.id, { onDelete: 'cascade' }).notNull(),
  content: text('content').default(''),                  // Message content
  isRead: boolean('is_read').default(false),             // Read/unread status
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

// Media Table (for image/video upload)
export const mediaTable = pgTable('media_table', {
  id: serial('id').primaryKey(),
  messageId: integer('message_id')
    .references(() => messagesTable.id, { onDelete: 'cascade' })
    .notNull(),
  mediaUrl: text('media_url').notNull(),                 // URL to the media (image/video)
  mediaType: varchar('media_type', '50').notNull(),        // Type of media (image/video)
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Typing Status Table
export const typingStatusTable = pgTable('typing_status_table', {
  id: serial('id').primaryKey(),
  conversationId: integer('conversation_id')
    .references(() => conversationsTable.id, { onDelete: 'cascade' })
    .notNull(),
  userId: integer('user_id').references(() => usersTable.id, { onDelete: 'cascade' }).notNull(),
  isTyping: boolean('is_typing').default(false),          // True if user is typing
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertConversation = typeof conversationsTable.$inferInsert;
export type SelectConversation = typeof conversationsTable.$inferSelect;

export type InsertMessage = typeof messagesTable.$inferInsert;
export type SelectMessage = typeof messagesTable.$inferSelect;

export type InsertMedia = typeof mediaTable.$inferInsert;
export type SelectMedia = typeof mediaTable.$inferSelect;

export type InsertTypingStatus = typeof typingStatusTable.$inferInsert;
export type SelectTypingStatus = typeof typingStatusTable.$inferSelect;
