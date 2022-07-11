const express=require('express');
const app=express();

//middleware function->post, front->json
app.use(express.json());
app.listen(3000);

let users={}
app.get('/users',(req,res)=>{
    res.send(users);
})

app.post('/users',(req,res)=>{
    console.log(req.body);
    users=req.body;
    res.json({
        message:"Data received successfully",
        user:req.body
    })
})