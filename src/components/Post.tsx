"use client";

import { FC, useState, useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { deletePost } from "@/app/postActions/action";
import Link from "next/link";

type PostProps = {
  post: { id: number; title: string; content: string };
};
const Post: FC<PostProps> = ({ post }) => {
  const { id, title, content } = post;
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const [isPending, startTransition] = useTransition();

  return (
    <>
      <li className="post-container grid grid-cols-[1fr_2.5rem] gap-[1.2rem] p-[2rem] border-2 border-neutral-400 rounded-xl">
        <h2 className="text-[2rem] row-1 col-1">{title}</h2>
        <p className="content line-clamp-3 row-2 col-[1/span_2]">{content}</p>
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
            <span className="row-1 col-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path d="M96 320C96 289.1 121.1 264 152 264C182.9 264 208 289.1 208 320C208 350.9 182.9 376 152 376C121.1 376 96 350.9 96 320zM264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320zM488 264C518.9 264 544 289.1 544 320C544 350.9 518.9 376 488 376C457.1 376 432 350.9 432 320C432 289.1 457.1 264 488 264z" />
              </svg>
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="cursor-pointer text-[1.4rem]">
              <Link href={`/update-post/${id}`} className="w-full flex">
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-[1.4rem]"
              onClick={() => setShowAlert(true)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </li>
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[1.7rem]">
              Delete Post?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[1.8rem]">
              Are you sure you want to delete this post?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <button
              type="button"
              onClick={() => setShowAlert(false)}
              className="cursor-pointer px-4 py-2 rounded-md border border-neutral-400"
            >
              Cancel
            </button>
            <button
              type="button"
              className="cursor-pointer bg-red-700 text-white px-4 py-2 rounded-md"
              onClick={() => {
                startTransition(async () => {
                  await deletePost(id);
                });
              }}
            >
              <span className="flex items-center gap-[0.5rem] w-full justify-center">
                {isPending ? (
                  <>
                    <svg
                      className="animate-spin fill-white w-[1.5rem] h-[1.5rem]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                    >
                      <path d="M272 112C272 85.5 293.5 64 320 64C346.5 64 368 85.5 368 112C368 138.5 346.5 160 320 160C293.5 160 272 138.5 272 112zM272 528C272 501.5 293.5 480 320 480C346.5 480 368 501.5 368 528C368 554.5 346.5 576 320 576C293.5 576 272 554.5 272 528zM112 272C138.5 272 160 293.5 160 320C160 346.5 138.5 368 112 368C85.5 368 64 346.5 64 320C64 293.5 85.5 272 112 272zM480 320C480 293.5 501.5 272 528 272C554.5 272 576 293.5 576 320C576 346.5 554.5 368 528 368C501.5 368 480 346.5 480 320zM139 433.1C157.8 414.3 188.1 414.3 206.9 433.1C225.7 451.9 225.7 482.2 206.9 501C188.1 519.8 157.8 519.8 139 501C120.2 482.2 120.2 451.9 139 433.1zM139 139C157.8 120.2 188.1 120.2 206.9 139C225.7 157.8 225.7 188.1 206.9 206.9C188.1 225.7 157.8 225.7 139 206.9C120.2 188.1 120.2 157.8 139 139zM501 433.1C519.8 451.9 519.8 482.2 501 501C482.2 519.8 451.9 519.8 433.1 501C414.3 482.2 414.3 451.9 433.1 433.1C451.9 414.3 482.2 414.3 501 433.1z" />
                    </svg>
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </span>
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Post;
