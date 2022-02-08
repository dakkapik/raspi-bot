const express = require("express");
const cors = require("cors")
const ipGet = require("./ipGet")
const app = express();
const piblaster = require("pi-blaster.js")
const PORT = process.env.PORT || 3000;

app.use(cors())

app.get("/up",(req, res) => {
    piblaster.setPwm(17, 0.06)
    res.send("robot moving up")
})
app.get("/down",(req, res) => {
    piblaster.setPwm(17, 0.24)
    res.send("robot moving down")
})
app.get("/right",(req, res) => {
    piblaster.setPwm(17, 0.15)
    res.send("robot moving right")
})
app.get("/left",(req, res) => {
    console.log("no left commnad yet")
    res.send("robot cannot move like this at the moment")
})

app.get("/hello", (req, res)=>{
    let times = 0

    const interval = setInterval(()=>{
        times ++
        console.log(times % 2)

        if(times > 7){
            piblaster.setPwm(17, 0.06)
            res.send("done")
            clearInterval(interval)
        }

        if(times % 2 === 0){
            console.log("move up")
            piblaster.setPwm(17, 0.115)
        } else {
            console.log("move down")
            piblaster.setPwm(17, 0.195)
        }
    },1000)
})

app.listen(PORT, ()=>{
    console.log("app listening: " + PORT)
    console.log("IP: ", ipGet())
})
