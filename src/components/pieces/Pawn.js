import Piece from "./Piece"
import htmlDecode from "../../utils/htmlDecode"

export default class Pawn extends Piece {
    constructor(role) {
		super(role, (role === 'white' ? htmlDecode('&#9817') : htmlDecode('&#9823')));
    	this.initialPositions = {
        	white: [48, 49, 50, 51, 52, 53, 54, 55],
        	black: [8, 9, 10, 11, 12, 13, 14, 15]
      }
    }

    isMovePossible(src, dest, isDestEnemyOccupied) {
      	if (this.role === 'white') {
      		if ((dest === src - 8 && !isDestEnemyOccupied) || (dest === src - 16 && this.initialPositions['white'].indexOf(src) !== -1)) {
      		  	return true;
      		}
      		else if(isDestEnemyOccupied && (dest === src - 9 || dest === src - 7)) {
      		  	return true;
      		}
      	}
      	else if(this.role === 'black') {
      		if ((dest === src + 8 && !isDestEnemyOccupied) || (dest === src + 16 && this.initialPositions['black'].indexOf(src) !== -1)) {
      		  	return true;
      		}
      		else if (isDestEnemyOccupied && (dest === src + 9 || dest === src + 7)) {
      		  	return true;
      		}
      	}
      	return false;
    }

    getSrcToDestPath(src, dest) {
      	if(dest === src - 16) {
    		return [src - 8];
      	}
      	else if(dest === src + 16) {
        	return [src + 8];
      	}
      	return [];
    }
}