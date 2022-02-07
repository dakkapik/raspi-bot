const piblaster = require("pi-blaster.js")

while(true){
    piblaster.setPwm(17, 0.8)
}



// setTimeout(()=>{
//     piblaster.setPwm(17, 0)
// }, 4000)