import React, {Component} from "react";
import Board from "../components/Board";
import encodeBoard from "../utils/encodeBoard";
import decodeBoard from "../utils/decodeBoard";

export default class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomID: '',
            grids: [],
            turn: '',
            sourceSelection: -1,
            status: '',
        }
        this.props.socket.emit('getRoomInfo', this.props.roomID);
        this.props.socket.on(`getRoomInfo${this.props.roomID}`, (roomInfo) => {
            this.getRoomInfo(roomInfo);
        });
        this.props.socket.on(`updateBoard${this.props.roomID}`, (roomInfo) => {
            this.updateBoard(roomInfo);
        });
    }

    getRoomInfo = (roomInfo) => {
        this.setState({
            roomID: roomInfo.roomID,
            grids: encodeBoard(roomInfo.grids),
            turn: roomInfo.turn,
        })
    }

    updateBoard = (roomInfo) => {
        this.setState({
            grids: encodeBoard(roomInfo.grids),
            turn: roomInfo.turn
        });
    }

    handleClick(i) {
        const grids = this.state.grids.slice();
        
        if (grids[i] && this.state.sourceSelection === -1) {
            if (grids[i].role !== this.props.role && this.state.turn !== this.props.role) {
                this.setState({status: "Wrong selection. Choose role " + this.state.turn + " pieces."});
            }
            else if (grids[i].role === this.props.role && this.state.turn === this.props.role) {
                grids[i].bgColor = ' bg-light-emerald ';
                this.setState({
                  status: "Choose destination for the selected piece",
                  sourceSelection: i
                });
            }
        }
    
        else if (this.state.sourceSelection > -1) {
            grids[this.state.sourceSelection].bgColor = '';
            if (grids[i] && grids[i].role === this.props.role) {
                this.setState({
                    status: "Wrong selection. Choose valid source and destination again.",
                    sourceSelection: -1,
                });
            }
            else {
                const grids = this.state.grids.slice();
                const isDestEnemyOccupied = grids[i] ? true : false; 
                const isMovePossible = grids[this.state.sourceSelection].isMovePossible(this.state.sourceSelection, i, isDestEnemyOccupied);
                const srcToDestPath = grids[this.state.sourceSelection].getSrcToDestPath(this.state.sourceSelection, i);
                const isMoveLegal = this.isMoveLegal(srcToDestPath);
    
                if (isMovePossible && isMoveLegal) {
                    grids[i] = grids[this.state.sourceSelection];
                    grids[this.state.sourceSelection] = null;
                    this.props.socket.emit('updateBoard', {
                        roomID: this.props.roomID,
                        grids: decodeBoard(grids),
                    })
                    this.setState({
                        status: '',
                        sourceSelection: -1,
                    });
                }
                else {
                    this.setState({
                        status: "Wrong selection. Choose valid source and destination again.",
                        sourceSelection: -1,
                    });
                }
            }
        }
    }

    isMoveLegal(srcToDestPath){
      let isLegal = true;
      for (let i = 0; i < srcToDestPath.length; i++) {
        if (this.state.grids[srcToDestPath[i]] !== null) {
          isLegal = false;
        }
      }
      return isLegal;
    }

    render() {
        return (
            <div className="w-100 h-100">
                <Board grids={this.state.grids} onClick={(i)=>this.handleClick(i)} reverse={false} />
                <div className="pv2 f4 ff-ubuntu">Turn: {this.state.turn}</div>
                <div className="f5 ff-ubuntu">{this.state.status}</div>
            </div>
        );
    }
}