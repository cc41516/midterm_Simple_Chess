import Piece from "./Piece"
import htmlDecode from "../../utils/htmlDecode"

export default class Queen extends Piece {
    constructor(role) {
        super(role, (role === 'white' ? htmlDecode('&#9813') : htmlDecode('&#9819')));
    }

    isMovePossible(src, dest) {
        let mod = src % 8;
        let diff = 8 - mod;

        return (Math.abs(src - dest) % 9 === 0 || Math.abs(src - dest) % 7 === 0) ||
            (Math.abs(src - dest) % 8 === 0 || (dest >= (src - mod) && dest < (src + diff)));
    }

    getSrcToDestPath(src, dest) {
        let path = [], pathStart, pathEnd, incrementBy;

        if (src > dest){
            pathStart = dest;
            pathEnd = src;
        }
        else {
            pathStart = src;
            pathEnd = dest;
        }

        if (Math.abs(src - dest) % 8 === 0){
            incrementBy = 8;
            pathStart += 8;
        }
        else if (Math.abs(src - dest) % 9 === 0){
            incrementBy = 9;
            pathStart += 9;
        }
        else if (Math.abs(src - dest) % 7 === 0){
            incrementBy = 7;
            pathStart += 7;
        }
        else {
            incrementBy = 1;
            pathStart += 1;
        }

        for (let i = pathStart; i < pathEnd; i += incrementBy) {
            path.push(i);
        }
        return path;
    }
}