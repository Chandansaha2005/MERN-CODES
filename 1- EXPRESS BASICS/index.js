let print = console.log
const express = require("express")// this is our server
const app = express()// now "app" is a Server instence
//print(app) this will print all in-build fuctions of express module 
let port = 3000; //Ports are the logical endpoints of a network connection that is used to exchange information between a web server and a web client 

app.listen(port,()=> {
    print(`app is listening on the port ${port}`)
})

app.use((req,res)=>{
    // print("request received")
    // res.send("Response send"); 
    res.send({
        name: "chandan",
        number: 123
    }); 
    // res.send("<h1>This is an example of Html Response</h1>"); 
})


