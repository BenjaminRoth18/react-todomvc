import React, { useState } from 'react';
import { Todo } from '../shared/todo.model';
import { Status } from '../shared/status.type';
import TodoItem from './TodoItem';

interface Props {
    todos: Todo[];
    checkedTodo: (id: number) => void;
    deletedTodo: (id: number) => void;
    toggleAll: (event: React.MouseEvent<HTMLInputElement>) => void;
}

const TodoList = ({ todos, checkedTodo, deletedTodo, toggleAll }: Props) => {
    return (
        <div>
            <input
                onClick={toggleAll}
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
            />
            <label htmlFor="toggle-all" />
            <ul className="todo-list">
                {todos.map((todo: Todo) => {
                    return (
                        <li
                            key={todo.id}
                            className={
                                todo.status === Status.DONE ? 'completed' : ''
                            }
                        >
                            <div className="view">
                                <TodoItem
                                    todo={todo}
                                    checkedTodo={(id: number) =>
                                        checkedTodo(id)
                                    }
                                    deletedTodo={(id: number) =>
                                        deletedTodo(id)
                                    }
                                />
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default TodoList;
