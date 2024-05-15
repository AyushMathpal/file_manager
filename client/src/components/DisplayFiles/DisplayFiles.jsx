import React, { useEffect, useState } from "react";
import styles from "./DisplayFiles.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProfile } from "../Context/Context";
import Preview from "./Preview";
import axios from "axios";
import { fetchFilesandFolders } from "../../lib/fetchFilesAndFolders";
const DisplayFiles = ({ heading, files }) => {
  const {
    directory,
    setDirectory,
    setPath,
    path,
    profile,
    setFiles,
    setFolders,
  } = getProfile();
  const [openPreview, setOpenPreview] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const {id}=useParams()
  const open = (file) => {
    setDirectory(file?._id);
    setPath(file?.path);
    console.log(path, directory);
  };
  const deleteFolder = async () => {
    try {
      const res = await axios.post(
        "https://file-manager-backend-vert.vercel.app/api/delete-folder",
        { id: directory }
      );

      fetchFilesandFolders(profile, setFiles, setFolders);
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Preview
        openPreview={openPreview}
        setOpenPreview={setOpenPreview}
        selectedFile={selectedFile}
      />
      <div className={styles.displayitems}>
      {heading == "Folders" && directory ? (
            <button
              className="btn btn-outline-danger"
              onClick={deleteFolder}
              style={{ alignSelf: "flex-end",marginRight:"2rem" }}
            >
              Delete
            </button>
          ) : null}
        <h4 className="border-bottom text-center">{heading}</h4>
        
        <div className={styles.container}>
          
          {!files?.length ? (
            <div>Nothing to see Here</div>
          ) : (
            files
              .filter((file) =>
                heading === "Files"
                  ? file.folderId == (id==undefined?null:id)
                  : file.parentFolderId ==(id==undefined?null:id)
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
