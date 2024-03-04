import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queries";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import Loader from "./Loader";

type PostStatsProps = {
    post: Models.Document;
    userId: string;
}

const PostStats = ({ post, userId }: PostStatsProps) => {
    const likesList = post.likes.map((user: Models.Document) => user.$id)

    const [likes, setLikes ] = useState(likesList);
    const [isSaved, setIsSaved] = useState(false);

    const { mutate: likePost } = useLikePost();
    const { mutate: savePost, isPending: isSavingPost } = useSavePost();
    const { mutate: deleteSavedPost, isPending: isDeletingPost } = useDeleteSavedPost();
    
    const { data: currentUser } = useGetCurrentUser();
    const savedPostRecord = currentUser?.documents[0].save.find((record: Models.Document) => record.$id === post.$id)

    useEffect(() => {
        setIsSaved(!!savedPostRecord);
    }, [currentUser?.documents[0]]);

    const handleLikePost = (e: React.MouseEvent) => {
        e.stopPropagation();

        let newLikes = [...likes]

        const hasLiked = newLikes.includes(userId)

        if(hasLiked) {
            newLikes = newLikes.filter((id) => id !== userId);
        } else {
            newLikes.push(userId);
        }

        setLikes(newLikes);
        likePost({ postId: post.$id, likesArray: newLikes})
    }

    const handleSavePost = (e: React.MouseEvent) => {
        e.stopPropagation();
        
        if(savedPostRecord) {
            setIsSaved(false);
            return deleteSavedPost(savedPostRecord.$id);
        } else {
        savePost({ postId: post.$id, userId: userId });
        setIsSaved(true);
        }
    }

    return (
        <div className="flex justify-between items-center z-20">
            <div className="flex gap-2 mr-5">
                <img src={`${checkIsLiked(likes, userId)
                    ? "/assets/icons/liked.svg"
                    : "/assets/icons/heart_icon.svg"}`}
                    alt="like"
                    width={20}
                    onClick={handleLikePost}
                    className="cursor-pointer" />
                    <p className="small-medium lg-base-medium">{likes.length}</p>
            </div>
            <div className="flex gap-2">
                {isSavingPost || isDeletingPost ? <Loader /> : 
                <img src={isSaved ? "/assets/icons/bookmarked.svg" :
                     "/assets/icons/bookmark.svg"}
                     alt="like"
                    width={20}
                    onClick={handleSavePost}
                    className="cursor-pointer" />}
            </div>
        </div>
  )
}
export default PostStats;