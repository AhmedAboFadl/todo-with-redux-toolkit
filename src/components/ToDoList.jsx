import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTodoList, addTodo, updateTodo, removeTodo } from '../components/ToDoList';
import { TiPencil } from 'react-icons/ti';
import { BsTrash } from 'react-icons/bs';

export default function ToDoList() {
    const dispatch = useDispatch();
    const todoList = useSelector(state => state.todo.todoList);
    const sortCriteria = useSelector(state => state.todo.sortCriteria);
    const [showModel, setShowModel] = useState(false);
    const [currentToDo, setCurrentToDo] = useState(null);
    const [newTask, setNewTask] = useState("");


    useEffect(() => {
        if (todoList.length > 0) {
            localStorage.setItem("todolist", JSON.stringify(todoList));
        }
    }, [todoList]);

    useEffect(() => {
        const localTodoList = JSON.parse(localStorage.getItem("todolist"));
        if (localTodoList) {
            dispatch(setTodoList(localTodoList));
        }
    }, [dispatch]);

    const handleAddToDo = (task) => {
        if (task.trim().length === 0) {
            alert("Please enter a task");
        } else {
            if (currentToDo) {
                dispatch(updateTodo({ id: currentToDo.id, task }));
            } else {
                dispatch(addTodo({ task }));
            }
            setNewTask("");
            setShowModel(false);
            setCurrentToDo(null);
        }
    };

    const handleEdit = (todo) => {
        setNewTask(todo.task);
        setCurrentToDo(todo);
        setShowModel(true);
    };

    const handleDelete = (id) => {
        dispatch(removeTodo(id));
    };

    const sortToDoList = todoList.filter(todo => {
        if (sortCriteria === "All") return true;
        if (sortCriteria === "completed" && todo.completed) return true;
        if (sortCriteria === "Not completed" && !todo.completed) return true;
        return false;
    });

    return (
        <div className='container mx-auto mt-6'>
            <h1 className='text-white text-[60px]'>To-<span className='text-green-500  '>Do </span> List..</h1>
            {showModel && (
                <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10'>
                    <div className='bg-white p-4 rounded-lg shadow-md'>
                        <input
                            type='text'
                            className='border border-red-500 rounded-md p-2 w-64'
                            placeholder={currentToDo ? "Update your task here" : "Enter your task"}
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                        />
                        <div className='mt-4'>
                            <button onClick={() => setShowModel(false)} className='bg-red-500 text-white rounded-md mx-2 py-2 px-4'>Cancel</button>
                            <button onClick={() => handleAddToDo(newTask)} className='bg-blue-600 text-white rounded-md py-2 px-4'>Save</button>
                        </div>
                    </div>
                </div>
            )}

            <div className='flex items-center justify-center flex-col'>
                 {todoList.length === 0 ? (
                    <div>
                        <img src="/4867780.jpg" className='w-[430px] rounded-full z-20 translate-x-[-100px]' alt="No tasks" />
                    </div>
                ) : (
                    sortToDoList.map((todo, index) => (
                        <div key={index} className='flex items-center justify-between mb-4 bg-red-600 mx-auto w-full md:w-[75%] p-4 rounded-md wow fadeIn'>
                            <div className='text-white'><ul><li>{todo.task}</li></ul></div>
                            <div>
                                <button onClick={() => handleEdit(todo)} className='text-white mx-2'>
                                    <TiPencil />
                                </button>
                                <button onClick={() => handleDelete(todo.id)} className='text-white'>
                                    <BsTrash />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <button
                className='bg-green-600 text-white rounded-md text-center mt-10 py-3 px-10 hover:bg-green-700 transition duration-200'
                onClick={() => { setShowModel(true); setNewTask(""); setCurrentToDo(null); }}>
                Click to Add Task
            </button>
        </div>
    );
}
