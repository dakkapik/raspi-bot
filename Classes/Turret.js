// piblaster 180 degree for servo is 0.06 - 0.24
// initialization x would be 90 ==> 0.15

module.exports = class Turret {
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
