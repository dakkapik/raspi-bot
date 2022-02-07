const piblaster = require("pi-blaster.js")

piblaster.setPwm(11, 1)

setTimeout(()=>{
    piblaster.setPwm(11,0)
}, 3000)