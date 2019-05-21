import Bishop from '../components/pieces/Bishop';
import King from '../components/pieces/King';
import Knight from '../components/pieces/Knight';
import Pawn from '../components/pieces/Pawn';
import Queen from '../components/pieces/Queen';
import Rook from '../components/pieces/Rook';

export default (gridList) => {
    let grids = gridList.map((grid) => {
        if (grid === null) return null;
        else if (grid.piece === 'king') return new King(grid.role);
        else if (grid.piece === 'queen') return new Queen(grid.role);
        else if (grid.piece === 'bishop') return new Bishop(grid.role);
        else if (grid.piece === 'knight') return new Knight(grid.role);
        else if (grid.piece === 'rook') return new Rook(grid.role);
        else if (grid.piece === 'pawn') return new Pawn(grid.role);
    });
    return grids;
}