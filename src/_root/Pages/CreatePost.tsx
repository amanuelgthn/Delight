import PostForm from '@/components/forms/PostForm';
import React from 'react'

const CreatePost = () => {
  return (
    <div className='flex flex-1'>
        <div className='common-container'>
            <div className='max-w-5xl flex-start gap-3 justify-start'> 
                <img 
                    src='/assets/icons/add-post.svg'
                    width={36}
                    alt='add'
                    title='Create Post'
                />
                <h2><strong>Create Post</strong></h2>
            </div>

            <PostForm />
        </div>
    </div>
  )
}

export default CreatePost;