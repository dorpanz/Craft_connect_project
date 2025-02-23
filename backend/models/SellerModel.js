const mongoose = require('mongoose');
const sellerSchema = new mongoose.Schema({
    fullName:{
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
        required:true
    },
    city:{
        type:String,
        required:true
    },
    postCode:{
        type:String,
        required:true
    },
    isInCanada:{
        type:Boolean,
        required:true
    },
    shopName:{
        type:String,
        unique: true,
        required:true
    },
    termsAccepted:{
        type:Boolean,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    newsletterSubscribed: {
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

module.exports = mongoose.model('Seller', sellerSchema);