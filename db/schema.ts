import { pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";

export const blog = pgTable("blogs", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body").notNull(),
  orgId: text("org_id").notNull(),
});


export type selectBlog = typeof blog.$inferSelect;
export type createBlog = typeof blog.$inferInsert;