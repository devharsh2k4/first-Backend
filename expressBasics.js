import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieparser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const app = express();
// const users = [];

mongoose.connect("mongodb://127.0.0.1:27017/",{
    dbname: "Backend",
}).then(() => console.log("Database Connected"))
.catch((e)=> console.log(e));


const userSchema = new mongoose.Schema({
    name: String ,
    email:String,
    password:String,
});

const User = mongoose.model("User",userSchema);

// express.static(path.join(path.resolve(),"views"));
app.use(express.static(path.join(path.resolve(),"public")));

app.use(express.urlencoded({extended:true}));

app.set("view engine", "ejs");

app.use(cookieparser());

const isAuthenticated = async (req,res,next)=>{
    const {token} = req.cookies;
    
    if(token){

        const decoded = jwt.verify(token,"sjdhfjhfihf");

        req.user= await User.findById(decoded._id);
        next();

    }
    else{
        res.redirect("/login");
    }
}

app.get("/",isAuthenticated,(req,res)=>{
    res.render("logout", {name:req.user.name});
});

app.get("/register",(req,res)=>{
    res.render("register");
});

app.get("/logout", (req,res)=>{
    res.cookie("token",null,{
        httpOnly:true,
        expires: new Date(Date.now()),
    }
    );
    res.redirect("/");
});

app.get("/login", (req,res)=>{
   res.render("login");
});

app.post("/login", async (req,res)=>{
    const {email,password}= req.body;
    
    let user = await User.findOne({email});

    if(!user){
        return res.redirect("/register");
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.render("login", {email,message:"Incorrect Password"});
    }

    const token = jwt.sign({_id: user._id}, "sjdhfjhfihf"); 

    res.cookie("token", token,{
        httpOnly:true,
        expires: new Date(Date.now()+60*1000),
    }
    );
    res.redirect("/");
});

app.post("/register", async (req,res)=>{

   const {name,email,password} = req.body;

    let user = await User.findOne({email});
     
    if(user){
        return res.redirect("/login");
    }
     
    const hashedPassword = await bcrypt.hash(password,10);

    user = await User.create({
        name,
        email,
        password:hashedPassword,
    });
    const token = jwt.sign({_id: user._id}, "sjdhfjhfihf"); 

    res.cookie("token", token,{
        httpOnly:true,
        expires: new Date(Date.now()+60*1000),
    }
    );
    res.redirect("/");
});










app.listen(5000,()=>{
    console.log("server is working");
});











// app.get("/success", (req,res)=>{
    //     res.render("success");
    // });
    
    // app.get("/users",(req,res)=>{
    //     res.json({
    //         users,
    //     });
    // });
    
    // app.get("/add", async (req,res)=>{
    //    await User.create({name:"Harsh2", email:"harsh2@gmail.com"}); 
    //         res.send("Nice");
    
         
    // });



    // app.post("/contact", async (req,res)=>{
    //     //    const messageData =  {username: req.body.name,
    //     //     email: req.body.email};
        
    //          const {name,email} = req.body;
    //         await Message.create({name, email});
    //         // res.render("success");
    //         res.redirect("/success");
    //     });


    // app.get("/",isAuthenticated,(req,res)=>{
    //     // res.send("Hi");
    //     // res.sendStatus(404);
    //     // res.sendStatus(500);
    //     // res.json({
    //     //     sucess:true,
    //     //     products:[],
    //     // });
    
    //     // res.status(400).send("meri marzi")
    //     // const file = fs.readFileSync("./index.html");
        
       
    //     // console.log(path.resolve());
    
    //     // const pathlocation = path.resolve();
    //     // res.sendFile(path.join(pathlocation,"./index.html"));    
    //     // res.sendFile("./index.html");
        
    //     // res.sendFile("index");
    
    //     res.render("logout");
    // });