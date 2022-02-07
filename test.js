const piblaster = require("pi-blaster.js")

piblaster.setPwm(17, 1)

setTimeout(()=>{
    piblaster.setPwm(17,0)
}, 2000)