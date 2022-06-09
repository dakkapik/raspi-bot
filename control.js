const ipGet = require("./util/ipGet");
const port = process.env.PORT || 5000;

const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);

app.use(express.static("public"))

let ip
if(process.platform === "linux") ip = ipGet()["wlan0"][0]
if(process.platform === 'win32') ip = ipGet()["Wi-Fi"][0]
// if(process.platform === 'win32') ip = ipGet()["Ethernet"][0]

app.get("/", (req, res)=> {
    res.sendFile(__dirname + '/public/control.html')
})

app.get("/gyro", (req, res)=> {
    res.sendFile(__dirname + '/public/gyro.html')
})

app.get("/turret-mock", (req, res)=> {
    res.sendFile(__dirname + '/public/turret-mock.html')
})



require("./socket")(io)

server.listen(port, ()=>{
    console.log('> listening on : http://' + ip + ":" + port);
})
