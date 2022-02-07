const piblaster = require("pi-blaster.js")

piblaster.setPwm(11, 0.2)

setTimeout(()=>{
    piblaster.setPwm(11,0)
}, 2000)