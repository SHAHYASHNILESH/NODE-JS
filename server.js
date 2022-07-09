//server creation

//Step 1:include http module
const http=require('http');
const fs=require('fs');
const server=http.createServer((req,res)=>{
    console.log("Request has been made from browser to server");
    //console.log(req);
    // console.log(req.method);
    // console.log(req.url);

    // res.setHeader('Content-type','text/plain');
    // res.write('Hello World');
    res.setHeader('Content-type','text/html');
    // res.write('<h1>Hello World</h1>');
    // res.write('<h2>Hello World</h2>');
    // res.end();
    let path='./views';
    switch(req.url){
        case '/':
            path+='/index.html'
            break;
        case '/about':
            path+='/about.html'
            break;
        default:
            path+='/404.html'
            break;
    };
    fs.readFile(path,(err,fileData)=>{

        if(err){
            console.log(err);
        }

        else{
            res.write(fileData);
            res.end();
        
        }
    });

});

//port number,host,callback
server.listen(3000,'localhost',()=>{
    console.log("Server is listening on port 3000");
});