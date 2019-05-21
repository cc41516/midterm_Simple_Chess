import React, {Component} from "react";
import Game from "./Game";

export default class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'Waiting for opponent...'
        }
        this.getPlayerNames();
    }

    getPlayerNames = () => {
        this.props.socket.on(`getPlayerNames${this.props.roomID}`, (white, black) => {
            this.setState({
                status: white + '  V.S.  ' + black
            })
        });
    }

    render() {
        return (
            <div className="relative center top-3-m flex flex-wrap justify-center items-center w40-m h40-m">
                <div className="pb3 f2 ff-ubuntu">{this.state.status}</div>
                <Game {...this.props} />
            </div>
        );
    }
    
}