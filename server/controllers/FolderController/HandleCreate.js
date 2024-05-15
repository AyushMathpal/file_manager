import File from "../../models/File.js";
import Folder from "../../models/Folder.js";
import { getURI } from "../../utils/bufferParser.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

export const createFolder = async (req, res) => {
  const { folderName, userId, parentFolderId } = req.body;
  try {
    let parent = "";
    if (parentFolderId != "") {
      parent = await Folder.findOne(
        { _id: parentFolderId },
        { path: 1, _id: 0 }
      );
    }
    const newFolder = await Folder.create({
      folderName: folderName,
      userId: userId,
      parentFolderId: parentFolderId || null,
      path: parent!="" ?[...parent.path] : ["/"],
    });
    newFolder.path.push(newFolder._id);
    await newFolder.save();
    return res.status(200).json({ message: "Folder Successfully Created" });
  } catch (error) {
    console.log(error);
    console.log(error)
    return res.status(404).json({ error });
  }
};

export const createFile = async (req, res) => {
  const file = req.file;
  try {
    const { userId, folderId } = req.body;
    const uri = getURI(file).content;

    const upload = await uploadOnCloudinary(uri);
    if (!upload) {
      return res
        .status(400)
        .json({ sucess: false, message: "Upload Failed to Cloudinary" });
    }
    const publicId = upload.public_id;
    let item;
    if (folderId == null || folderId.length < 8) {
      item = await File.create({
        storedName: upload.url,
        publicId: publicId,
        fileName: file.originalname,
        fileSize: file.size,
        fileType: file.mimetype,
        userId,
        createdAt: new Date(),
      });
    } else {
      item = await File.create({
        storedName: file.filename,
        publicId: publicId,
        fileName: file.originalname,
        fileSize: file.size,
        fileType: file.mimetype,
        userId,
        folderId: folderId,
        createdAt: new Date(),
      });
    }
    return res
      .status(201)
      .json({ item, message: "File Uploaded Successfully" });
  } catch (error) {
    return res.status(400).json({ error, message: "File Upload failed" });
  }
};
