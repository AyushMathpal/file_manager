import axios from "axios";
export const fetchFilesandFolders = async (profile, setFolders, setFiles) => {
  try {
    const user = JSON.parse(localStorage.getItem("profile"));
    if (user._id) {
      console.log(user._id);
      const res = await axios.get(
        `https://file-manager-backend-b1yk.onrender.com/api/fetch-files/${user._id}`
      );
      if (res.status == "200") {
        setFolders(res.data.folders);
        setFiles(res.data.files);
      }
      console.log(res.data);
    }
  } catch (error) {
    console.log(error, "File Fetching Failed");
  }
};
