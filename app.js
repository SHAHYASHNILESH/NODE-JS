// console.log('Hello world');

//Working with modules
// const tutorial=require('./tutorial');
// console.log(tutorial);
// console.log(tutorial(1,5));
// console.log(tutorial.sum(1,5));
// console.log(tutorial.PI);
// console.log( new tutorial.MathObjects());

//Working with eventEmitter class and events module
// const EventEmitter=require('events');
// const eventEmitter=new EventEmitter();
// eventEmitter.on('tutorial',()=>{
//     console.log('Tutorial event has occured');

// });

// eventEmitter.emit('tutorial');

// eventEmitter.on('tutorial',(n1,n2)=>{
//     console.log(n1+n2);
// });

// eventEmitter.emit('tutorial',1,4);

// class Person extends EventEmitter{
//     constructor(name){
//         super();
//         this._name=name;
//     }

//     get name(){
//         return this._name;
//     }
// }

// let a=new Person('a');
// let b=new Person('b');
// b.on('name',()=>{
//     console.log('My name is:',b.name);

// });
// a.on('name',()=>{
//     console.log('My name is:',a.name);

// });

// a.emit('name');
// b.emit('name');

//Working with readline module
// const readline=require('readline');
// const rl=readline.createInterface({input:process.stdin,output:process.stdout});
// let n1=Math.floor((Math.random()*10)+1);
// let n2=Math.floor((Math.random()*10)+1);
// let ans=n1+n2;
// rl.question(`What is ${n1}+${n2}?\n`,(userInput)=>{
//     console.log(userInput);
//     if(userInput.trim()==ans){
//         rl.close();
//     }
//     else{
//         rl.setPrompt('Incorrect response,Please try again\n');
//         rl.prompt();
//         rl.on('line',(userInput)=>{
//             if(userInput.trim()==ans){
//                 rl.close();
//             }
//             else{
//                 rl.setPrompt('Your answer is incorrect,Please try again\n');
//                 rl.prompt();
//             }

//         });
//     }
// });

// rl.on('close',()=>{
//     console.log('Correct!!!');

// });

//Working with file system module
const fs=require('fs');
// fs.writeFile('example.txt',"This is an example",(err)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("File created successfully");
//         fs.readline('example.txt','utf8',(err,file)=>{
//             if(err){
//                 console.log(err);
//             }
//             else{
//                 console.log(file);
//             }

//         });
//     }

// });

// fs.rename('example.txt','example2.txt',(err)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log('Successfully renamed the file');
//     }

// });

// fs.appendFile('example2.txt','Some data being appended',(err)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log('Successfully appended data to file');
//     }
// })

// fs.unlink('example2.txt',(err)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log('Successfully deleted the file');
//     }
// });

// fs.mkdir('tutorial',(err)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log('Folder successfully created');
//         fs.rmdir('tutorial',(err)=>{
//             if(err){
//                 console.log(err);
//             }
//             else{
//                 console.log('File succesfully deleted');
//             }

//         });
//     }
// });

// fs.mkdir('tutorial',(err)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log('Folder created successfully');
//         fs.writeFile('./tutorial/example.txt','123',(err)=>{
//             if(err){
//                 console.log(err);
//             }
//             else{
//                 console.log("File successfully created");
//             }

//         });
//     }

// });

// fs.readdir('example',(err,files)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(files);
//         for(let file of files){
//             fs.unlink('./example/'+file,(err)=>{
//                 if(err){
//                     console.log(err);
//                 }
//                 else{
//                     console.log('File successfully deleted');
//                 }

//             });
//         }
//     }

// });


const readStream=fs.createReadStream('./example','utf8',(err)=>{
    if(err){
        console.log(err);
    }
    else{
        const writeStream=fs.createWriteStream('example2.txt');
        readStream.on('data',(chunk)=>{
            console.log(chunk);
            writeStream.write(chunk);
        });

    }
});

