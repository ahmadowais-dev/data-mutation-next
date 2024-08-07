import {getPosts} from "@/src/lib/posts";
import Posts from "@/src/components/posts";


export default async function FeedPage() {
  const posts = await getPosts();
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
