const express = require("express");
const cors = require("cors")
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())

app.get("/up",(req, res) => {
    console.log("up command recived")
    res.send("robot moving up")
})
app.get("/down",(req, res) => {
    console.log("down command recived")
    res.send("robot moving down")
})
app.get("/right",(req, res) => {
    console.log("right command recived")
    res.send("robot moving right")
})
app.get("/left",(req, res) => {
    console.log("left command recived")
    res.send("robot moving left")
})

app.listen(PORT, ()=>console.log("app listening: ", PORT))
