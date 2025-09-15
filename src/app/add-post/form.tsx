"use client";

import { FC, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { addPost, updatePost } from "../postActions/action";

type FormProp = {
  post?: {
    id: number;
    title: string;
    content: string;
  };
};

const Form: FC<FormProp> = ({ post }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{
    title: string;
    content: string;
  }>({
    values: post!,
  });

  const handlePost: SubmitHandler<{
    title: string;
    content: string;
  }> = (data) => {
    if (post) {
      startTransition(async () => {
        await updatePost(post.id, data);
      });
    return;
    }
    startTransition(async () => {
      await addPost(data);
    });
  };

  const [isPending, startTransition] = useTransition();

  return (
    <form
      onSubmit={handleSubmit(handlePost)}
      className="form flex flex-col gap-[2rem] p-[2.5rem] border-2 border-neutral-700 rounded-xl bg-white shadow-xl"
    >
      <div className="form-group flex flex-col gap-[1.2rem]">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="form-control bg-blue-50 p-[1rem_1.5rem] text-[1.8rem] border border-neutral-800 rounded-xl"
          placeholder="Title"
          {...register("title", {
            required: "Title Required",
          })}
        />
        {errors.title && (
          <span className="text-red-600 text-[1.4rem]">
            {errors.title.message}
          </span>
        )}
      </div>
      <div className="form-group flex flex-col gap-[1.2rem]">
        <label htmlFor="content" className="form-label">
          Content
        </label>
        <textarea
          id="content"
          className="form-control bg-blue-50 p-[1rem_1.5rem] text-[1.8rem]  border border-neutral-800 rounded-xl"
          rows={5}
          placeholder="Content"
          {...register("content", {
            required: "Content Required",
          })}
        ></textarea>
        {errors.content && (
          <span className="text-red-600 text-[1.4rem]">
            {errors.content.message}
          </span>
        )}
      </div>
      <div className="form-actions">
        <button
          type="submit"
          className="p-[1rem_2rem] bg-blue-400 text-white rounded-xl text-[1.75rem]"
        >
          <>
            {isPending ? (
              <span className="flex items-center gap-[0.8rem]">
                <svg
                  className="animate-spin fill-white w-[2.5rem] h-[2.5rem]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                >
                  <path d="M272 112C272 85.5 293.5 64 320 64C346.5 64 368 85.5 368 112C368 138.5 346.5 160 320 160C293.5 160 272 138.5 272 112zM272 528C272 501.5 293.5 480 320 480C346.5 480 368 501.5 368 528C368 554.5 346.5 576 320 576C293.5 576 272 554.5 272 528zM112 272C138.5 272 160 293.5 160 320C160 346.5 138.5 368 112 368C85.5 368 64 346.5 64 320C64 293.5 85.5 272 112 272zM480 320C480 293.5 501.5 272 528 272C554.5 272 576 293.5 576 320C576 346.5 554.5 368 528 368C501.5 368 480 346.5 480 320zM139 433.1C157.8 414.3 188.1 414.3 206.9 433.1C225.7 451.9 225.7 482.2 206.9 501C188.1 519.8 157.8 519.8 139 501C120.2 482.2 120.2 451.9 139 433.1zM139 139C157.8 120.2 188.1 120.2 206.9 139C225.7 157.8 225.7 188.1 206.9 206.9C188.1 225.7 157.8 225.7 139 206.9C120.2 188.1 120.2 157.8 139 139zM501 433.1C519.8 451.9 519.8 482.2 501 501C482.2 519.8 451.9 519.8 433.1 501C414.3 482.2 414.3 451.9 433.1 433.1C451.9 414.3 482.2 414.3 501 433.1z" />
                </svg>
                <p className="label-text">{post ? "Updating" : "Adding"}</p>
              </span>
            ) : post ? (
              "Update"
            ) : (
              "Add"
            )}
          </>
        </button>
      </div>
    </form>
  );
};

export default Form;
