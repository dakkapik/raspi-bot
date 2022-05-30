module.exports = (io) => {
    let piblaster
    const ratio = 0.18 / 605

    if(process.platform === 'linux') piblaster = require("pi-blaster.js")


    io.on("connection", (socket) => {

        socket.on("purpose", (purpose) => {
            console.log("> ", purpose)
        })

        socket.on("canvas-pos", (pos) => {
            piblaster.setPwm(4, pos.x * ratio + 0.6)
            console.log(pos)
        })

    });
}