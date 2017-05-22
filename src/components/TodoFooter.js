import React from 'react'
import { Button } from 'antd'

class TodoFooter extends React.Component{
    handlerClear(e){
        this.props.clearDone()
    }
    handlerChange(e){
        this.props.changeTodoState(null,e.target.checked,true)
    }
    render(){
        let minus = this.props.todoLen - this.props.todoDoneLen
        return (
            <div className="todo-footer">
                <label>
                    <input type='checkbox' checked={this.props.isAllChecked} onChange={this.handlerChange.bind(this)} />全选
                </label> 
                <span>还剩{minus}未完成</span>
                <button className="clear-btn" onClick={this.handlerClear.bind(this)}>清除全部已完成 </button>
            </div>
        )
    }
}

export default TodoFooter