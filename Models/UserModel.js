const mongoose = require('mongoose')

const userSchema =mongoose.Schema({
    userName:{
        type:String,
        required:[true,"please add the user name"],
    },
    email:{
        type:String,
        required:[true,"please add the email"],
        unique:[true,"email address already taken "]
    },
    password:{
        type:String,
        required:[true,"please enter the passweord"]
    },
},
{
    timestamps:true,
}
);

module.exports=mongoose.model("user",userSchema);