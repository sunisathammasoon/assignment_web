
import React from "react";
import io from "socket.io-client";

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: []
        };
        this.socket = io('https://chat-real-sunisa.herokuapp.com');

        this.socket.on('RECEIVE_MESSAGE', function (data) {
            addMessage(data);
        });

        const addMessage = data => {
            console.log(data);
            this.setState({ messages: [...this.state.messages, data] });
            console.log(this.state.messages);
        };

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            });
            this.setState({ message: '' });
        }
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 offset-md-4" style={{marginTop: 50}}>
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Join Chat Here</div>
                                <hr />
                                <div className="messages" id="messages">
                                    {this.state.messages.map(message => {
                                        return (
                                            <div style={{marginTop: 10, marginBottom:10}}><span className="message-border">{message.author}: {message.message}</span></div>
                                        )
                                    })}
                                </div>
                                <div className="footer">
                                    <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({ username: ev.target.value })} className="form-control" />
                                    <br />
                                    <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({ message: ev.target.value })} />
                                    <br />
                                    <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;
