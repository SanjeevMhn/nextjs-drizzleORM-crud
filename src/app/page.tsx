import Link from "next/link";
import { getPosts } from "./postActions/action";
import Post from "@/components/Post";

export default async function Home() {
  const posts = await getPosts();
  return (
    <main className="main-container flex flex-col gap-[2rem] p-[2.5rem]">
      <header className="flex items-center gap-[1.5rem]">
        <h2 className="header-text text-[2.2rem]">Posts</h2>
        <Link
          href={"/add-post"}
          className="btn text-white bg-blue-400 rounded-md p-[0.5rem_2rem] text-[1.75rem]"
        >
          Add
        </Link>
      </header>
      <ul className="post-container grid grid-cols-[repeat(auto-fill,minmax(min(22rem,100%),1fr))] gap-[1.5rem]">
        {posts.length > 0 ? (
          posts.map((post) => <Post post={post} key={post.id} />)
        ) : (
          <>
            <h2 className="text-[2rem]">No posts available</h2>
          </>
        )}
      </ul>
    </main>
  );
}
