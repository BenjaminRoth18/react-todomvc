import React, { useState } from 'react';

interface Props {
    addTodo: (value: string) => void;
}

export const AddTodo = ({ addTodo }: Props) => {
    const [value, setValue] = useState('');

    return (
        <form
            onSubmit={(event: React.FormEvent) => {
                event.preventDefault();
                setValue('');
                value ? addTodo(value) : null;
            }}
        >
            <input
                type="text"
                onChange={event => setValue(event.target.value)}
                className="new-todo"
                placeholder="What needs to be done?"
                value={value}
            />
        </form>
    );
};

export default AddTodo;
