const express=require('express');
const app=express();

//middleware function->post, front->json
app.use(express.json());
app.listen(3000);

let users=[
    {
        'id':1,
        'Name':'Yash'
    },

    {
        'id':2,
        'Name':'Nilesh'
    },
    {
        'id':3,
        'Name':'Pinal'
    }

];

app.get('/users',(req,res)=>{
    console.log(req.query);
    res.send(users);
})

app.post('/users',(req,res)=>{
    console.log(req.body);
    users=req.body;
    res.json({
        message:"Data received successfully",
        user:req.body
    });
});

app.patch('/users',(req,res)=>{
    console.log(req.body);
    let data=req.body;
    for(key in req.body){
        //console.log(key);
        users[key]=data[key];
        //console.log(users);
    }
    res.json({
        message:"Data updated successfully"
    })
});

app.delete('/users',(req,res)=>{
    users={};
    res.json({
        message:"Data has been successfully deleted"
    });
});


app.get('/users/:username',(req,res)=>{
    console.log(req.params.username);
    console.log(req.params);
    res.send("Data received successfully");
})