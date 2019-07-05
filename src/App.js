import React, {Component} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import "./containers/Home"
import Home from './containers/Home';
import Room from './containers/Room';
import io from 'socket.io-client';

class App extends Component {
    constructor() {
        super();
        this.socket = io('http://localhost:8080');
        this.state = {
            name: 'Player',
            role: null,
            roomID: null
        }
    }

    setName = (e) => {
        if (e.target.value !== '') {
            this.setState( {name: e.target.value} );
        }
        else {
            this.setState( {name: 'Player'} );
        }
    }

    setRole = (role) => {
        this.setState( {role: role} );
    }

    setRoomID = (id) => {
        this.setState( {roomID: id} );
    }

    handleInputRoomID = (e) => {
        if (e.target.value !== '') {
            this.setState( {roomID: e.target.value} );
        }
    }

    render () {
        return (
            <BrowserRouter>
                <div id="App">
                    <Switch>
                        <Route exact path="/" render={(props) => <Home {...props} 
                            socket={this.socket} 
                            setName={this.setName}
                            setRole={(role)=>this.setRole(role)} 
                            setRoomID={(id)=>this.setRoomID(id)}
                            handleInputRoomID={this.handleInputRoomID}
                            {...this.state} />}
                        />
                        <Route path={'/room'+'/'+this.state.roomID} render={(props) => <Room {...props}
                            socket={this.socket}
                            name={this.state.name}
                            role={this.state.role}
                            roomID={this.state.roomID} />} 
                        />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App