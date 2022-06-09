// const fs = require("fs")
// piblaster 180 degree for servo is 0.06 - 0.24
// initialization x would be 90 ==> 0.15
const NOICE_MULTIPLIER = 2
const turretPos = {x: 0.15, y: 0.06}
const gyroPos = {x: 0.15, y: 0.06}
const gyroNoice = {x: undefined, y: undefined}

module.exports = (io) => {

    io.on("connection", (socket) => {
        socket.on("purpose", (purpose) => console.log("> client: ", purpose))
        
        socket.on("giro", (giro)=> {
            try {
                const data = JSON.parse(giro)
                io.emit("giro-output", data)

                if(gyroNoice.x === undefined) updateNoiceTresshold('x', data.Gx)
                if(gyroNoice.y === undefined) updateNoiceTresshold('y', data.Gy)

                if(Math.abs(data.Gx) > gyroNoice.x) gyroPos.x += (data.Gx / 100)
                if(Math.abs(data.Gy) > gyroNoice.y) gyroPos.y += (data.Gy / 100)

                if(gyroPos.x > 0.06 && gyroPos.x < 0.24) turretPos.x = gyroPos.x
                if(gyroPos.y > 0.06 && gyroPos.y < 0.24) turretPos.y = gyroPos.y

                // console.log(turretPos)

                io.emit("turret-pos", turretPos)
                io.emit("meta-data", gyroPos, gyroNoice)
            } catch (err) {
                if(err) console.error(err)
                // fs.writeFileSync("./error/" + Date.now() + ".txt", JSON.stringify({giro, err}))
            }
        })

        socket.on("disconnect", (reason) => console.log("> device disconnected: " + reason))
    });

}

function updateNoiceTresshold(axis, v) {
    const value = Math.abs(v)
    const noice = value * NOICE_MULTIPLIER
    switch( axis ){
        case "x":
            gyroNoice.x = noice
        break;
        case "y":
            gyroNoice.y = noice 
        break;
        case "z":
            gyroNoice.z = noice * 2
        break;
    }
}