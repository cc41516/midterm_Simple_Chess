import React, {Component} from "react";
import Grid from "./Grid";
import encodeBoard from "../utils/encodeBoard";

export default class Board extends Component {
    renderGrid(piece, index) {
        let x = index % 8;
        let y = (index - x) / 8;
        let icon = piece ? piece.icon : null;
        let bgColor;
        
        bgColor = (x + y) % 2 ? ' bg-dark-grid ' : ' bg-light-grid ';
        if (piece && piece.bgColor) { // piece is selected
            bgColor = piece.bgColor; 
        }
        
        return <Grid bgColor={bgColor} icon={icon} onClick={()=>this.props.onClick(index)} />;
    }

    render() {
        let opacity = (this.props.status === 'display') ? ` o-40 nz-1 ` : null;
        let grids = this.props.grids.map((piece, index) => {
            return this.renderGrid(piece, index);
        })

        return (
            <div className={"flex flex-wrap w-100 h-100 " + opacity}>
                {grids}
            </div>
        );
    }
}