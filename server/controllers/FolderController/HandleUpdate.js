import File from "../../models/File.js";
import Folder from "../../models/Folder.js";

const renameFileOrFolder = async (itemId, newName, type) => {
  try {
    if (type == 0) {
      const updatedFile = await File.findByIdAndUpdate(
        itemId,
        { fileName: newName },
        { new: true }
      );
      return updatedFile;
    } else {
      const updatedFolder = await Folder.findByIdAndUpdate(
        itemId,
        { folderName: newName },
        { new: true }
      );
      return updatedFolder;
    }
  } catch (error) {
    console.error("Error renaming item:", error);
    throw error;
  }
};
export const rename = async (req, res) => {
  const { id, name, type } = req.body;
  if (!id || !name) {
    return res.status(400).json({ error: "Invalid request" });
  }
  try {
    const renamedItem = await renameFileOrFolder(id, name, type);
    res.status(200).json({ data: renamedItem });
  } catch (error) {
    console.error("Error renaming item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const move = async (req, res) => {
  const { currId, target } = req.body;
 try {
    if (target == "root") {
        const moveFolder = await File.findByIdAndUpdate(
          currId,
          {
            folderId: null,
          },
          { new: true }
        );
      }
      const moveFolder = await File.findByIdAndUpdate(
        currId,
        { folderId: target },
        { new: true }
      );
      return res.status(201).json({success:true})
 } catch (error) {
    return res.status(400).json({error})
 }
};
