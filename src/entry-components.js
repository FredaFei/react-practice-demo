import React from 'react';
import ReactDOM from 'react-dom';

/**--组件--*/
// class Hello extends React.Component {
//     render(){
//         return <h4>Hi, {this.props.name}</h4>;
//     }
// }
// function Hello(props){
//     return <h4>Hi, {props.name}</h4>;
// }
// function App(){
//     return (
//         <div>
//             <Hello name="Cahal" />
//             <Hello name="Edite" />
//             <Hello name="Freda" />
//             <Hello name="Sara" />
//         </div>
//     )
// }

    function formatDate(date) {
      return date.toLocaleDateString();
    }
    function Avatar(props){
        return (
            <img className="Avatar"
                src={props.user.avatarUrl}
                alt={props.user.name}
            />
        );
    }
    function UserInfo(props){
        return (
            <div className="UserInfo">
                <Avatar user={props.user} />
                <div className="UserInfo-name">
                  {props.user.name}
                </div>
            </div>
        );
    }
    let comment = {
        date: new Date(),
        text: 'I hope you enjoy learning React!',
          author: {
            name: 'Hello Kitty!',
            avatarUrl: 'http://placekitten.com/g/64/64'
          }
    }

    function Comment(props) {
      return (
        <div className="Comment">
          <UserInfo user={props.author} />
          <div className="Comment-text">
            {props.text}
          </div>
          <div className="Comment-date">
            {formatDate(props.date)}
          </div>
        </div>
      );
    }

ReactDOM.render(
  <Comment date={comment.date}
           text={comment.text}
           author={comment.author} />,
  document.getElementById('app')
);