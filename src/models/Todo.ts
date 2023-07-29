import { DateTime } from "luxon";

type Todo = {
    title: string;
    content: string;
    completed: boolean; 
    id: string;
    dueDate: DateTime|null;
}
export default Todo;