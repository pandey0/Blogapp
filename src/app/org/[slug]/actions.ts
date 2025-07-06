"use server";

import { db } from "../../../../db";
import { createBlog,blog } from "../../../../db/schema";


export const createBlogfunction = async (data: { title: string; body: string; orgId: string }) => {
  const res = await db.insert(blog).values(data).returning();
  return res[0];
};
