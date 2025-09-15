import Form from "@/app/add-post/form";
import { getPost } from "@/app/postActions/action";

export default async function UpdatePost({
  params,
}: {
  params: {
    id: number;
  };
}) {
  const post = await getPost(params.id);
  return (
    <div className="form-container p-[2.5rem]">
      <Form post={post} />
    </div>
  );
}
