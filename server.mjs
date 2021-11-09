import express from "express";

import morgan from  'morgan';// what ever we write console that will be disply on our time line
import cors from  'cors'; // for working in subdomain ,it will not block that subdomin

const app=express(); // creating a handle for our server ,we work on that handel
app.use(cors());
app.use(express.json());// if body in the jason it will pass into the  jason
app.use(morgan('short'));



const port=process.env.PORT || 3000; //CREATING AN ENVORMENTAL VARIABLE  SERVVER AND LOCAL SERVER ON 3000
let users=[];


app.use((req,res,next)=>{
    console.log(("request come",req.body));
    next();
})
// get all records
app.get("/users",(req,res)=>{
    res.send(users);
})
//get onl one record
app.get("/user/:id",(req,res)=>{
    if(users[req.params.id]){
        res.send(users[req.params.id] )
    }
    else{
        res.send("user not found")
    }
})

//add record 
app.post("/user",(req,res)=>{
    if(!req.body.student_name || !req.body.father_name  || !req.body.age  || !req.body.roll_no)
    {
        res.status(400).send("invalid code");
    }
    else
    {
        users.push({
            student_name:req.body.student_name,
            father_name:req.body.father_name,
            age:req.body.age,
            roll_no:req.body.roll_no
        })

    }
})
// add update
app.put("/user/:id",(req,res)=>{
    if(req.users[req.params.id]){
        if(req.body.student_name){
            users[req.params.id].student_name=req.body.student_name
         }
         if(req.body.father_name){
            users[req.params.id].father_name=req.body.father_name
         }
         if(req.body.age){
             users[req.params.id].age=req.body.age
            }
            if(req.body.roll_no){
               users[req.params.id].roll_no=req.body.roll_no
            }
         res.send(users[req.params.id])
    }
    else{
        res.send("user not found")
}
})

app.delete("/user/:id",(req,res)=>{
    if(users[req.params.id]){
        users[req.params.id]={};
        res.send("user deleted");

    }
    else{
        req.send("user not found");
    }
})

app.listen(port,()=>{
    console.log("server is running");
})














