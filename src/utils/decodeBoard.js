import htmlDecode from "./htmlDecode"


export default (grids) => {
    let gridList = grids.map((grid) => {
        if (grid === null) return null;
        else if (grid.icon === htmlDecode('&#9812')) return {piece: 'king', role: 'white'};
        else if (grid.icon === htmlDecode('&#9813')) return {piece: 'queen', role: 'white'};
        else if (grid.icon === htmlDecode('&#9814')) return {piece: 'rook', role: 'white'};
        else if (grid.icon === htmlDecode('&#9815')) return {piece: 'bishop', role: 'white'};
        else if (grid.icon === htmlDecode('&#9816')) return {piece: 'knight', role: 'white'};
        else if (grid.icon === htmlDecode('&#9817')) return {piece: 'pawn', role: 'white'};
        else if (grid.icon === htmlDecode('&#9818')) return {piece: 'king', role: 'black'};
        else if (grid.icon === htmlDecode('&#9819')) return {piece: 'queen', role: 'black'};
        else if (grid.icon === htmlDecode('&#9820')) return {piece: 'rook', role: 'black'};
        else if (grid.icon === htmlDecode('&#9821')) return {piece: 'bishop', role: 'black'};
        else if (grid.icon === htmlDecode('&#9822')) return {piece: 'knight', role: 'black'};
        else if (grid.icon === htmlDecode('&#9823')) return {piece: 'pawn', role: 'black'};
    });
    return gridList;
}