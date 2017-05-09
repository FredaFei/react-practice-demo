import React from 'react'
import ReactDom from 'react-dom'

// class Timer extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             secondsElapsed: 0
//         };
//     }

//     tick() {
//         this.setState((prevState) => ({
//             secondsElapsed: prevState.secondsElapsed + 1
//         }));
//     }

//     componentDidMount() {
//         this.interval = setInterval(() => this.tick(), 1000);
//     }

//     componentWillUnmount() {
//         clearInterval(this.interval);
//     }

//     render() {
//         return ( < div > Seconds Elapsed: {
//             this.state.secondsElapsed
//         } < /div>);
//     }
// }

function FormattedDate(props){
    return <h3>当前时间：{props.date.toLocaleTimeString()}</h3>
}
class Clock extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            date: new Date()
        }
    }
    componentDidMount() {
        this.timeId = setInterval(()=>this.tick(),1000)
    }

    componentWillUnmount() {
        clearInterval(this.timeId)
    }
    tick(){
        this.setState({
            date: new Date()
        });
    }
    render(){
        return (
            <FormattedDate date={this.state.date} />
        )
    }
}

ReactDom.render(
    <Clock />,
    document.getElementById('app')
);