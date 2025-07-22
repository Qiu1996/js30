import axios from 'axios';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';


const notyf = new Notyf({
    types: [
        {
            type: 'success',
            background: '#2b7fff',
            className: 'rounded-md'
        }
    ]
});

const TodoForm = () => {return {
    status: 'login',
    email: '',
    password: '',
    nickname: '',
    todos: [],
    newTodo: '',
    editTodo: '',
    editingIndex: null,
    
    open(status){
        return status === this.status;
    },
    go(status){
        if(status === 'logout'){
            status = 'login';
            localStorage.removeItem('token');
            this.todos = [];
        }
        this.status = status;
    },
    get checkInput(){
        switch(this.status){
            case 'register':
                return this.email != "" && this.password != "" && this.nickname != "";
            case 'login':
                return this.email != "" && this.password != "";
            default:
                return true;
        }
    },
    async register() {
        if(this.checkInput){
            const url = "https://todoo.5xcamp.us/users";
            const userData = {
                'user': {
                    'email': this.email,
                    'password': this.password,
                    'nickname': this.nickname
                }
            }
            try{
                const res = await axios.post(url, userData);
                notyf.success(`${res.data.message}<br>歡迎加入，${res.data.nickname}`);
                console.log(`註冊成功`);

                this.email = '';
                this.password = '';
                this.nickname = '';
                this.go('login');
            }catch(err){
                notyf.error(`${err.response.data.message}<br>${err.response.data.error[0]}`);
                console.log(`失敗${err}`);
            }    
        }
        
    },
    async login() {
        if(this.checkInput){
            const url = 'https://todoo.5xcamp.us/users/sign_in';
            const userData = {
                "user": {
                    "email": this.email,
                    "password": this.password,
                }
            };
            try{
                const res = await axios.post(url, userData);
                // 登入成功
                notyf.success(`${res.data.message}<br>歡迎回來! ${res.data.nickname}`);
                // 儲存 Token
                localStorage.setItem('token', res.headers.authorization);
                this.go('loginOn');
                this.getTodos();
            }catch{
                // 登入失敗
                notyf.error(`${err.response.data.message}`);
                console.log(err);
            }
            console.log('login...');
        }
    },
    init(){
        console.log('init...');
        const token = localStorage.getItem('token');
        if(token){
            this.setHeader(token);
            this.go('loginOn');
            this.getTodos();
        }else{
            this.go('login');
        }
    },
    setHeader(token){
        axios.defaults.headers.common["Authorization"] = token
    },
    async getTodos(){
        try{
            const url = 'https://todoo.5xcamp.us/todos';
            const res = await axios.get(url);
            const resTodos = res.data.todos;
            this.todos = resTodos;
            console.log(`獲得資料成功`);
        }catch(err){
            console.log(err);
        }
    },
    // 新增 Todo
    async addTodo(){
        if(this.newTodo.trim() === ''){
            const notyf = new Notyf();
            notyf.error(`輸入框不可為空`);
            return;
        }

        const url = 'https://todoo.5xcamp.us/todos';
        const todoData = {'todo': {'content': this.newTodo}};
        try{
            await axios.post(url, todoData);
            console.log(`新增成功`);
            this.getTodos();
            this.newTodo = '';
        }catch(err){
            console.log(err);
        }
    },
    async finishEditTodo(todo){
        if(this.editTodo.trim() === ''){
            const notyf = new Notyf();
            notyf.error(`輸入框不可為空`)
            return
        }
        try {
            const url = `https://todoo.5xcamp.us/todos/${todo.id}`;
            const todoData = {'todo': {'content': this.editTodo}};
            
            await axios.put(url, todoData);
            console.log(`編輯成功`);
            
            
            this.editingIndex = null;
            this.editTodo = '';
            this.getTodos();
        } catch(err) {
            console.log(err);
        }
    },
    
    async deleteTodo(todo){
        try{
            const url = `https://todoo.5xcamp.us/todos/${todo.id}`;
            await axios.delete(url);
            console.log(`${todo.id} 刪除成功`);

            this.getTodos();
        }catch(err){
            console.log(err);
        }
    },

    get checkEditTodo(){
        return this.editingIndex;
    },
    goEditTodo(todo){
        this.editingIndex = todo.id;
        console.log(this.editTodo);
    },
    cancelEditTodo(){
        this.editingIndex = null;
    },

}}

export { TodoForm };