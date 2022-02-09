const express = require("express");
const cors = require("cors")
const ipGet = require("./ipGet")
const app = express();
const piblaster = require("pi-blaster.js")
const PORT = process.env.PORT || 3000;

app.use(cors())

app.get("/up",(req, res) => {
    piblaster.setPwm(17, 0.15)
    res.send("robot moving up")
})
app.get("/down",(req, res) => {
    console.log("no left commnad yet")
    res.send("robot moving down")
})
app.get("/right",(req, res) => {
    piblaster.setPwm(17, 0.06)
    res.send("robot moving right")
})
app.get("/left",(req, res) => {
    piblaster.setPwm(17, 0.24)
    res.send("robot cannot move like this at the moment")
})

app.get("/hello", (req, res)=>{
    console.log("executing greeting protocol")
    let times = 0

    const interval = setInterval(()=>{
        
        if(times > 9){
            clearInterval(interval)
            setTimeout(()=>{
                piblaster.setPwm(17, 0.06)
            }, 1000)
            res.send("done")
        }
        
        if(times % 2 === 0){
            piblaster.setPwm(17, 0.115)
        } else {
            piblaster.setPwm(17, 0.195)
        }

        times ++
    },200)
})

app.listen(PORT, ()=>{
    console.log("app listening: " + PORT)
    console.log("IP: ", ipGet())
    console.log("\n")
})
