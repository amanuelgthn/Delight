import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '../ui/textarea'
import FileUploader from '../shared/FileUploader'
import { useToast } from '../ui/use-toast'
import { Action } from '@radix-ui/react-toast'
import { PostValidation } from '@/lib/validation'
import { Models } from 'appwrite'
import { useCreatePost, useUpdatePost } from '@/lib/react-query/queries'
import { useUserContext } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Loader from '../shared/Loader'

type PostFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};
 
const PostForm = ({ post, action }: PostFormProps) => {

  const { user } = useUserContext();
  const { toast } = useToast();
  const navigate = useNavigate();

    // 1. Define your form.
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post?.tags.join(",") : "",
    },
  });
  const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost();
 //handle submit handler
  const onSubmit = async (value: z.infer<typeof PostValidation>) => {

    if (post && action === "Update") {
      const updatedPost = await updatePost({
        ...value,
        postId: post.$id,
        imageId: post.imageId,
        imageUrl: post.imageUrl,
      });

  if (!updatedPost) {
    toast({
      title: `${action} post failed. Please try again.`,
    });
  }
  return navigate(`/posts/${post.$id}`);
}
    const newPost = await createPost({
      ...value,
      userId: user.id,
    })

  if (!newPost) {
    toast({
      title: `post failed. Please try again.`,
    });
  }
  navigate("/");
}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Add</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea custom-scrollbar" {...field} />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                 />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Add Location</FormLabel>
              <FormControl>
                <Input type='text'
                        className='shad-input'
                        {...field} />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Add Tags
              (separated by comma ", ")</FormLabel>
              <FormControl>
                <Input type="text" 
                        className='shad-input'
                        placeholder='Sports, Software, Coding, DayInLife, React'
                        {...field}/>
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <div className='flex gap-4 items-center justify-end'>
            <Button type="submit"
                    className='shad-button_primary whitespace-nowrap'
                    disabled={isLoadingCreate || isLoadingUpdate}>
                    {(isLoadingCreate || isLoadingUpdate) && <Loader />}
                    {action} Post
            </Button>
            <Button type="button" 
                    className="shad-button_dark_4"
                    onClick={() => navigate(-1)}
                    >
                    Cancel
            </Button>
        </div>
      </form>
    </Form>
  )
}

export default PostForm