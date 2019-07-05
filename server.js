const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
let dataList = {};
let seed = '1234';

app.use(express.static(path.join(__dirname, 'build')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

let getNextSeed = () => {
    while(dataList[seed]) {
        seed = (parseInt(seed) * 1213 % 9973).toString();
    }
    return seed;
}

io.set('origins', '*:*');
io.on('connection', function(socket) {
    console.log('connect!');
    let roomID;

    socket.on('error', (error) => {console.log(error)});

    socket.on('getEmptyRoomID', function() {
        roomID = getNextSeed();
        socket.emit('getEmptyRoomID', roomID);
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
                people: 1
            };
            console.log(`Room ${roomInfo.roomID} is created.`);
            console.log(`Player ${roomInfo.name} enters room${roomInfo.roomID}`)
            socket.emit(`createRoom${roomInfo.roomID}`, `Successfully create room${roomInfo.roomID}`)
        }
    });

    socket.on('joinRoom', function(roomInfo) {
        if (dataList[roomInfo.roomID]) {
            roomID = roomInfo.roomID;
            dataList[roomID].people += 1;

            let role;
            if (dataList[roomInfo.roomID].white) {
                role = 'black'
                dataList[roomInfo.roomID].black = roomInfo.name;
            }
            else {
                role = 'white'
                dataList[roomInfo.roomID].white = roomInfo.name;
            }

            console.log(`Player ${roomInfo.name} enters room${roomInfo.roomID}.`);
            socket.emit(`joinRoom${roomInfo.roomID}`, `Successfully join room${roomInfo.roomID}.`, role);
            io.emit(`getPlayerNames${roomInfo.roomID}`, dataList[roomInfo.roomID].white, dataList[roomInfo.roomID].black);
        }
        else {
            socket.emit('error', `Cannot find room${roomInfo.roomID}.`);
        }
    });

    socket.on('updateBoard', function(roomInfo) {
        if (dataList[roomInfo.roomID]) {
            dataList[roomInfo.roomID].grids = roomInfo.grids;
            dataList[roomInfo.roomID].turn = (dataList[roomInfo.roomID].turn === 'white') ? 'black' : 'white';
            io.emit(`updateBoard${roomInfo.roomID}`, dataList[roomInfo.roomID]);
        }
        else {
            socket.emit('error', `Cannot find room${roomInfo.roomID}.`);
        }
    });

    socket.on('getRoomInfo', function(roomID) {
        socket.emit(`getRoomInfo${roomID}`, dataList[roomID]);
    });

    socket.on('disconnect', function() {
        if (roomID) {
            if (dataList[roomID]){
                dataList[roomID].people -= 1;
                if (dataList[roomID].people <= 0) delete dataList[roomID];
            }
        }
    })
});

server.listen(process.env.PORT || 8080);