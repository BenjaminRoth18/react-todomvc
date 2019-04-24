import React from 'react';
import { Todo } from '../shared/todo.model';
import { Status } from '../shared/status.type';

interface Props {
    todo: Todo;
    checkedTodo: any;
    deletedTodo: any;
}

const TodoItem = ({ todo, checkedTodo, deletedTodo }: Props) => {
    return (
        <div className="view">
            <input
                type="checkbox"
                onChange={() => checkedTodo(todo.id)}
                checked={todo.status === Status.DONE ? true : false}
                className="toggle"
            />
            <label>{todo.name}</label>
            <button onClick={() => deletedTodo(todo.id)} className="destroy" />
        </div>
    );
};
export default TodoItem;
