const piblaster = require("pi-blaster.js")
piblaster.setPwm(17, 0.8)

setTimeout(()=>{
    piblaster.setPwm(17, 0)
},2)




// setTimeout(()=>{
//     piblaster.setPwm(17, 0)
// }, 4000)