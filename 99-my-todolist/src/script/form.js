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
    status: 'register',
    email: '',
    password: '',
    nickname: '',
    todos: [],
    newTodo: '',
    editTodo: '',
    editingIndex: null,
    async init(){
        const token = localStorage.getItem('token');
        if(token){
            const url = 'https://todoo.5xcamp.us/todos';
            const headers = {'Authorization': token};
            const res = await axios.get(url, {
                headers: headers
            })
            this.loginOn();
            this.getTodos();
        }else{
            this.loginOff();
        }
    },
    init(){
        console.log('init...');
    },
    get allowToSubmit(){
        if(this.status === 'register'){
            return this.email != "" && this.password != "" && this.nickname != "";
        }else if(this.status === 'login'){
            return this.email != "" && this.password != "";
        }
        return true;
    },
    get editingStatus(){
        return this.editingIndex !== null;
    },  
    goLogin() {
        this.status = 'login'
    },
    goRegister() {
        this.status = 'register'
    },
    loginOn(){
        this.status = 'loginOn';
    },
    loginOff(){
        this.status = 'login';
    },
    logout(){
        this.status = 'login';
        localStorage.removeItem('token');
        // this.getTodos();
        this.todos = [];
    },
    async register() {
        console.log('register...');
        
        if(this.allowToSubmit){
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
            }catch(err){
                // console.log(err.response.data.message);
                // console.log(err.response.data.error[0]);

                notyf.error(`${err.response.data.message}<br>${err.response.data.error[0]}`);
                console.log(err);
            }
        }
        
        Object.assign(this, {
            email: '',
            password: '',
            nickname: '',
        });
    },
    login() {
        axios.post('https://todoo.5xcamp.us/users/sign_in', {
            "user": {
                "email": this.email,
                "password": this.password,
            }
        })
        .then(res => {
            // 登入成功
            notyf.success(`${res.data.message}<br>歡迎回來! ${res.data.nickname}`);
            // 儲存 Token
            localStorage.setItem('token', res.headers.authorization);
            this.loginOn();
            this.getTodos();
        })
        .catch(err => {
            // 登入失敗
            notyf.error(`${err.response.data.message}`);
            console.log(err);
        });
        console.log('login...');
        Object.assign(this, {
            email: '',
            password: '',
        });
    },
    // 新增 Todo
    async addTodo(){
        if(this.newTodo.trim() === ''){
            const notyf = new Notyf();
            notyf.error(`輸入框不可為空`);
            return;

        }
        const token = localStorage.getItem('token');
        const url = 'https://todoo.5xcamp.us/todos';
        const todoData = {'todo': {'content': this.newTodo}};
        const headers = {'Authorization': token}
        try{
            await axios.post(url, todoData, {headers: headers});
            console.log(`新增成功`);
        }catch(err){
            console.log(err);
        }
        this.getTodos();
        this.newTodo = '';
    },
    async getTodos(){
        try{
            const token = localStorage.getItem('token');
            const headers = {'Authorization': token}
            const url = 'https://todoo.5xcamp.us/todos';
            const res = await axios.get(url, {headers: headers});
            const resTodos = res.data.todos;
            this.todos = resTodos;
            // console.log(resTodos[0].id);
            console.log(this.todos);
        }catch(err){
            console.log(err);
        }
    },
    async deleteTodo(todo){
        try{
            const token = localStorage.getItem('token');
            const headers = {'Authorization': token};
            const url = `https://todoo.5xcamp.us/todos/${todo.id}`;
            await axios.delete(url, {headers: headers});
            console.log(`${todo.id} 刪除成功`);

            this.getTodos();
        }catch(err){
            console.log(err);
        }
    },
    goEditTodo(todo){
        this.editingIndex = todo.id;
        console.log(this.editTodo);
    },
    cancelEditTodo(){
        this.editingIndex = null;
    },
    async finishEditTodo(todo){
        if(this.editTodo.trim() === ''){
            const notyf = new Notyf();
            notyf.error(`輸入框不可為空`)
            return
        }
        try {
            const token = localStorage.getItem('token');
            const headers = {'Authorization': token};
            const url = `https://todoo.5xcamp.us/todos/${todo.id}`;
            const todoData = {'todo': {'content': this.editTodo}};
            
            await axios.put(url, todoData, {headers: headers});
            console.log(`編輯成功`);
            
            // 重新獲取最新的 todos 資料來更新 UI
            await this.getTodos();
        } catch(err) {
            console.log(err);
        }
        
        this.editingIndex = null;
        this.editTodo = '';
    }
}}

export { TodoForm };