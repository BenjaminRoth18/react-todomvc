import React, { Component } from 'react';
import { Status } from './todo/shared/status.type';
import { Todo } from './todo/shared/todo.model';
import { AddTodo } from './todo/components/AddTodo';
import Footer from './todo/components/Footer';
import TodoList from './todo/components/TodoList';
import { Filter } from './todo/shared/filter.type';

interface State {
    todos: Todo[];
    filter: Todo[] | null;
    view: Filter;
}

class App extends Component<{}, State> {
    constructor(props: {}) {
        super(props);

        this.state = {
            todos: [],
            filter: null,
            view: Filter.ALL
        };
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

    addTodo(value: string): void {
        const newTodo = {
            id: this.getRandomId(10000),
            name: value,
            status: Status.OPEN
        };

        const updatedTodos = [...this.state.todos, newTodo];

        this.updateTodos(updatedTodos);
    }

    checkTodo(id: number): void {
        const checkedTodos = [...this.state.todos].map((todo: Todo) => {
            if (todo.id === id)
                todo.status === Status.OPEN
                    ? (todo.status = Status.DONE)
                    : (todo.status = Status.OPEN);
            return todo;
        });

        this.updateTodos(checkedTodos);
    }

    toggleAll(): void {
        const todoStatusList = [...this.state.todos].reduce(
            (acc: string[], curr: Todo) => {
                acc.push(curr.status);
                return acc;
            },
            []
        );

        const checkTodoStatus = todoStatusList.every((status: string) => {
            return status === Status.DONE;
        });

        const checkedTodos = [...this.state.todos].map((todo: Todo) => {
            checkTodoStatus
                ? (todo.status = Status.OPEN)
                : (todo.status = Status.DONE);

            return todo;
        });

        this.updateTodos(checkedTodos);
    }

    getOpenTodos(): number {
        let initialCount: number = 0;
        const todoCountNumber: number = [...this.state.todos].reduce(
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

    deleteTodo(id: number): void {
        const todoIndex = [...this.state.todos].findIndex((todo: Todo) => {
            return todo.id === id;
        });

        const newTodos = [...this.state.todos];
        newTodos.splice(todoIndex, 1);

        this.updateTodos(newTodos);
    }

    clearCompletedTodos(): void {
        const openTodos = [...this.state.todos].filter((todo: Todo) => {
            return todo.status === Status.OPEN ? todo : null;
        });

        this.updateTodos(openTodos);
    }

    updateTodos(todos: Todo[]) {
        this.setState({
            todos: todos
        });

        this.setTodosToLocalStorage(todos);
    }

    setFilter(filter: Filter) {
        let filteredTodos: Todo[] | null;
        let todos = [...this.state.todos];

        switch (filter) {
            case Filter.ACTIVE:
                filteredTodos = todos.filter(
                    (todo: Todo) => todo.status === Status.OPEN
                );
                break;

            case Filter.COMPLETED:
                filteredTodos = todos.filter(
                    (todo: Todo) => todo.status === Status.DONE
                );
                break;

            default:
                filteredTodos = null;
        }

        this.setState({
            filter: filteredTodos,
            view: filter
        });
    }

    render() {
        const todos = this.state.filter ? this.state.filter : this.state.todos;

        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <AddTodo addTodo={value => this.addTodo(value)} />
                </header>
                <section className="main">
                    <TodoList
                        todos={todos}
                        checkedTodo={id => this.checkTodo(id)}
                        deletedTodo={id => this.deleteTodo(id)}
                        toggleAll={() => this.toggleAll()}
                    />
                </section>
                <Footer
                    todoLength={this.state.todos.length}
                    openTodos={this.getOpenTodos()}
                    clearCompletedTodos={() => this.clearCompletedTodos()}
                    filter={type => this.setFilter(type)}
                    activeFilter={this.state.view}
                />
            </section>
        );
    }
}

export default App;
