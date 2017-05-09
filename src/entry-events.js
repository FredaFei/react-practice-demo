import React from 'react'
import ReactDom from 'react-dom'

class Toggle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {isTooggleOn: true};
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this)
        console.log(this)
    }
    handleClick(){
        this.setState(prevState=>({
            isTooggleOn: !prevState.isTooggleOn
        }));
    }
    render(){
        return (
            <button onClick={this.handleClick}>
                {this.state.isTooggleOn?'ON':'OFF'}
            </button>
        )
    }
}

ReactDom.render( < Toggle / > ,
    document.getElementById('app')
);
