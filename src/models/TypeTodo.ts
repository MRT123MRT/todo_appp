import { DateTime } from "luxon";

type DTOTodo = {
    title: string;
    content: string;
    completed: boolean;
    id: string;
    dueDate: DateTime | null;
    userid?: string;
}
export default DTOTodo;


type DBTodo = {
    todoid: string;
    todotitle: string;
    tododescription: string;
    todoisdone: boolean;
    duedate: string | null;
    userid?: string,
}

export const convertToDTOTodo = (dbTodo: DBTodo): DTOTodo => {

    return {
        title: dbTodo.todotitle,
        content: dbTodo.tododescription,
        completed: dbTodo.todoisdone,
        id: dbTodo.todoid,
        dueDate: dbTodo.duedate ? DateTime.fromISO(dbTodo.duedate) : null
    }
}

export const convertToDBTodo = (dtoTodo: DTOTodo): DBTodo => {

    return {
        todoid: dtoTodo.id,
        todotitle: dtoTodo.title,
        tododescription: dtoTodo.content,
        todoisdone: dtoTodo.completed,
        duedate: dtoTodo.dueDate ? dtoTodo.dueDate.toISO() : null,
    }
}
