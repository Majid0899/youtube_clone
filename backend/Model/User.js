import mongoose from "mongoose";
import bcrypt from 'bcrypt'


const userSchema = new mongoose.Schema(
    {
    username: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      trim:true,
      select: false, 
    },
    avatar: {
      type: String,
      default: "", // or a default avatar URL
    },
    channels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }]
},
{
    timestamps: true, 
  }
)
userSchema.pre("save", async function (next){
	const user = this;
	if(!user.isModified('password')) return next();
  
	try {
	  //generate salt
	  const salt = await bcrypt.genSalt(10);
	  //hash password
	  const hashedPassword = await bcrypt.hash(user.password, salt);
	  //set password
	  user.password = hashedPassword;
	  next();
	} catch (err) {
	  return next(err);
	}
  });
  
  userSchema.methods.comparePassword=async function (candidatePassword) {
	try {
	  const isMatch = await bcrypt.compare(candidatePassword, this.password);
	  return isMatch;
	} catch (err) {
	  throw err;
	}
  };
  
// Create a Model
const User=mongoose.model('User',userSchema)

export default User;
  


