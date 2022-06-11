// console.log('Hello world');
const tutorial=require('./tutorial');
console.log(tutorial);
// console.log(tutorial(1,5));
console.log(tutorial.sum(1,5));
console.log(tutorial.PI);
console.log( new tutorial.MathObjects());

const EventEmitter=require('events');
const eventEmitter=new EventEmitter();
eventEmitter.on('tutorial',()=>{
    console.log('Tutorial event has occured');

});

eventEmitter.emit('tutorial');

eventEmitter.on('tutorial',(n1,n2)=>{
    console.log(n1+n2);
});

eventEmitter.emit('tutorial',1,4);

class Person extends EventEmitter{
    constructor(name){
        super();
        this._name=name;
    }

    get name(){
        return this._name;
    }
}

let a=new Person('a');
let b=new Person('b');
b.on('name',()=>{
    console.log('My name is:',b.name);

});
a.on('name',()=>{
    console.log('My name is:',a.name);

});
a.emit('name');
b.emit('name');

const readline=require('readline');
const rl=readline.createInterface({input:process.stdin,output:process.stdout});
let n1=Math.floor((Math.random()*10)+1);
let n2=Math.floor((Math.random()*10)+1);
let ans=n1+n2;
rl.question(`What is ${n1}+${n2}?\n`,(userInput)=>{
    console.log(userInput);
    if(userInput.trim()==ans){
        rl.close();
    }
    else{
        rl.setPrompt('Incorrect response,Please try again\n');
        rl.prompt();
        rl.on('line',(userInput)=>{
            if(userInput.trim()==ans){
                rl.close();
            }
            else{
                rl.setPrompt('Your answer is incorrect,Please try again\n');
                rl.prompt();
            }

        });
    }
});

rl.on('close',()=>{
    console.log('Correct!!!');

});