import React, { useState } from "react";
import axios from "axios";
import { fetchFilesandFolders } from "../../lib/fetchFilesAndFolders";
import { getProfile } from "../Context/Context";
const CreateFiles = () => {
  const { profile, directory, setFiles, setFolders ,setLoading} = getProfile();
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && profile._id) {
      const form = new FormData();
      form.append("userId", profile._id);
      form.append("folderId", directory);
      form.append("file", selectedFile);
      try {
        setLoading(true)
        const res = await axios.post(
          "https://file-manager-backend-b1yk.onrender.com/api/create-file",
          form
        );
        if (res.status == "201") {
          console.log("File created", res.data);
        }
        fetchFilesandFolders(profile, setFolders, setFiles);
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error);
      }
    }
  };
  return (
    <>
      <input type="file" id="upload" hidden onChange={handleFileChange} />
      <label htmlFor="upload" className="btn btn-outline-dark">
        Create File
      </label>
    </>
  );
};

export default CreateFiles;
