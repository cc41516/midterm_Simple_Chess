export default function initBoard() {
    const grids = Array(64).fill(null);

    for (let i = 8; i < 16; i++) {
        grids[i] = {piece: 'pawn', role: 'black'};
        grids[i+40] = {piece: 'pawn', role: 'white'};
    }

    grids[0] = {piece: 'rook', role: 'black'};
    grids[7] = {piece: 'rook', role: 'black'};
    grids[56] = {piece: 'rook', role: 'white'};
    grids[63] = {piece: 'rook', role: 'white'};

    grids[1] = {piece: 'knight', role: 'black'};
    grids[6] = {piece: 'knight', role: 'black'};
    grids[57] = {piece: 'knight', role: 'white'};
    grids[62] = {piece: 'knight', role: 'white'};

    grids[2] = {piece: 'bishop', role: 'black'};
    grids[5] = {piece: 'bishop', role: 'black'};
    grids[58] = {piece: 'bishop', role: 'white'};
    grids[61] = {piece: 'bishop', role: 'white'};

    grids[3] = {piece: 'queen', role: 'black'};
    grids[4] = {piece: 'king', role: 'black'};

    grids[59] = {piece: 'queen', role: 'white'};
    grids[60] = {piece: 'king', role: 'white'};

    return grids;
}