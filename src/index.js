import { TodoList } from './classes/todo.list.class'
import { crearHTML } from './js/componentes';
import './style.css'

export const todoList = new TodoList();

todoList.todos.forEach(element => {
    crearHTML(element)
    
});

// otra forma todoList.todos.forEach(rearHTML);
