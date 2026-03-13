let print = console.log
const express = require("express")// this is our server
const app = express()// now "app" is a Server instence
//print(app) this will print all in-build fuctions of express module 
let port = 3000; //Ports are the logical endpoints of a network connection that is used to exchange information between a web server and a web client 

app.listen(port, () => {
    print(`app is listening on the port ${port}`)
})

// app.use((req,res)=>{
//     // print("request received")
//     // res.send("Response send"); 
//     res.send({
//         name: "chandan",
//         number: 123
//     }); 
//     // res.send("<h1>This is an example of Html Response</h1>"); 
// })

//routing

app.get("/", (req, res) => {
    res.send("you connected with root path")
})
app.get("/route1", (req, res) => {
    res.send("you connected with route1")
})
app.get("/route2", (req, res) => {
    res.send("you connected with route2")
})

// app.get('*', (req, res) => {
//     res.send("Page not found");
// });
app.post("/", (req, res) => {
    res.send("you connected with root using post")
})



// app.get("/:username", (req, res) => {
//     print(req.params)  //[Object: null prototype] { username: 'chandan' }
//     res.send("you connected with root path")
// })

// app.get("/:username/:id", (req, res) => {
//     print(req.params)  //[Object: null prototype] { username: 'chandan', id: '5165' }
//     res.send("you connected with root path")
// })

// app.get("/:username",(req,res) =>{
//     let {username,id}=req.params;
//     res.send(`welcome to the page, ${username}`)
// })

app.get("/search",(req,res) =>{
    // print(req.query)
    let {q}=req.query
    if(!q){
        res.send()
    }
    res.send(`search result for ${q}`)
})