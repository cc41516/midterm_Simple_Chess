import Piece from "./Piece"
import htmlDecode from "../../utils/htmlDecode"

export default class Knight extends Piece {
    constructor (role) {
		super(role, (role === 'white' ? htmlDecode('&#9816') : htmlDecode('&#9822')));
    }

    isMovePossible(src, dest) {
    	return (src - 17 === dest || 
    		src - 10 === dest || 
    		src + 6 === dest || 
    		src + 15 === dest || 
    		src - 15 === dest || 
    		src - 6 === dest || 
    		src + 10 === dest || 
    		src + 17 === dest);
    }

    getSrcToDestPath() {
      	return [];
    }
}