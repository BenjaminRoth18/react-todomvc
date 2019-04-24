import React from 'react';
import { Filter } from '../shared/filter.type';

interface Props {
    todoLength: number;
    openTodos: number;
    clearCompletedTodos: (event: React.MouseEvent<HTMLButtonElement>) => void;
    filter: (type: Filter) => void;
    activeFilter: Filter;
}

export const Footer = ({
    todoLength,
    openTodos,
    clearCompletedTodos,
    filter,
    activeFilter
}: Props) => {
    return (
        <footer className="footer">
            {todoLength > 0 && (
                <span className="todo-count">
                    {openTodos} Item
                    {openTodos !== 1 ? 's' : ''} left
                </span>
            )}

            <ul className="filters">
                <li>
                    <a
                        href="#"
                        onClick={() => filter(Filter.ALL)}
                        className={
                            activeFilter === Filter.ALL ? 'selected' : ''
                        }
                    >
                        All
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        onClick={() => filter(Filter.ACTIVE)}
                        className={
                            activeFilter === Filter.ACTIVE ? 'selected' : ''
                        }
                    >
                        Active
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        onClick={() => filter(Filter.COMPLETED)}
                        className={
                            activeFilter === Filter.COMPLETED ? 'selected' : ''
                        }
                    >
                        Completed
                    </a>
                </li>
            </ul>

            {todoLength - openTodos > 0 && (
                <button
                    onClick={clearCompletedTodos}
                    className="clear-completed"
                >
                    Clear completed
                </button>
            )}
        </footer>
    );
};

export default Footer;
