import PostForm from '@/components/forms/PostForm';
import { useGetPostById } from '@/lib/react-query/queries';
import React from 'react'
import { useParams } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id);

  if(isPending) return <div> Loading... </div>
  return (
    <div className='flex flex-1'>
        <div className='common-container'>
            <div className='max-w-5xl flex-start gap-3 justify-start'> 
                <img 
                    src='/assets/icons/add-post.svg'
                    width={36}
                    alt='add'
                    title='Edit Post'
                />
                <h2><strong>Edit Post</strong></h2>
            </div>

            <PostForm action="Update" post={post} />
        </div>
    </div>
  )
}

export default EditPost;