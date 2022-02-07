const piblaster = require("pi-blaster.js")

piblaster.setPwm(17, 0.2)

setTimeout(()=>{
    piblaster.setPwm(4, 0.5)
}, 2000)

setTimeout(()=>{
    piblaster.setPwm(4, 0)
}, 4000)