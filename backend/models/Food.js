import mongoose, { model } from 'mongoose';

const Users = mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    email:{
        type:String,
        require : true,
    }
});

const UserNames = mongoose.model("userData" , Users);
model.exports = UserNames