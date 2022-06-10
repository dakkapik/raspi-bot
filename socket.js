// piblaster 180 degree for servo is 0.06 - 0.24
// initialization x would be 90 ==> 0.15

class Turret {
    constructor () {
        this.STARTING_CONST = {
            X : 0.18,
            Y : null,
            Z : 0.18
        }
        this.angles = {
            x : 0.18,
            y : null,
            z : 0.18
        }
        this.upperLimit = 0.24
        this.lowerLimit = 0.06
        this.translationRatio = 1000
    }

    changePos ({ x, y, z }) {

        const nextPosX = this.STARTING_CONST.X + ( x / this.translationRatio )
        if( nextPosX > this.upperLimit ){
            console.log("> EXIDING UPPER LIMIT X")
        } else if (nextPosX < this.lowerLimit){
            console.log("> EXIDING LOWER LIMIT X")
        } else {
            this.angles.x = nextPosX
        }

        const nextPosZ = this.STARTING_CONST.Z + ( z / this.translationRatio )
        if( nextPosZ > this.upperLimit ){
            console.log("> EXIDING UPPER LIMIT Z")
        } else if (nextPosZ < this.lowerLimit){
            console.log("> EXIDING LOWER LIMIT Z")
        } else {
            this.angles.z = nextPosZ
        }
    }
}

class Gyroscope {
    constructor(){
        this.angles = {
            x: 0,
            y: 0,
            z: 0,
        }
        this.tressholdRepo = []
        this.tresshold = undefined
        this.tressholdSmplSize = 200
        this.tressholdMult = 2
    }

    updateG (x, y, z) {
        if(this.tresshold === undefined){
            this.setTresshold({x,y,z})
        } else {
            if(Math.abs(x) > this.tresshold.x) this.angles.x += x
            if(Math.abs(y) > this.tresshold.y) this.angles.y += y * 5
            if(Math.abs(z) > this.tresshold.z) this.angles.z += z
        }
    }

    setTresshold (angles) {
        if(this.tressholdRepo.length < this.tressholdSmplSize) {
            this.tressholdRepo.push(angles)
        } else if ( this.tressholdRepo.length === this.tressholdSmplSize ){
            const tresshold = {x: 0, y: 0, z: 0}

            this.tressholdRepo.forEach((a, i) => {
                tresshold.x += Math.abs(a.x)
                tresshold.y += Math.abs(a.y)
                tresshold.z += Math.abs(a.z)
                if(i === this.tressholdRepo.length - 1){
                    this.tresshold = {}
                    this.tressholdRepo = []
                    this.tresshold.x = (tresshold.x / this.tressholdSmplSize) * this.tressholdMult
                    this.tresshold.y = (tresshold.y / this.tressholdSmplSize) * this.tressholdMult
                    this.tresshold.z = (tresshold.z / this.tressholdSmplSize) * this.tressholdMult
                    console.log("tresshold set")
                }
            })
        }
    }
}

const gyro = new Gyroscope()
const turret = new Turret()
const devices = {}

module.exports = (io) => {

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
    
        if(gData !== undefined){
            if(devices["gyro-display"]) io.to(devices["gyro-display"]).emit("raw-gyro-data", gData)
            gyro.updateG(gData.Gx, gData.Gy, gData.Gz)
            io.emit("gyro-state", gyro)

            turret.changePos(gyro.angles)
            io.emit("turret-pos", turret.angles)
        }
    }
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