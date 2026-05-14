const express = require("express")
const app = express()

app.get("/",(req,res)=>{
    res.send("Hello world")
})
app.get("/pokemon",(req,res)=>{
    res.send("Hello pikachu")
})

app.listen("3000")