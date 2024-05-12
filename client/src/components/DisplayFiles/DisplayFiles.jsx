import React, { useEffect, useState } from "react";
import styles from "./DisplayFiles.module.css";
import { Link, useNavigate } from "react-router-dom";
import { getProfile } from "../Context/Context";
import Preview from "./Preview";
import axios from "axios";
import { fetchFilesandFolders } from "../../lib/fetchFilesAndFolders";
const DisplayFiles = ({ heading, files }) => {
  const { directory, setDirectory, setPath, path ,profile,setFiles,setFolders} = getProfile();
  const [openPreview, setOpenPreview] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate=useNavigate()
  const open = (file) => {
    setDirectory(file._id);
    setPath(file.path);
    console.log(path, directory);
  };
  const deleteFolder=async()=>{
    try {
      const res=await axios.post("http://localhost:3000/api/delete-folder",{id:directory})
     
      fetchFilesandFolders(profile,setFiles,setFolders)
      window.location.href="/dashboard"
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Preview
        openPreview={openPreview}
        setOpenPreview={setOpenPreview}
        selectedFile={selectedFile}
      />
      <div className={styles.file}>
        <h4 className="border-bottom text-center">{heading}</h4>
        <div className={styles.container}>
        {heading=="Folders" && directory?
          <button className="btn btn-outline-danger" onClick={deleteFolder} style={{alignSelf:"flex-end"}}>
          Delete
        </button>
          :null}
          {!files?.length ? (
            <div>Nothing to see Here</div>
          ) : (
            files
              .filter((file) =>
                heading === "Files"
                  ? file.folderId === directory
                  : file.parentFolderId === directory
              )
              .map((file, index) => {
                return (
                  <>
                    {heading === "Folders" ? (
                      <Link
                        key={index}
                        className={styles.folders}
                        onClick={() => open(file)}
                        to={`/dashboard/${file._id}`}
                      >
                        <div key={index} className={styles.single_file}>
                          <img
                            src="/images/folder_image.webp"
                            alt="file"
                            className={styles.files}
                          ></img>
                          {file.folderName.length > 10
                            ? `${file.folderName.slice(0, 10)}...`
                            : file.folderName}
                        </div>
                      </Link>
                    ) : (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedFile(file);
                          setOpenPreview(true);
                        }}
                      >
                        <div key={index} className={styles.single_file}>
                          <img
                            src="/images/file.png"
                            alt="file"
                            className={styles.files}
                          ></img>
                          {file.fileName.length > 10
                            ? `${file.fileName.slice(0, 10)}...`
                            : file.fileName}
                        </div>
                      </div>
                    )}
                  </>
                );
              })
          )}
        </div>
      </div>
    </>
  );
};

export default DisplayFiles;
