const express=require("express")
const app=express()

const notes=[]
app.use(express.json())
/* 
note format:
    {
    "title":"note1",
    "des":"this is note 1"
    }
*/
//POST /notes // sending data to server 
app.post("/notes",(req,res)=>{
    notes.push(req.body)
    res.status(201).json({
        message:"Note created successfully"
    })
})

//GET /notes // fatching data from server
app.get("/notes",(req,res)=>{
    res.status(200).json({
        message:"Note fatched succesfully",
        notes: notes
    })
})

//DELETE /notes/1 //deleting of any data from server 
app.delete("/notes/:index",(req,res)=>{
    const index=req.params.index /*if we call /notes/1 then index will be 1 , as we are using dynamic parameter "/:index"*/
    delete notes[index]
    res.status(200).json({
        message:"Note deleted succesfully",
        notes: notes
    })
})

//PATCH /notes/1 //Updating data in server
app.patch("/notes/:index",(req,res)=>{
    const index=req.params.index
    const des=req.body.des

    notes[index].des=des

    res.status(200).json({
        message:"Note updated succesfully"
    })
})

module.exports=app