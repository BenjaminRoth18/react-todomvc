import { Status } from './status.type';

export interface Todo {
    id: number;
    name: string;
    status: Status;
}
