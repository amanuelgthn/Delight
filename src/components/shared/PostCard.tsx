import { useUserContext } from "@/context/AuthContext";
import { timeAgo } from "@/lib/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type PostCardProps = {
    post: Models.Document;
}


const PostCard = ({ post }: PostCardProps) => {
    const { user } = useUserContext();

    if (!post.creator) return;

  return (
    <div className="post-card">
        <div className="flex-between">
            <div className="flex items-center gap-3">
                <Link to={`/profile/${post.creator.$id}`}>
                    <img src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'}
                         alt="creator"
                         className="rounded-full w-12 lg:h-12"
                    />
                </Link>
                <div className="flex flex-col">
                    <p className="base-medium lg:body-bold text-light-1">
                        <strong>{post.creator.name}</strong>
                    </p>
                    <p className="subtle-semibold lg:small-regular">
                            {timeAgo(post.$createdAt)}
                        </p>
                    {/* Moved the created at and location under the creator's name */}
                </div>
            </div>
            <Link to={`/update-post/${post.$id}`}
                    className={`${user.id !==post.creator.$id && "hidden"}`}>
                <img src="/assets/icons/edit_icon.svg" alt="edit" width={30} />
            </Link>
        </div>
        <img src={post.imageUrl}
             className="post-card_img"
             alt="Image" />
        <div className="text-light-3">
            <p className="text-light-1">
                {post.caption}
            </p>
            <p className="text-light-3">
                #{post.tags}
            </p>
            <p className="subtle-semibold lg:small-regular">
                {post.location}
            </p>
        </div>
        <PostStats post={post} userId={user.id} />
    </div>
  )
}

export default PostCard;