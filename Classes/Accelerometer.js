// piblaster 180 degree for servo is 0.06 - 0.24
// initialization x would be 90 ==> 0.15

module.exports = class Accelerometer {
    constructor() {
        this.axis = {
            x: 0,
            y: 0,
            z: 0,
        }
        this.tressholdRepo = []
        this.tresshold = undefined
        this.tressholdSmplSize = 200
        this.tressholdMult = 1
    }
    updateA (x, y, z) {
        if(this.tresshold === undefined){
            this.setTresshold({x,y,z})
        } else {
            if(Math.abs(x) > this.tresshold.x) this.axis.x += x
            if(Math.abs(y) > this.tresshold.y) this.axis.y += y * 5
            if(Math.abs(z) > this.tresshold.z) this.axis.z += z
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