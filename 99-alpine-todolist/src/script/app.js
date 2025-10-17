import Alpine from 'alpinejs'
import { TodoForm } from './form'

 
window.Alpine = Alpine ;
Alpine.data("todo_form", TodoForm);
Alpine.start()