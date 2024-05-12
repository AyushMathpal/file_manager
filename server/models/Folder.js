import mongoose from "mongoose";
const Schema = mongoose.Schema;
const folderSchema = new Schema({
  folderName: { type: String, required: true },
  parentFolderId: { type: Schema.Types.ObjectId, default: null },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date,  },
  path:{type: [String], required:true}

});

export default mongoose.model("Folder", folderSchema);
