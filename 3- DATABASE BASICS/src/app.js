const express = require("express")
const app = express()
const noteModel = require("./models/note.models")
app.use(express.json())

//POST 
app.post("/notes", async (req, res) => {
    const data = req.body
    console.log(data)
    await noteModel.create({
        title: data.title,
        description: data.description
    })
    console.log("Data Posted")
    res.status(201).json({
        message: "Note Created Succesfully"
    })
})
module.exports = app