let print = console.log
const express = require("express")
const app = express()// now "app" is a surver instence
//print(app) this will print all in-build fuctions of express module 
let port = 3000; //Ports are the logical endpoints of a network connection that is used to exchange information between a web server and a web client 

app.listen(port,()=> {
    print(`app is listening on the port ${port}`)
})


