'use client'


import LikeButton from './like-icon';
import {formatDate} from "@/src/lib/format";
import {togglePostLikeStatus} from "@/src/actions/posts";
import {useOptimistic} from 'react'
import Image from "next/image";

function imageLoader (config){
    const urlStart = config.src.split('upload/')[0]
    const urlEnd = config.src.split('upload/')[1]
    const transformations = `w_200,q_${config.quality  }`
    const newURL = `${urlStart}upload/${transformations}/${urlEnd}`
    return newURL
}

function Post({post}) {
    return (
        <article className="post">
            <div className="post-image">
                <Image
                    src={post.image}
                    width={200}
                    height={150}
                    loader={imageLoader}
                    quality={50}
                    alt={post.title}/>
            </div>
            <div className="post-content">
                <header>
                    <div>
                        <h2>{post.title}</h2>
                        <p>
                            Shared by {post.userFirstName} on{' '}
                            <time dateTime={post.createdAt}>
                                {formatDate(post.createdAt)}
                            </time>
                        </p>
                    </div>
                    <div>
                        <form action={togglePostLikeStatus.bind(null, post.id)}
                              className={post.isLiked ? 'liked' : ''}>
                            <LikeButton/>
                        </form>
                    </div>
                </header>
                <p>{post.content}</p>
            </div>
        </article>
    );
}

export default function Posts({posts}) {

    const [optimisticPosts, updatedOptimisticPosts] = useOptimistic(posts,
        (prevPosts, updatedPostId) => {
            const updatedPostIndex = prevPosts.findIndex(post => post.id === updatedPostId);

            if (updatedPostIndex === -1) {
                return prevPosts;
            }

            const updatedPost = {...prevPosts[updatedPostIndex]};
            updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);
            updatedPost.isLiked = !updatedPost.isLiked;

            const newPosts = [...prevPosts];
            newPosts[updatedPostIndex] = updatedPost;
            return newPosts;
        });

    if (!optimisticPosts || optimisticPosts.length === 0) {
        return <p>There are no posts yet. Maybe start sharing some?</p>;
    }

    async function updatePost(postId) {
        updatedOptimisticPosts(postId);
        await togglePostLikeStatus(postId);
    }


    return (
        <ul className="posts">
            {optimisticPosts.map((post) => (
                <li key={post.id}>
                    <Post post={post} action={updatePost}/>
                </li>
            ))}
        </ul>
    );

}
