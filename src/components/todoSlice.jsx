import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todoList: [],
    sortCriteria: 'All',
  },
  reducers: {
    setTodoList: (state, action) => {
      state.todoList = action.payload;
    },
    addTodo: (state, action) => {
      state.todoList.push({ id: Date.now(), task: action.payload.task, completed: false });
    },
    updateTodo: (state, action) => {
      const { id, task } = action.payload;
      const todo = state.todoList.find(todo => todo.id === id);
      if (todo) {
        todo.task = task;
      }
    },
    toggleCompleted: (state, action) => {
      const todo = state.todoList.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action) => {
      state.todoList = state.todoList.filter(todo => todo.id !== action.payload);
    },

  },
});
//Export procedure
export const { setTodoList, addTodo, updateTodo, toggleCompleted, removeTodo} = todoSlice.actions;

// Export the reducer
export default todoSlice.reducer;
