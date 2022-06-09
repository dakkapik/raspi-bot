const { time } = require("console")
const fs = require("fs")
module.exports = (io) => {
    let piblaster
    const ratio = 180 / 605

    if(process.platform === 'linux') piblaster = require("pi-blaster.js")

    io.on("connection", (socket) => {

        socket.on("purpose", (purpose) => {
            console.log("> client: ", purpose)
        })

        socket.on("canvas-pos", (pos) => {
            if(piblaster) {
                piblaster.setPwm(4, (pos.x * ratio) / 1000 + 0.06)
                piblaster.setPwm(17, (pos.y * ratio) / 1000 + 0.06)
            } else {
                console.log(pos)
            }
        })

        socket.on("giro", (giro)=> {
            try {
                const data = JSON.parse(giro)
                io.emit("giro-output", data)
            } catch (err) {
                // if(err) console.log(err)
                fs.writeFileSync("./error/" + Date.now() + ".txt", JSON.stringify({giro, err}))
            }
        })

    });
}