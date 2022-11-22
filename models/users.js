const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/Grocerily")

const userSchema = mongoose.Schema({
  username:{type:String , require:true , unique:true},
  email:{type:String , require:true , unique:true},
  phoneNo:{type:Number , require:true , unique:true},
  password:{type:String ,require:true},
  Cart:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"cart"
    }
  ],
  order:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"order"
    }
  ],
  whishlist:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"wishlist"
    }
  ],
  role:{type:String , enum:['user','admin']  , default:'user'}

})

module.exports = mongoose.model('user' , userSchema)