import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import ToDoList from './components/ToDoList';

function App() {

  return (
    <>
    <ToDoList/>
    </>
  );
}

export default App;
