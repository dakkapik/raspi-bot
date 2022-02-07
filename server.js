const express = require("express");
const cors = require("cors")
const app = express();
const piblaster = require("pi-blaster.js")
const PORT = process.env.PORT || 3000;

app.use(cors())

app.get("/up",(req, res) => {
    console.log("up command recived")
    res.send("robot moving up")
    piblaster.setPwm(17, 0.06)
})
app.get("/down",(req, res) => {
    console.log("down command recived")
    res.send("robot moving down")
    piblaster.setPwm(17, 0.24)
})
app.get("/right",(req, res) => {
    console.log("right command recived")
    res.send("robot moving right")
    piblaster.setPwm(17, 0.15)
})
app.get("/left",(req, res) => {
    console.log("left command recived")
    res.send("robot moving left")
})

app.listen(PORT, ()=>console.log("app listening: ", PORT))
