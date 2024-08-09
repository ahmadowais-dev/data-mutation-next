import {getPosts} from "@/src/lib/posts";
import Posts from "@/src/components/posts";

export async function generateMetadata() {
    const posts = await getPosts()
    const noOfPosts = posts.length;

    return {
        title: `Browse all our ${noOfPosts} posts `,
        description: 'Browse all our posts'
    }
}


export default async function FeedPage() {
    const posts = await getPosts();
    return (
        <>
            <h1>All posts by all users</h1>
            <Posts posts={posts}/>
        </>
    );
}
