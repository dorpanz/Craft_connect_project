const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    }, 
    email:{
        type:String,
        unique: true,
        required:true
    },
    streetAddress:{
        type:String,
        required:false
    },
    city:{
        type:String,
        required:false
    },
    postCode:{
        type:String,
        required:false
    },
    termsAccepted:{
        type:Boolean,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    giftsSubscribed: {
        type: Boolean,
        required: false, 
        default: false, 
      },
      created_at: {
        type: Date,
        default: Date.now,
      },
      updated_at: {
        type: Date,
        default: Date.now
      }

});

module.exports = mongoose.model('User', userSchema);