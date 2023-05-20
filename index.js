// import http from "http";
// // import myName from "./features.js";
// // import{myName2,myName3} from "./features.js";
// // import * as myObj from "./features.js";
// import { generateRandom } from "./features.js";
// import fs from "fs";
// import path from "path";

// // console.log(path.extname("./index.js"));

// const home = fs.readFileSync("./index.html");
// // console.log(home);
// console.log(generateRandom());
// // console.log(myObj);
// // console.log(myName2);
// // console.log(myName3);
// // 
// const server = http.createServer((req,res)=>{ 

//     console.log(req.method);

//    if(req.url==="/about"){
//     res.end(`<h1>you are ${generateRandom()} Strong</h1>`);
//    }
//    else  if(req.url==="/"){
// //    fs.readFile("./index.html",(err,home)=>{
// //         res.end(home);
// //     });
//            res.end("home");
//    }
//    else if(req.url==="/contact"){
//     res.end("<h1>Contact Page</h1>");
//    }
//    else{
//         res.end("<h1>Page not found</h1>");    
//    }
// });

// server.listen(5000,()=>{
//     console.log("Server is Working");
// });

