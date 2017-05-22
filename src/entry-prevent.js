import React from 'react'
import ReactDom from 'react-dom'


function WarningBanner(props){
    if (!props.warn) {
        return null
    }
    return <h1 className="Warning">Warning!</h1>;
}


class Page extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.state = {showWarning: false};
  }

  handleToggleClick() {
    this.setState(prevState=>({
        showWarning: !prevState.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>{this.state.showWarning?'Hide':'Show'}</button>
      </div>
    );
  }
}


ReactDom.render( 
    <Page /> ,
    document.getElementById('app')
);
