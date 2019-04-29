import { Status } from '../shared/status.type';
import { Todo } from '../shared/todo.model';
import {
    TodoActionTypes,
    ADD_TODO,
    CHECK_TODO,
    TOGGLE_TODOS,
    CLEAR_COMPLETED_TODOS,
    DELETE_TODO,
    SET_FILTER
} from '../actions/actions';
import { Filter } from '../shared/filter.type';

export interface State {
    todos: Todo[];
    filteredTodos: Todo[] | null;
    view: Filter;
}

const initialState: State = {
    todos: [],
    filteredTodos: null,
    view: Filter.ALL
};

const reducer = (state: State = initialState, action: TodoActionTypes) => {
    switch (action.type) {
        case ADD_TODO:
            const getRandomId = (number: number): number => {
                return Math.floor(Math.random() * Math.floor(number));
            };

            const newTodo = {
                id: getRandomId(10000),
                name: action.payload,
                status: Status.OPEN
            };
            return {
                ...state,
                todos: [...state.todos, newTodo]
            };

        case CHECK_TODO:
            const checkedTodos = [...state.todos].map((todo: Todo) => {
                if (todo.id === action.payload)
                    todo.status === Status.OPEN
                        ? (todo.status = Status.DONE)
                        : (todo.status = Status.OPEN);
                return todo;
            });

            return {
                ...state,
                todos: checkedTodos
            };

        case TOGGLE_TODOS:
            const todoStatusList = [...state.todos].reduce(
                (acc: string[], curr: Todo) => {
                    acc.push(curr.status);
                    return acc;
                },
                []
            );

            const checkTodoStatus = todoStatusList.every((status: string) => {
                return status === Status.DONE;
            });

            const toggledTodos = [...state.todos].map((todo: Todo) => {
                checkTodoStatus
                    ? (todo.status = Status.OPEN)
                    : (todo.status = Status.DONE);

                return todo;
            });

            return {
                ...state,
                todos: toggledTodos
            };

        case CLEAR_COMPLETED_TODOS:
            const openTodos = [...state.todos].filter((todo: Todo) => {
                return todo.status === Status.OPEN ? todo : null;
            });

            return {
                ...state,
                todos: openTodos
            };

        case DELETE_TODO:
            const todoIndex = [...state.todos].findIndex((todo: Todo) => {
                return todo.id === action.payload;
            });

            const newTodos = [...state.todos];
            newTodos.splice(todoIndex, 1);

            return {
                ...state,
                todos: newTodos
            };

        case SET_FILTER:
            let filteredTodos: Todo[] | null;
            let todos = [...state.todos];

            switch (action.payload) {
                case Filter.ACTIVE:
                    filteredTodos = todos.filter(
                        (todo: Todo) => todo.status === Status.OPEN
                    );

                    return {
                        ...state,
                        filteredTodos: filteredTodos,
                        view: action.payload
                    };

                case Filter.COMPLETED:
                    filteredTodos = todos.filter(
                        (todo: Todo) => todo.status === Status.DONE
                    );

                    return {
                        ...state,
                        filteredTodos: filteredTodos,
                        view: action.payload
                    };

                default:
                    return {
                        ...state,
                        filteredTodos: null,
                        view: Filter.ALL
                    };
            }

        default:
            return state;
    }
};

export default reducer;
