const piblaster = require("pi-blaster.js")

piblaster.setPwm(17, 0.8)

setTimeout(()=>{
    piblaster.setPwm(17, 0)
}, 10000)

// setTimeout(()=>{
//     piblaster.setPwm(17, 0)
// }, 4000)