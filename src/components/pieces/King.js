import Piece from "./Piece"
import htmlDecode from "../../utils/htmlDecode"

export default class King extends Piece {
    constructor (role) {
        super(role, (role === 'white' ? htmlDecode('&#9812') : htmlDecode('&#9818')));
    }

    isMovePossible(src, dest) {
        return (src - 9 === dest || 
            src - 8 === dest || 
            src - 7 === dest || 
            src + 1 === dest || 
            src + 9 === dest || 
            src + 8 === dest || 
            src + 7 === dest || 
            src - 1 === dest);
    }

    getSrcToDestPath(src, dest) {
        return [];
    }
}