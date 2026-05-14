const express=require("express")
const app=express()

const notes=[]
app.use(express.json())
/* 
note eg:
{
title:"note1",
des:"this is note 1"
}
*/
//POST /notes //sending data to server 
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



module.exports=app