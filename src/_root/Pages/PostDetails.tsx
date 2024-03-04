import Loader from "@/components/shared/Loader"
import PostStats from "@/components/shared/PostStats"
import { useUserContext } from "@/context/AuthContext"
import { useGetCurrentUser, useGetPostById } from "@/lib/react-query/queries"
import { timeAgo } from "@/lib/utils"
import { Link, useParams } from "react-router-dom"

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  // Returns an object of key/value pairs of the dynamic params from the 
  // current URL that were matched by the route path.
  // in this case it will return the id from the urlpath
  console.log(id)
  const { data: post, isPending } = useGetPostById(id || '');
  return (
    <div className="post_details-container">
      {isPending ? <Loader /> : (
        <div className="post_details-card">
          <div className="flex items-center gap-3">
                <Link to={`/profile/${post?.creator.$id}`}>
                    <img src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'}
                         alt="creator"
                         className="rounded-full w-12 lg:h-12"
                    />
                </Link>
                <div className="flex flex-col">
                    <p className="base-medium lg:body-bold text-light-1">
                        <strong>{post?.creator.name}</strong>
                    </p>
                    <p className="subtle-semibold lg:small-regular">
                      {post?.$createdAt ? timeAgo(post.$createdAt) : 'Unknown time'}
                    </p>
                    {/* Moved the created at and location under the creator's name */}
                </div>
          </div>
          <img 
            src={post?.imageUrl}
            alt="creater"
            className="post_details-img"
            />
            <div>
            <div className="text-light-3">
            <p className="text-light-1">
                {post?.caption}
            </p>
            <p className="text-light-3">
                #{post?.tags}
            </p>
            <p className="subtle-semibold lg:small-regular">
                {post?.location}
            </p>
        </div>
        <PostStats post={post!} userId={user.id} />
            </div>
        </div>
      )}
    </div>
  )
}

export default PostDetails