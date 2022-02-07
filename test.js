const piblaster = require("pi-blaster.js")

setInterval(() => {
    piblaster.setPwm(17, 0.8)
}, 200);




// setTimeout(()=>{
//     piblaster.setPwm(17, 0)
// }, 4000)