import mongoose from 'mongoose';



const videoSchema = new mongoose.Schema({
  title: { type: String, required: true},
  description: { type: String,required:true},
  thumbnailUrl: { type: String,requried:true },
  videoUrl: { type: String,required:true },
  duration:{type:String,required:true,trim:true},
  channel: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String,required:true },
  views: { type: Number, default: 0 },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],     
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  
  uploadDate: { type: Date, default: Date.now },
  comments: [{type: mongoose.Schema.Types.ObjectId,ref:'Comment'}]
}, { timestamps: true });


//Create a Model
const Video=mongoose.model('Video',videoSchema);

export default Video
