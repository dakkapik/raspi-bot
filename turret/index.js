const path = require("path");

const { io } = require("socket.io-client")
const { stdout, stderr } = require('node:process');
const { spawn } = require("child_process");

const { Readable } = require("stream")



const child = spawn('./a', [] , {
    stdio: ['pipe','pipe', stderr],
    cwd: path.resolve(path.join(__dirname,'src'))
})

child.stdout.pipe(stdout)

const socket = io ("http://192.168.0.210:5000")
/// your ip ^^^^^^^

socket.on("connect",() => {
    socket.emit("purpose", "turret")
})

socket.on("canvas-pos", ( pos )=> {
    const readable = Readable.from([pos])
    readable.pipe(child.stdin)
})