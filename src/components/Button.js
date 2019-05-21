import React, {Component} from "react";
import { NavLink } from "react-router-dom";

export default class Button extends Component {
    render() {
        let width = (this.props.width) ? ` w-${this.props.width} ` : ' w-100 ';
        let bgColor = (this.props.bgColor) ? ` bg-${this.props.bgColor} ` : ' bg-nae ';
        let style = "flex justify-center items-center ma2 br2 tc f2 ff-ubuntu light-gray pointer grow usn" 
                    + width + bgColor + this.props.addStyle;
        let to = this.props.to || '/';
        
        return (
            <div className={style} href="/" onClick={this.props.onClick}>
                <NavLink to={to} className='w-100 tc light-gray no-underline' >
                    {this.props.text}
                </NavLink>
            </div>
        )
    }
}