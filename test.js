const piblaster = require("pi-blaster.js")

piblaster.setPwm(4, 0.5)

setTimeout(()=>{
    piblaster.setPwm(4, 0)
}, 2000)