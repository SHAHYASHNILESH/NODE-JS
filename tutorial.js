const sum=(n1,n2)=>n1+n2;
const PI=3.14;
class MathObjects{
    constructor(){
        console.log("Object is created");
    }
}
// module.exports.sum=sum; 
// module.exports.PI=PI;
// module.exports.MathObjects=MathObjects;

module.exports={sum:sum,PI:PI,MathObjects:MathObjects};