import React, {Component} from "react";
import Board from "../components/Board";
import Title from "../components/Title";
import AskWindow from "../components/AskWindow"
import SelectionBar from "../components/SelectionBar";
import initBoard from "../utils/initBoard"

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAskWindow: false,
            action: ''
        };
    }
    
    showAskWindow = (action) => {
        this.setState({
            showAskWindow: true,
            action: action
        });
    }

    create = () => {
        let {socket, setRoomID} = this.props;
        socket.emit('getEmptyRoomID');
        socket.on('getEmptyRoomID', function(seed) {
            setRoomID(seed);
        });
        this.showAskWindow("create");
    }

    watch = () => {
        this.props.setRole('watcher');
        this.showAskWindow("watch");
    }
    
    cancel = () => {
        this.setState({
            showAskWindow: false,
            action: ''
        });
    };

    render() {
        let grids = initBoard();
        let askWindow = (this.state.showAskWindow) ?
            <AskWindow 
                {...this.props}
                action={this.state.action}
                cancel={this.cancel}
            /> :
            null;
        
        return (
        <div className="relative center top-3-m flex flex-wrap justify-center items-center w40-m h40-m">
            <Board status="display" grids={grids} />
            <div className="absolute flex flex-column justify-around items-center w-100 h-100">
                <Title />
                <SelectionBar
                    socket={this.props.socket}
                    setName={this.props.setName}
                    create={this.create}
                    join={()=>this.showAskWindow("join")} 
                    watch={this.watch} 
                />
                {askWindow}
            </div>
        </div>
        );
    }
}