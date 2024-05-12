import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
      },
      password: {
        type: String,
        required: true,
        minlength: 8
      },
      token:{
        type:String,
        default:null
      }
})
export default mongoose.model('User', userSchema);