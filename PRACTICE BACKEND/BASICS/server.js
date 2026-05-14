const app = require("./src/app")

app.get("/",(req,res)=>{
    console.log("Server is running")
    res.send("Hello world")
})
app.listen("3000",()=>{
    console.log("Server is created")
})