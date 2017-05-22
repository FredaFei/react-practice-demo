import React from 'react'
import { Input,Button } from 'antd'

class TodoHeader extends React.Component{
    handleKeyUp(e){
        if (e.keyCode==13) {
            let value = e.target.value
            if (!value) {return false}
            let newTodoItem = {
                text: value,
                isDone: false
            }
            e.target.value = ''
            this.props.addTodo(newTodoItem)
        }
    }
    loginOut(){
        this.props.loginOut()
    }
    render(){
        return (
            <div className="todo-header">
                <h1 className="todo-title">React-Todos</h1>
                <p className="user-info">
                    <span className="name">{"欢迎你，"+ this.props.currentUser.username}</span>
                    <Button type="primary" size="small" onClick={this.loginOut.bind(this)}>登出</Button>
                </p>
                <Input autoFocus ref="input" onKeyUp={this.handleKeyUp.bind(this)} type="text" placeholder="请输入你的任务名称，按回车键确认"/>
            </div>
        )
    }
}

export default TodoHeader