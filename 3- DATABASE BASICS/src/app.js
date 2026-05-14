const express = require("express")
const app = express()
const noteModel = require("./models/note.models")
app.use(express.json())

//POST 
app.post("/notes", async (req, res) => {
    const data = req.body

    await noteModel.create({
        title: data.title,
        description: data.description
    })
    console.log("Data Posted")

    res.status(201).json({
        message: "Note Created Succesfully"
    })
})

//GET 
app.get("/notes", async (req, res) => {
    /*const notes = await noteModel.find() give an array of all objects*/
    /* find()=> [{},{}] or []
       findOne()=>{} od null */
    const notes = await noteModel.findOne({
        title:"day2"
    })
    res.status(200).json({
        message: "Note Fatched Succesfully",
        notes: notes
    })
})
module.exports = app