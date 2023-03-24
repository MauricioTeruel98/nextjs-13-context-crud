'use client'

import { useTasks } from '@/context/TaskContext'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const Page = ({ params }) => {

  const [task, setTask] = useState({
    title: "",
    description: ""
  });
  const { tasks, createTask, updateTask } = useTasks();
  const router = useRouter();

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(params.id){
      updateTask(params.id, task)
    }else{
      createTask(task.title, task.description);
    }

    router.push('/');
  }

  useEffect(() => {
    if (params.id) {
      const taskFounded = tasks.find(task => task.id === params.id)
      if (taskFounded) {
        setTask({
          title: taskFounded.title, description: taskFounded.description
        })
      }
    }
  }, [])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder='Write a title'
          onChange={handleChange}
          value={task.title} />
        <textarea
          name='description'
          placeholder='Write a description'
          onChange={handleChange}
          value={task.description}>
        </textarea>
        <button type="">Save</button>
      </form>
    </>
  )
}

export default Page;