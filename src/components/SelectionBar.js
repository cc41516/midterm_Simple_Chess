import React, { Component } from "react";
import Button from "./Button"
import Name from "./Name"

export default class SelectionBar extends Component {
    render() {
        return (
            <div className="flex flex-wrap justify-center w-40 h-50 mb3">
                <Name setName={this.props.setName} />
                <Button text="Create" onClick={this.props.create} />
                <Button text="Join" onClick={this.props.join} />
                <Button text="Watch" onClick={this.props.watch} />
            </div>
        )
    }
}