import {Todo} from './todo.class'

export class TodoList{
    constructor(){
        //this.todos = [];
        this.cargarLocalStore();
    }

    nuevoTodo(todo){
        this.todos.push(todo)
        this.guardarLocalStore()
    }

    eliminarTodo(id){
        this.todos = this.todos.filter(todo =>{
            todo.id!= id
            this.guardarLocalStore();
        })
    }

    marcarCompletado(id){
        for (const todo of this.todos) {
        
            if (todo.id == id) {
               todo.completado = !todo.completado
               this.guardarLocalStore();
               break;
            }
        }
    }

    eliminarCompletados(id){
        this.todos = this.todos.filter(todo =>{
            !todo.completado
        })
        this.guardarLocalStore();

    }


    guardarLocalStore(){
        localStorage.setItem('todo', JSON.stringify(this.todos))
    }

    cargarLocalStore(){

       this.todos = localStorage.getItem('todo')
                    ? this.todos = JSON.parse(localStorage.getItem('todo'))
                    : [];

        this.todos = this.todos.map(obj =>Todo.fromJSON(obj))

    }
}