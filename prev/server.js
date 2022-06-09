const express = require("express");
const cors = require("cors");
const path = require("path");
const ipGet = require("../util/ipGet");
const app = express();
let piblaster 
if(process.platform === 'linux') piblaster = require("pi-blaster.js")
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "/controls")))
app.use(cors())

let ip
if(process.platform === "linux") ip = ipGet()["wlan0"][0]
// if(process.platform === 'win32') ip = ipGet()["Wi-Fi"][0]
if(process.platform === 'win32') ip = ipGet()["Ethernet"][0]


app.get("/", (req,res)=> {
    res.sendFile(path.join(__dirname, "/controls/controls.html"))
})

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
            }, 200)
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
    console.log("IP: ", ip)
    console.log("app listening: " + PORT)
    console.log("\n")
})
