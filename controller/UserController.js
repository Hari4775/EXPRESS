const asyncHandler = require('express-async-handler');
const userModel= require('../Models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//@desc  Register user 
//@route  POST  /api/user/register
// @access public

const Register=asyncHandler(async(req,res)=>{
    const{userName,email,password}=req.body;

    if(!userName || !email || !password){
        res.status(400)
        throw new Error("all fields are mandatory")
    }

    const userAvailable = await userModel.findOne({email});
    if(userAvailable){
    res.status(400)
    throw new Error(" email id already exist")
    }

    //HASH PASSWORD
     const hashedPassword = await bcrypt.hash(password,10);
     console.log('hashed password:',hashedPassword)

    const user= await userModel.create({
        userName,
        email,
        password:hashedPassword
    })

    console.log(` user created ${user}`)
    if(user){
        res.status(201).json({_id:user.id,email:user.email})
    }else{
        res.status(400);
        throw new Error("User data is not valid")
    }

    res.json({messge:"user created successfully"})
})
//_______________________________________________



//@desc  Login user 
//@route  POST  /api/user/login
// @access public

const Login=asyncHandler(async(req,res)=>{

    const {email,password} = req.body;
    if(!email || ! password){
       res.status(400);
       throw new Error("all fields are mandatory to fill")
    }

    const userAvailable= await userModel.findOne({email});
   

    // COMPARE PASSWORD WITH HASHED PASSWORD
    if(userAvailable && (await bcrypt.compare(password,userAvailable.password))){
        const accessToken = jwt.sign({
            userAvailable:{
                userName:userAvailable.userName,
                email:userAvailable.email,
                id:userAvailable.id,
            },
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"1m"}
        );
        res.status(200).json({accessToken});
    }
    else{
        res.status(401)
        throw new Error("password not valid")
    }


})
//_______________________________________________




//@desc current  user
//@route  POST  /api/user/current
// @access private
const current=asyncHandler(async(req,res)=>{

    res.json(req.user)
})
//_______________________________________________




module.exports= {Register,Login,current}