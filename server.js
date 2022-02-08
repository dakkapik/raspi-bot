const express = require("express");
const cors = require("cors")
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
            clearInterval(interval)
        }

        if(times % 2 === 2){
            console.log("move up")
            piblaster.setPwm(17, 0.06)
        } else {
            console.log("move down")
            piblaster.setPwm(17, 0.24)
        }


    },2000)
})

app.listen(PORT, ()=>console.log("app listening: ", PORT))
