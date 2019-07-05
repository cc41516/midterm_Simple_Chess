import React, {Component} from "react";
import Game from "./Game";

export default class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerStatus: 'Waiting for opponent...'
        }
        this.getPlayerNames();
    }

    setPlayerStatus = (str) => {
        this.setState({
            playerStatus: str
        });
    }

    getPlayerNames = () => {
        this.props.socket.on(`getPlayerNames${this.props.roomID}`, (white, black) => {
            this.setState({
                playerStatus: white + '   V.S.   ' + black
            });
        });
    }

    render() {
        return (
            <div className="relative center top-3-m flex flex-wrap justify-center items-center w40-m h40-m">
                <div className="pb3 f2 ff-ubuntu">{this.state.playerStatus}</div>                
                <Game {...this.props} setPlayerStatus={(str)=>this.setPlayerStatus(str)} />
            </div>
        );
    }

    componentWillUnmount = () => {
        this.props.socket.off(`getPlayerNames${this.props.roomID}`);
    }
    
}