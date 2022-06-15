const Gyroscope = require("./Classes/Gyroscope")
const Accelerometer = require("./Classes/Accelerometer")
const Turret = require("./Classes/Turret")

const gyro = new Gyroscope()
const accel = new Accelerometer()
const turret = new Turret()
const devices = {}

module.exports = (io, app) => {
    app.get("/reset", (req, res) => {
        gyro.angles = {x:0, y: null, z:0}
        res.sendStatus(200)
    })

    io.on("connection", (socket) => {
        socket.on("purpose", (purpose) => handleConnect(purpose, socket.id))
        
        socket.on("gyro-raw-output", handleGyroComms)

        socket.on("mouse-pos", (data) => {
            if(!devices.gyro) io.emit("canvas-pos", data)
        })

        socket.on("disconnect", (reason) => handleDisconnect(reason, socket.id))
    });

    function handleGyroComms ( gyroValues ) {
        let gData = undefined;
        try {
            gData = JSON.parse( gyroValues )
        } catch (err) {
            console.error("> JSON PARSE ERROR ")
            // console.error(err)
        }

        // add data stream and on finish write on disconnect
        if(devices["noice-graph"]) {
            io.to(devices["noice-graph"]).emit("raw-gyro-data", gData)
        }
    
        if(gData !== undefined){
            if(devices["gyro-display"]) io.to(devices["gyro-display"]).emit("raw-gyro-data", gData)
            gyro.updateG(gData.Gx, gData.Gy, gData.Gz)
            accel.updateA(gData.Ax, gData.Ay, gData.Az)

            io.emit("gyro-state", gyro)
            io.emit("acc-state", accel)

            const {x, y, z} = gyro.angles

            turret.changePos({x: -z, y, z: -x})
            io.emit("turret-pos", turret.angles)
        }
    }
}


function writeToNoiceRepo(data) {

}

function handleConnect(purpose, socketId) {
    console.log("> DEVICE joined: ", purpose)
    devices[purpose] = socketId
}

function handleDisconnect ( reason, socketId ) {
    Object.entries(devices).forEach(([key, value]) => {
      if(socketId === value){
        delete devices[key]
        console.log("> DEVICE: ", key, "disconnected, reason: ", reason)
      }
    })
}