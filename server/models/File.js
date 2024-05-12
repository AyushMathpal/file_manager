import mongoose from "mongoose";
const Schema = mongoose.Schema;
const fileSchema = new Schema({
  storedName:{ type: String, required: true },
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  fileSize: { type: Number, required: true },
  folderId: { type: Schema.Types.ObjectId,default:null},
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('File', fileSchema);