const mongoose=require('mongoose');
const emailValidator=require('email-validator');
const bcrypt=require('bcrypt');
const crypto=require('crypto');

const db_link='mongodb+srv://admin:RSZHek7KCmdYYSPn@cluster0.ptf4r.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(db_link)
.then(function(db){
    console.log('db connected successfully');
})
.catch(function(err){
    console.log(err);
})

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8  
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8,
        validate:function(){
            return this.confirmPassword==this.password;
        }
    },
    role:{
        type:String,
        enum:['admin','user','owner','deliveryboy'],
        default:'user'
    },
    profileImage:{
        type:String,
        default:'img/users/default.jpeg'
    },
    resetToken:String
});

//pre-post hooks
//before save event occurs in db
userSchema.pre('save',function(){
    //console.log('Before saving in db:',this);
    this.confirmPassword=undefined;
});

// userSchema.pre('save',async function(){
//     let salt=await bcrypt.genSalt();
//     let hashedString=await bcrypt.hash(this.password,salt);
//     //console.log(hashedString);
//     this.password=hashedString;
// })

//after save event occurs in db
userSchema.post('save',function(doc){
    console.log('After saving in db:',doc);
});

//remove


const userModel=mongoose.model('userModel',userSchema);

userSchema.methods.createResetToken=function(){
    const resetToken=crypto.randomBytes(32).toString('hex');
    this.resetToken=resetToken;
    return resetToken;
}

userSchema.methods.resetPasswordHandler=function(password,confirmPassword){
    this.password=password;
    this.confirmPassword=confirmPassword;
    this.resetToken=undefined;
}

module.exports=userModel;


// (async function createUser(){
//     let user={
//         name:'Nilesh',
//         email:'nileshshah0409@yahoo.co.in',
//         password:'87654321',
//         confirmPassword:'87654321'
//     };
//     let data=await userModel.create(user);
//     console.log(data);
// })();