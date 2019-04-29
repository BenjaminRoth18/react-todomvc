import { Filter } from '../shared/filter.type';

export const ADD_TODO = 'ADD_TODO';
export const CHECK_TODO = 'CHECK_TODO';
export const TOGGLE_TODOS = 'TOGGLE_TODOS';
export const CLEAR_COMPLETED_TODOS = 'CLEAR_COMPLETED_TODOS';
export const DELETE_TODO = 'DELETE_TODO';
export const SET_FILTER = 'SET_FILTER';

interface AddTodoAction {
    type: typeof ADD_TODO;
    payload: string;
}

interface CheckTodoAction {
    type: typeof CHECK_TODO;
    payload: number;
}

interface ToggleTodos {
    type: typeof TOGGLE_TODOS;
}

interface ClearCompletedTodos {
    type: typeof CLEAR_COMPLETED_TODOS;
}

interface DeleteTodo {
    type: typeof DELETE_TODO;
    payload: number;
}

interface SetFilter {
    type: typeof SET_FILTER;
    payload: Filter;
}

export type TodoActionTypes =
    | AddTodoAction
    | CheckTodoAction
    | ToggleTodos
    | ClearCompletedTodos
    | DeleteTodo
    | SetFilter;

export function addTodo(name: string): TodoActionTypes {
    return {
        type: ADD_TODO,
        payload: name
    };
}

export function checkTodo(id: number): TodoActionTypes {
    return {
        type: CHECK_TODO,
        payload: id
    };
}

export function toggleTodos(): TodoActionTypes {
    return {
        type: TOGGLE_TODOS
    };
}

export function clearCompletedTodos(): TodoActionTypes {
    return {
        type: CLEAR_COMPLETED_TODOS
    };
}

export function deleteTodo(id: number): TodoActionTypes {
    return {
        type: DELETE_TODO,
        payload: id
    };
}

export function setFilter(filter: Filter): TodoActionTypes {
    return {
        type: SET_FILTER,
        payload: filter
    };
}
