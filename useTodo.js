import { useEffect, useReducer, useState } from 'react';
import { todoReducer } from '../08-useReducer/todoReducer';

const initialState = [];

const init = () => {
  return JSON.parse(localStorage.getItem('todos')) || [];
};

export const useTodo = () => {
  const [todos, dispatchTodo] = useReducer(todoReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const onAddTodo = (newTodo) => {
    const action = {
      type: '[TODO] Add Todo',
      payload: newTodo,
    };

    dispatchTodo(action);
  };

  const onDeleteTodo = (id) => {
    const action = {
      type: '[TODO] Remove Todo',
      payload: id,
    };

    dispatchTodo(action);
  };

  const onToggleDone = (newTodo) => {
    console.log(newTodo);
    const action = {
      type: '[TODO] Toggle Done Todo',
      payload: newTodo,
    };

    dispatchTodo(action);
  };

  return {
    todos,
    todosCount: todos.length,
    pendingTodosCount: todos.filter((todo) => todo.done === false).length,
    onAddTodo,
    onDeleteTodo,
    onToggleDone,
  };
};
