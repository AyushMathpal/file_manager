import File from "../../models/File.js";
import Folder from "../../models/Folder.js";

export const fetchFiles=async (req, res) => {
    const profileId = req.params.profileId;
    console.log(profileId)
    try {
      const files = await File.find({userId:profileId});
      const folders = await Folder.find({userId:profileId});
      return res.status(200).json({ files, folders });
    } catch (error) {
      return res.status(404).json({ message: "Error fetching files", error });
    }
  }