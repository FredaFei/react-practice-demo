import React from 'react'
import ReactDOM from 'react-dom'
import TodoHeader from './TodoHeader'
import TodoMain from './TodoMain'
import Footer from './TodoFooter'
import Login from './Login'
import { Radio } from 'antd';
import AV from 'leancloud-storage'

const appId = '5ES7IgVTzB8aJpjRrD6pQXuh-gzGzoHsz';
const appKey = 'mUPUjzPbbQCpzAWGq0LejCpH';
AV.init({ appId,appKey });

class App extends React.Component{
    constructor(){
        super()
        this.state = { 
            todos: [],
            isAllChecked: false,
            currentUser: null,
            value: 1,
            todoId: null
        }
    }
    addTodo(newTodoItem){
        this.state.todos.push(newTodoItem)
        this.setState({todos: this.state.todos})
    }
    deleteTodo(index){
        this.state.todos.splice(index,1)
        this.setState({todos: this.state.todos})
    }
    clearDone(){
        let todos = this.state.todos.filter(todo=> !todo.isDone)
        this.setState({
            todos: todos
        });
    }
    // 改变任务状态，传递给TodoItem和Footer组件的方法
    changeTodoState(index,isDone,isAllChecked=false){
        if (isAllChecked) {
            this.setState({
                todos: this.state.todos.map(todo=>{
                    todo.isDone = isDone
                    return todo;
                }),
                isAllChecked: isDone
            });
        }else{
            this.state.todos[index].isDone = isDone;
            this.allChecked()
        }
        
    }
    allChecked(){
        let isAllChecked = false
        if (this.state.todos.every(todo=>todo.isDone)) {
            isAllChecked = true
        }
        this.setState({
            todos: this.state.todos,
            isAllChecked: isAllChecked
        });
    }
    //修改登录或者注册
    onChange(e){
        this.setState({
            value: e.target.value
        })
    }
    //登陆或者注册
    loginOrSignUp(value){
        //判断是登陆还是注册
        if (this.state.value===1) {
            let user = new AV.User();
            user.setUsername(value.userName);
            user.setPassword(value.password);
            user.signUp().then((loginedUser) => {
                this.state.currentUser = this.getCurrentUser()
                this.setState({ currentUser: this.state.currentUser })
              }, function (error) {
                alert("注册失败")
            });
        }else if(this.state.value===2){
            AV.User.logIn(value.userName,value.password).then((loginedUser)=> {
                this.state.currentUser = this.getCurrentUser()
                this.setState({ currentUser: this.state.currentUser })
                this.fetchTodos()
            }, function (error) {
                alert("登陆失败")
            });
        }
    }
    //退出登录
    loginOut(){
        AV.User.logOut()
        this.state.currentUser = null
        window.location.reload()
    }
    //获取当前用户
    getCurrentUser(){
        let current = AV.User.current();
        if (current) {
            // 跳转到首页
            let {id, createdAt, attributes: {username}} = current
            return {id, username, createdAt}
        }else {
            return null
        }
    }
    //将todo储存到服务器上
    saveTodos(){
        let dataString = JSON.stringify(this.state.todos)
        // 声明类型
        var AVTodos = AV.Object.extend('AllTodos');
        var avTodos = new AVTodos();
        // 新建一个 ACL 实例
        var acl = new AV.ACL();
        acl.setReadAccess(AV.User.current(),true)
        acl.setWriteAccess(AV.User.current(),true)

        avTodos.setACL(acl) // 设置访问控制

        avTodos.set('content', dataString);
        avTodos.save().then((todo) => {
          this.state.todoId = todo.id
          this.setState({todoId:this.state.todoId})
          console.log('保存成功');
        }, function (error) {
          // 异常处理
          console.log('保存失败');
        });
    }
    //更新todo到服务器上
    updateTodos() {
        let dataString = JSON.stringify(this.state.todos)
        let avTodos = AV.Object.createWithoutData('AllTodos', this.state.todoId)
        avTodos.set('content', dataString)
        avTodos.save().then(()=>{
            console.log('更新成功')
        })
    }
    //判断应该更新或储存list到leanCloud
    saveOrUpdateTodos() {
        if(this.state.todoId){
            this.updateTodos()
        } else {
            this.saveTodos()
        }
    }
    componentWillMount() {
        this.state.currentUser = this.getCurrentUser()
        this.fetchTodos()
        this.setState({currentUser: this.state.currentUser})
    }
    fetchTodos(){
        if(this.state.currentUser){
            var query = new AV.Query('AllTodos');
            console.log(query)
            query.find()
                .then((todoList) => {
                    console.log(todoList)
                    let avAllTodos = todoList[0] // 因为理论上 AllTodos 只有一个，所以我们取结果的第一项
                    let id = avAllTodos.id
                    this.state.todos = JSON.parse(avAllTodos.attributes.content)
                    this.state.todoId = id
                    this.setState({todos:this.state.todos,todoId:this.state.todoId})
                }, function(error){
                    console.error(error)
                });
        }
    }

    render(){
        if (this.state.currentUser) {
            let info = {
                isAllChecked: this.state.isAllChecked,
                todoLen: this.state.todos.length || 0,
                todoDoneLen: (this.state.todos && this.state.todos.filter((todo)=>todo.isDone).length) || 0
            }
            return (
                <div className="todo-content">
                    <TodoHeader 
                        addTodo={this.addTodo.bind(this)} 
                        loginOut={this.loginOut.bind(this)} 
                        currentUser={this.state.currentUser} />
                    <TodoMain 
                        todos={this.state.todos} 
                        deleteTodo={this.deleteTodo.bind(this)} 
                        changeTodoState={this.changeTodoState.bind(this)} />
                    <Footer 
                        clearDone={this.clearDone.bind(this)} 
                        changeTodoState={this.changeTodoState.bind(this)} 
                        {...info} />
                </div>
            )
        }else{
            const RadioGroup = Radio.Group;
            return(
                <div className="form-wrapper">
                    <h1 className="todo-title">React-Todos</h1>
                    <RadioGroup className="radio-wrapper" onChange={this.onChange.bind(this)} value={this.state.value} >
                        <Radio value={1}>注册</Radio>
                        <Radio value={2}>登入</Radio>
                    </RadioGroup>
                    <Login loginOrSignUp={this.loginOrSignUp.bind(this)} value={this.state.value} />
                </div>
            )
        }
        
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)
