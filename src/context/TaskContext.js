"use client"
import { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

export const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error('useTasks must be used within a provider')
    return context
}

export const TaskProvider = ({ children }) => {

    const [tasks, setTasks] = useState([
        {
            id: uuid(),
            title: 'My firts task',
            description: 'Some task'
        },
        {
            id: uuid(),
            title: 'My second task',
            description: 'Some second task'
        },
        {
            id: uuid(),
            title: 'My third task',
            description: 'Some third task'
        }
    ])

    const createTask = (title, description) => {
        setTasks(
            [
                ...tasks,
                {
                    title,
                    description,
                    id: uuid(),
                }
            ]
        )
    }

    const deleteTask = (id) => {
        setTasks([...tasks.filter(task => task.id !== id)]);
    }

    const updateTask = (id, newData) => {
        setTasks([...tasks.map(task => task.id === id ? { ...task, ...newData } : task)]);
    }

    return <TaskContext.Provider
        value={{
            tasks,
            createTask,
            deleteTask,
            updateTask
        }}
    >
        {children}
    </TaskContext.Provider>
}