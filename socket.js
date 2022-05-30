module.exports = (io) => {
    let piblaster
    const ratio = 180 / 605

    if(process.platform === 'linux') piblaster = require("pi-blaster.js")


    io.on("connection", (socket) => {

        socket.on("purpose", (purpose) => {
            console.log("> ", purpose)
        })

        socket.on("canvas-pos", (pos) => {
            piblaster.setPwm(4, (pos.x * ratio) / 1000 + 0.06)
            piblaster.setPwm(17, (pos.y * ratio) / 1000 + 0.06)
        })

    });
}