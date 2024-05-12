import File from "../../models/File.js";
import Folder from "../../models/Folder.js";


export const createFolder=async (req, res) => {
    const { folderName, userId, createdAt, parentFolderId } = req.body;
    try {
      const parent = parentFolderId? await Folder.findOne({ _id: parentFolderId }, { path: 1, _id: 0 })
      : null;
      console.log(folderName,userId,parentFolderId)
      console.log(parent)
      const newFolder = await Folder.create({
        folderName: folderName, 
        userId: userId,
        parentFolderId: parentFolderId ||null,
        path:parent?[...parent.path]:['/']
      });
      newFolder.path.push(newFolder._id);
      await newFolder.save();
      return res.status(200).json({ message: "Folder Successfully Created" });
    } catch (error) {
      console.log(error)
      return res.status(404).json({error});
    }
  }

export const createFile=async(req, res) => {
    try {
      const { userId,folderId } = req.body;
      
      const file = req.file;
      console.log(userId,folderId,file)
      let item;
      if(folderId.length<8){
        item =await File.create({
          storedName: file.filename,
          fileName: file.originalname,
          fileSize: file.size,
          fileType: file.mimetype,
          userId,
          createdAt: new Date(),
        });
      }
      else{
        item= await File.create({
          storedName: file.filename,
          fileName: file.originalname,
          fileSize: file.size,
          fileType: file.mimetype,
          userId,
          folderId:folderId,
          createdAt: new Date(),
        });
      }
      console.log(item)
      return res.status(201).json({ message: "File Uploaded Successfully"});
    } catch (error) {
      return res.status(400).json({ error, message: "File Upload failed" });
    }
  }