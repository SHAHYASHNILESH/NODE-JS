const express=require('express');
const app=express();

//middleware function->post, frontend->json
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

//mini app
const userRouter=express.Router();

//base route,router to use
app.use('/users',userRouter);

userRouter
.route('/')
.get(getUser)
.post(postUser)
.patch(patchUser)
.delete(deleteUser)

userRouter.route('/:id').get(getUserById)

function getUser(req,res){
    //console.log(req.query);
    res.send(users);
}

function postUser(req,res){
    console.log(req.body);
    users=req.body;
    res.json({
        message:"Data received successfully",
        user:req.body
    });
}

function patchUser(req,res){
    console.log(req.body);
    let data=req.body;
    for(key in req.body){
        //console.log(key);
        users[key]=data[key];
        //console.log(users);
    }
    res.json({
        message:"Data updated successfully"
    });
}

function deleteUser(req,res){
    users={};
    res.json({
        message:"Data has been successfully deleted"
    });
}

function getUserById(req,res){
    console.log(req.params.id);
    console.log(req.params);
    res.send("Data received successfully");
}