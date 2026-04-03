//Module/Package for file handling in node
const fs = require("fs");

//Write to a file
//Synchronous Call
// fs.writeFileSync('./text.txt', 'Hey There');   

//Asynchronous 
// fs.writeFile('./text.txt', 'Hey There Async', (err) => {});

//Reading from a file
// const res = fs.readFileSync("./contacts.txt", "utf-8");
// console.log(res);

fs.readFile("./contacts.txt", "utf-8", (err, result) => {
    if(err)    
        console.log("Error !");
    else
        console.log(result);
})

fs.appendFileSync("./text.txt", new Date().getDate().toLocaleString());
fs.appendFileSync("./text.txt", `\n${Date.now()}`);

//To copy a file
fs.cpSync('./text.txt', './copy.txt');

//To delete a file
fs.unlinkSync('./copy.txt');

console.log(fs.statSync('./text.txt'));

// fs.mkdirSync('my-docs')
fs.mkdirSync('my-docs/a/b/', {recursive : true});

const os = require("os");
console.log(os.cpus().length)