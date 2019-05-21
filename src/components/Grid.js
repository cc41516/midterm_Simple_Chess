import React from "react";

export default ({bgColor, icon, onClick}) => {
	let pointer = (icon) ? ' pointer ' : null;
	return (
    	<div className={"w-one-eighth h-one-eighth tc fs-4-m usn" + bgColor + pointer} onClick={onClick}>
			{icon}
		</div>
    );
}