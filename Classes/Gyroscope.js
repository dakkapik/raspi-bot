// piblaster 180 degree for servo is 0.06 - 0.24
// initialization x would be 90 ==> 0.15

module.exports = class Gyroscope {
    constructor(){
        this.angles = {
            x: 0,
            y: 0,
            z: 0,
        }
        this.sampleRepo = {
            x: [],
            y: [],
            z: []
        }
        this.mean = {};
        this.standardDeviation = {};
        this.filter = undefined;
        this.iteration = 0;
        this.popSize = 200;
        this.diviationMultiplier = 2;

    }

    updateG (x, y, z) {
        if(this.filter === undefined){
            this.updateRepo(x,y,z)
        } else {
            if(x > this.filter.x.top || x < this.filter.x.bottom) this.angles.x += x
            if(y > this.filter.y.top || y < this.filter.y.bottom) this.angles.y += y
            if(z > this.filter.z.top || z < this.filter.z.bottom) this.angles.z += z
        }
    }

    updateRepo(x,y,z) {
        if(this.iteration < this.popSize){
            this.sampleRepo.x.push(x)
            this.sampleRepo.y.push(y)
            this.sampleRepo.z.push(z)
            this.iteration ++;
        } else {
            this.filter = {}
            this.calcAxisFilter("x")
            this.calcAxisFilter("y")
            this.calcAxisFilter("z")
        }
    }

    calcAxisFilter( axis ) {
        const sampleData = this.sampleRepo[axis]

        let sumTotal = 0;
        // check if pop size and iteration are the same
        console.log("xdata length: " , sampleData.length)
        console.log("iteration: " , this.iteration)

        for(let i = 0; i < sampleData.length; i++) sumTotal += sampleData[i]

        this.mean[axis] = sumTotal / sampleData.length

        let stdDiv = 0
        sampleData.forEach(value => stdDiv += (value - this.mean[axis])*(value - this.mean[axis]))
        stdDiv = Math.sqrt(stdDiv / (sampleData.length - 1))

        this.standardDeviation[axis] = stdDiv;
        this.filter[axis] = {top: this.mean[axis] + stdDiv * this.diviationMultiplier, bottom: this.mean[axis] - stdDiv * this.diviationMultiplier}
    }
}