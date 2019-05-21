import React, {Component} from "react";
import Button from "./Button";
import capitalize from "../utils/capitalize";
import initBoard from "../utils/initBoard";

export default class AskWindow extends Component {
    createRoom = () => {
        const socket = this.props.socket;
        if (!this.props.role) {
            console.log('Please select your role.')
        }
        else {
            socket.emit('createRoom', {
                roomID: this.props.roomID,
                grids: initBoard(),
                name: this.props.name,
                role: this.props.role
            })
            socket.on(`createRoom${this.props.roomID}`, function(msg) {
                console.log(msg);
            })
            socket.on('error', function(error) {
                console.log(error);
            })
        }
    }

    joinRoom = () => {
        const {socket, setRole} = this.props;
        socket.emit('joinRoom', {
            roomID: this.props.roomID,
            name: this.props.name,
        });
        socket.on(`joinRoom${this.props.roomID}`, function(msg, role) {
            console.log(msg);
            setRole(role);
        })
        socket.on('error', function(error) {
            console.log(error);
        });
    }

    render() {
        let text, mainAsk, onClick;
        let to = `/room/${this.props.roomID}`;


        if (this.props.action === 'create') {
            text = 'White or Black?';
            mainAsk = [
                <input type="radio" checked={this.props.role === 'white'} onChange={()=>this.props.setRole('white')} />,
                <div className="dib pl2 pr4 f3">W</div>,
                <input type="radio" checked={this.props.role === 'black'} onChange={()=>this.props.setRole('black')} />,
                <div className="dib pl2 pr4 f3">B</div>,
            ];  
            onClick = this.createRoom;
        }

        else if (this.props.action === 'join' || this.props.action === 'watch') {
            text = capitalize(this.props.action);
            mainAsk = <input 
                className="w-80 br3 mb1 tc f2 ff-ubuntu" 
                type="text" 
                onKeyUp={this.props.handleInputRoomID} 
                placeholder="Enter Room ID"
            />;
            onClick = (this.props.action === 'join') ? this.joinRoom : null;
        }

        return (
            <div className={"absolute z-1 flex flex-coloum flex-wrap justify-center ba bw1 br3 w-70 h-50 tc bg-washed-blue"}>
                <div className="flex justify-center items-center w-80 f2 ff-ubuntu"> 
                    {text} 
                </div>
                <div className="w-80">
                    {mainAsk}
                </div>
                <Button text="OK!" width="80" bgColor="kanzo" onClick={onClick} to={to} />
                <Button text="cancel" width="80" bgColor="kurenai" onClick={this.props.cancel} />
            </div> 
        );
    }
}