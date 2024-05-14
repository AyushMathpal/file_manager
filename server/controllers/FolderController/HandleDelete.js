import fs from 'fs';
import File from "../../models/File.js";
import Folder from '../../models/Folder.js';
import { deleteFromCloudinary } from '../../utils/cloudinary.js';
export const deleteFile = async (req, res) => {
  const { id, filename } = req.body;
  try {
    const deletedFile = await File.findByIdAndDelete(id);
    if (!deletedFile) {
      return res.status(404).json({ message: "File not found" });
    }
    await deleteFromCloudinary(deletedFile.publicId)
    return res.json({ success: true, message: "File Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ message: "Deletion Failed", error });
  }
};

export const deleteFolder = async (req, res) => {
  const { id } = req.body;
  try {
    const folder=await Folder.findByIdAndDelete(id)
    const files = await File.find({ folderId: id });
    for (const file of files) {
      await deleteFile({ body: { id: file._id, filename: file.storedName } }, { json: () => {} });
    }
    return res.json({ success: true, message: "Folder Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ message: "Deletion Failed", error });
  }
};