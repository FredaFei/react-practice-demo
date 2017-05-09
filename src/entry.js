import React from 'react'
import ReactDom from 'react-dom'
function UserGreeting(props){
    return <h1>Welcome back!</h1>;
}
function GuestGreeting(props){
    return <h1>Please sign up.</h1>;
}

function Geeting(props){
    const isLogin = props.isLogin
    if (isLogin) {
        return <UserGreeting />
    }
    return <GuestGreeting />
}

ReactDom.render( 
    <Geeting isLogin={false}/ > ,
    document.getElementById('app')
);
