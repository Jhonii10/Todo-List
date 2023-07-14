
import { todoList } from "..";
import { Todo } from "../classes/todo.class";

// referencia html
const divTodoList = document.querySelector('.todo-list')
const txtInput = document.querySelector('.new-todo')
const btnBorrar = document.querySelector('.clear-completed')
const ulFilter = document.querySelector('.filters')
const anchorFilter = document.querySelectorAll('.filtro')
const numPendientes = document.querySelector('strong')





export const crearHTML = (todo)=>{
    const htmlTodo = `<li class="${todo.completado ? 'completed':''}" data-id="${todo.id}">
    <div class="view">
        <input class="toggle" type="checkbox" ${todo.completado ? 'checked':''} >
        <label>${todo.tarea}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
</li>`
const div = document.createElement('div');
div.innerHTML = htmlTodo

divTodoList.append(div.firstElementChild);

return div

}



// evento 

txtInput.addEventListener('keyup',(event)=>{
    
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        console.log(txtInput.value)
        const nuevoTodo = new Todo(txtInput.value)
        todoList.nuevoTodo(nuevoTodo)
        
        
        crearHTML(nuevoTodo)

        // limpiar input
        txtInput.value='';
    }
})


divTodoList.addEventListener('click',(event)=>{
    console.log(event.target.parentElement.parentElement)
    const nombreElemento = event.target.localName; //
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id')

    if (nombreElemento.includes('input')) {
        todoList.marcarCompletado(todoId)
        todoElemento.classList.toggle('completed')
    }else if (nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento)
    } 
    console.log(todoList)
})


btnBorrar.addEventListener('click',()=>{
    todoList.eliminarCompletados();
    for (let i = divTodoList.children.length-1; i>=0; i--) {
        const elemento=divTodoList.children[i];
        if (elemento.classList.contains("completed")){
            divTodoList.removeChild(elemento);
        }
        
    }
})


ulFilter.addEventListener('click', (evento)=>{

    const filtro = evento.target.text
    if (!filtro) {
        return;
    }

    anchorFilter.forEach(elem =>elem.classList.remove('selected'))
    evento.target.classList.add('selected')

    let contadorPendientes = 0;

    
    

    for (const element of divTodoList.children)
    {
        element.classList.remove('hidden')
        const completed = element.classList.contains('completed')

       

        switch (filtro) {
            case 'Pendientes':
                if (completed) {
                    element.classList.add('hidden')
                    
                }
                break;

            case 'Completados':
                if (!completed) {
                    element.classList.add('hidden')
                }
        
            default:
                break;
        }

        if (!completed) {
            contadorPendientes++; // Incrementar el contador de elementos pendientes

        }

        numPendientes.innerText = contadorPendientes
        
    }

     
 
})






