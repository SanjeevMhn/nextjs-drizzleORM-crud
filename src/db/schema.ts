import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const post = pgTable('posts',{
    id: serial('id').primaryKey(),
    title: varchar('title',{length: 255}).notNull(),
    content: text('description').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull()
})