import Piece from "./Piece"
import htmlDecode from "../../utils/htmlDecode"

export default class Bishop extends Piece {
    constructor(role) {
        super(role, (role === 'white' ? htmlDecode('&#9815') : htmlDecode('&#9821')));
    }

    isMovePossible(src, dest) {
        return (Math.abs(src - dest) % 9 === 0 || Math.abs(src - dest) % 7 === 0);
    }

    getSrcToDestPath(src, dest) {
        let path = [], pathStart, pathEnd, incrementBy;
        if(src > dest){
            pathStart = dest;
            pathEnd = src;
        }
        else{
            pathStart = src;
            pathEnd = dest;
        }
        if (Math.abs(src - dest) % 9 === 0) {
            incrementBy = 9;
            pathStart += 9;
        }
        else {
            incrementBy = 7;
            pathStart += 7;
        }

        for (let i = pathStart; i < pathEnd; i+=incrementBy) {
            path.push(i);
        }
        return path;
    }
}