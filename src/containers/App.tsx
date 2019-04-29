import React, { Component, Dispatch } from 'react';
import { Status } from '../shared/status.type';
import { Todo } from '../shared/todo.model';
import { AddTodo } from '../components/AddTodo';
import Footer from '../components/Footer';
import TodoList from '../components/TodoList';
import { Filter } from '../shared/filter.type';
import { connect } from 'react-redux';
import {
    addTodo,
    checkTodo,
    toggleTodos,
    clearCompletedTodos,
    deleteTodo,
    setFilter
} from '../actions/actions';
import { State } from '../reducers/todos';

interface Props {
    addTodo: Dispatch<any>;
    checkTodo: Dispatch<any>;
    toggleTodos: Dispatch<void>;
    clearCompletedTodos: Dispatch<void>;
    deleteTodo: Dispatch<any>;
    setFilter: Dispatch<any>;
    todos: Todo[];
    filter: Todo[] | null;
    view: Filter;
}

class App extends Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        this.getTodosFromLocalStorage();
    }

    getTodosFromLocalStorage(): void {
        const todos = localStorage.getItem('todos');

        if (todos) {
            this.setState({
                todos: JSON.parse(todos)
            });
        }
    }

    setTodosToLocalStorage(todos: Todo[]): void {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    getRandomId(number: number): number {
        return Math.floor(Math.random() * Math.floor(number));
    }

    getOpenTodos(): number {
        let initialCount: number = 0;
        const todoCountNumber: number = [...this.props.todos].reduce(
            (todoCount, todo: Todo) => {
                todo.status === Status.OPEN
                    ? (todoCount += initialCount + 1)
                    : '';
                return todoCount;
            },
            0
        );
        return todoCountNumber;
    }

    render() {
        const {
            addTodo,
            checkTodo,
            toggleTodos,
            clearCompletedTodos,
            deleteTodo,
            setFilter,
            todos,
            filter,
            view
        } = this.props;

        const todoList = filter ? filter : todos;

        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <AddTodo addTodo={value => addTodo(value)} />
                </header>
                <section className="main">
                    <TodoList
                        todos={todoList}
                        checkedTodo={id => checkTodo(id)}
                        deletedTodo={id => deleteTodo(id)}
                        toggleAll={() => toggleTodos()}
                    />
                </section>
                <Footer
                    todoLength={todos.length}
                    openTodos={this.getOpenTodos()}
                    clearCompletedTodos={() => clearCompletedTodos()}
                    filter={type => setFilter(type)}
                    activeFilter={view}
                />
            </section>
        );
    }
}

const mapStateToProps = (state: State) => {
    return {
        todos: state.todos,
        filter: state.filteredTodos,
        view: state.view
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        addTodo: (name: string) => dispatch(addTodo(name)),
        checkTodo: (id: number) => dispatch(checkTodo(id)),
        toggleTodos: () => dispatch(toggleTodos()),
        clearCompletedTodos: () => dispatch(clearCompletedTodos()),
        deleteTodo: (id: number) => dispatch(deleteTodo(id)),
        setFilter: (filter: Filter) => dispatch(setFilter(filter))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
