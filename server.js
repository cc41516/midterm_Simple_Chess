const express = require('express');
const bodyParser = require('body-parser')
const app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
let dataList = {};
let seed = '1';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

io.set('origins', '*:*');
io.on('connection', function(socket) {
    console.log('connect!');

    socket.on('getEmptyRoomID', function() {
        seed = ((parseInt(seed) * 1213) % 9973).toString();
        socket.emit('getEmptyRoomID', seed);
    })

    socket.on('createRoom', function(roomInfo) {
        if (dataList[roomInfo.roomID]) {
            socket.emit('error', `Room${roomInfo.roomID} has been created.`);
        }
        else {
            dataList[roomInfo.roomID] = {
                roomID: roomInfo.roomID,
                grids: roomInfo.grids,
                white: (roomInfo.role === 'white') ? roomInfo.name : null,
                black: (roomInfo.role === 'black') ? roomInfo.name : null,
                turn: 'white',
            };
            console.log('server: room', seed, 'created');
            socket.emit(`createRoom${roomInfo.roomID}`, `Successfully create room${roomInfo.roomID}`)
        }
    });

    socket.on('joinRoom', function(roomInfo) {
        if (!dataList[roomInfo.roomID]) {
            socket.emit('error', `Cannot find room${roomInfo.roomID}.`);
        }
        else {
            let role;
            if (dataList[roomInfo.roomID].white) {
                role = 'black'
                dataList[roomInfo.roomID].black = roomInfo.name;
            }
            else {
                role = 'white'
                dataList[roomInfo.roomID].white = roomInfo.name;
            }
            socket.emit(`joinRoom${roomInfo.roomID}`, `Successfully join room${roomInfo.roomID}.`, role);
            io.emit(`getPlayerNames${roomInfo.roomID}`, dataList[roomInfo.roomID].white, dataList[roomInfo.roomID].black);
        }
    });

    socket.on('updateBoard', function(roomInfo) {
        if (!dataList[roomInfo.roomID]) {
            socket.emit('error', `Cannot find room${roomInfo.roomID}.`);
        }
        else {
            dataList[roomInfo.roomID].grids = roomInfo.grids;
            dataList[roomInfo.roomID].turn = (dataList[roomInfo.roomID].turn === 'white') ? 'black' : 'white';
            io.emit(`updateBoard${roomInfo.roomID}`, dataList[roomInfo.roomID]);
        }
    });

    socket.on('getRoomInfo', function(roomID) {
        socket.emit(`getRoomInfo${roomID}`, dataList[roomID]);
    });
});

server.listen(process.env.PORT || 8080);