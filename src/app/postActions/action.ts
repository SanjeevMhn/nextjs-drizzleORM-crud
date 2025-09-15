"use server";

import { db } from "@/db/drizzle";
import { post } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getPosts = async () => {
  const data = await db.select().from(post);
  return data;
};

export const addPost = async (postData: { title: string; content: string }) => {
  await db.insert(post).values({
    title: postData.title,
    content: postData.content,
  });

  redirect("/");
};

export const getPost = async (id: number) => {
  const data = await db
    .select({
      id: post.id,
      title: post.title,
      content: post.content,
    })
    .from(post)
    .where(eq(post.id, id));
  return data[0];
};

export const updatePost = async (
  id: number,
  updatedData: { title: string; content: string }
) => {
  await db
    .update(post)
    .set({
      title: updatedData.title,
      content: updatedData.content,
    })
    .where(eq(post.id, id));

    redirect('/')
};

export const deletePost = async (id: number) => {
  await db.delete(post).where(eq(post.id, id));
  redirect("/");
};
