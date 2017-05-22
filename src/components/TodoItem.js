import React from 'react'

class TodoItem extends React.Component{
    handlerDelete(){
        this.props.deleteTodo(this.props.index)
    }
    handlerChange(){
        let isDone = !this.props.isDone
        this.props.changeTodoState(this.props.index,isDone)
    }

    render(){
        let className = this.props.isDone ? 'task-done' : ''
        return(
            <li>
                <label>
                    <input type="checkbox" onChange={this.handlerChange.bind(this)} checked={this.props.isDone} />
                    <span className="time">{this.props.time}</span>
                    <span className={className+' task'}>{this.props.text}</span>
                    <button className="del-btn" onClick={this.handlerDelete.bind(this)}>Delete</button>
                </label>
            </li>
        )
    }
}

export default TodoItem