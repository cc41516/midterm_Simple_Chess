import React from "react";

export default ({setName}) => {
    return (
        <input 
            id="Name"
            className="flex justify-center items-center w-100 ma2 bn br2 tc f2 ff-ubuntu light-gray bg-blue link" 
            autoComplete="off" 
            spellCheck="false" 
            placeholder="Name"
            onKeyUp={setName}
        />
    )
}