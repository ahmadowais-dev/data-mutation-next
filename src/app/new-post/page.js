import PostForm from "@/src/components/post-form";
import {createPost} from "@/src/actions/posts";


export default function NewPostPage() {

    // We'll call createPost server action
    return <PostForm action={createPost}/>
}
