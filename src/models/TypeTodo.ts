import { DateTime } from "luxon";

type DTOTodo = {
    title: string;
    content: string;
    completed: boolean;
    id: string;
    dueDate: DateTime | null;
    userid?: string;
}

export function HydrateDTOTodo(data: any): DTOTodo {
    return {
        title: data.title,
        content: data.content,
        completed: data.completed,
        id: data.id,
        dueDate: data.dueDate ? DateTime.fromISO(data.dueDate) : null,
        userid: data.userid
    }
}

export default DTOTodo;
