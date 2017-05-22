import React from 'react';
import ReactDom from 'react-dom'


// function BoilingVerdict(props){
//     if(props.celsius >= 100){
//         return <p>The water would boil</p>
//     }
//     return <p>The water would not boil</p>
// }
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};
class Calculator extends React.Component{
    render(){
        return (
            <div>
                <TemperatureInput scale="c"/> 
                <TemperatureInput scale="f"/> 
            </div>
        )
    }
}

class TemperatureInput extends React.Component{
    constructor(props){
        super(props)
        this.state = {temperature: ''}
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e){
        this.setState({temperature: e.target.value})
    }
    render(){
        const temperature = this.state.temperature
        const scale = this.props.scale
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature}
                       onChange={this.handleChange} />
            </fieldset>
        )
    }
}

ReactDom.render(
    <Calculator />,
    document.getElementById('app')
)