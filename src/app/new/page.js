'use client'

import { useTasks } from '@/context/TaskContext'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

const Page = ({ params }) => {

  const { tasks, createTask, updateTask } = useTasks();
  const router = useRouter();
  const {register , handleSubmit, setValue, formState:{
    errors
  }} = useForm();

  const onHandleSubmit = handleSubmit((data) => {
    if(params.id){
      updateTask(params.id, data);
      toast.success('Task updated successfully');
    }else{
      createTask(data.title, data.description);
      toast.success('Task created successfully');
    }
    router.push('/');
  })

  useEffect(() => {
    if (params.id) {
      const taskFounded = tasks.find(task => task.id === params.id)
      if (taskFounded) {
        setValue('title', taskFounded.title);
        setValue('description', taskFounded.description);
      }
    }
  }, [])

  return (
    <>
      <form onSubmit={onHandleSubmit}>
        <input
          placeholder='Write a title'
          {...register("title", { required: true })}
          />
          {errors.title && (
            <span>This field is required</span>
          )}
        <textarea
          placeholder='Write a description'
          {...register("description", { required: true })}>
        </textarea>
        {errors.description && (
            <span>This field is required</span>
          )}
        <button type="">Save</button>
      </form>
    </>
  )
}

export default Page;