import Piece from "./Piece"
import htmlDecode from "../../utils/htmlDecode"

export default class Rook extends Piece {
    constructor(role) {
        super(role, (role === 'white' ? htmlDecode('&#9814') : htmlDecode('&#9820')));
    }

    isMovePossible(src, dest) {
        let mod = src % 8;
        let diff = 8 - mod;
        return (Math.abs(src - dest) % 8 === 0 || (dest >= (src - mod) && dest < (src + diff)));
    }

    getSrcToDestPath(src, dest) {
        let path = [], pathStart, pathEnd, incrementBy;
        
        if (src > dest) {
            pathStart = dest;
            pathEnd = src;
        }
        else { 
            pathStart = src;
            pathEnd = dest;
        }
        if (Math.abs(src - dest) % 8 === 0) {
            incrementBy = 8;
            pathStart += 8;
        }
        else {
            incrementBy = 1;
            pathStart += 1;
        }

        for (let i = pathStart; i < pathEnd; i+=incrementBy) {
            path.push(i);
        }
        return path;
    }
}