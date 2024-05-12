import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styles from "./DisplayFiles.module.css";
import axios from "axios";
import { fetchFilesandFolders } from "../../lib/fetchFilesAndFolders";
import { getProfile } from "../Context/Context";
const Preview = ({ openPreview, setOpenPreview, selectedFile, directory }) => {
  const { setFiles, setFolders, profile, files, folders } = getProfile();
  const [newName, setNewName] = useState(selectedFile?.fileName);
  const [moveTo, setMoveTo] = useState(null);
  const [isRenaming, setIsRenaming] = useState(false);
  const handleRename = async () => {
    if (
      files.find(
        (file) =>
          file.folderId === selectedFile.folderId && file.fileName === newName
      )
    ) {
      alert("Please Enter a unique name");
      setOpenPreview(false);
      return;
    }
    try {
      setIsRenaming(true);

      const payload = { id: selectedFile._id, name: newName, type: 0 };
      const response = await axios.put(
        "file-manager-backend-vert.vercel.appapi/rename",
        payload
      );
      console.log("Item renamed");
      setIsRenaming(false);
      fetchFilesandFolders(profile, setFolders, setFiles);
    } catch (error) {
      console.error(error);
      setIsRenaming(false);
    }
  };
  const moveFile = async () => {
    console.log(moveTo);
    try {
      if (moveTo != null) {
        console.log(moveTo);
        const res = await axios.post(
          `file-manager-backend-vert.vercel.appapi/move`,
          { currId: selectedFile._id, target: moveTo }
        );
        setOpenPreview(false);
        window.location.href = `/dashboard`;
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteFile = async () => {
    try {
      const payload = {
        id: selectedFile._id,
        filename: selectedFile.storedName,
      };
      const res = await axios.post(
        "file-manager-backend-vert.vercel.appapi/delete-file",
        payload
      );
      setOpenPreview(false);
      if (res.data.success) {
        fetchFilesandFolders(profile, setFolders, setFiles);
      }
      setOpenPreview(false);
    } catch (error) {
      console.log(error);
    }
  };
  const renderPreview = () => {
    if (!selectedFile) return null;
    switch (selectedFile.fileType) {
      case "image/jpeg":
        return (
          <img
            src={`file-manager-backend-vert.vercel.app${selectedFile?.storedName}`}
            alt={selectedFile?.storedName}
            width="100%"
            height="100%"
          />
        );
      case "application/pdf":
        return (
          <embed
            src={`file-manager-backend-vert.vercel.app${selectedFile?.storedName}`}
            type="application/pdf"
            width="100%"
            height="100%"
          />
        );
      // Add cases for other file types as needed
      default:
        return <p>Preview not available for this file type</p>;
    }
  };
  return (
    <>
      <Modal
        size="xl"
        show={openPreview}
        onHide={() => setOpenPreview(false)}
        contentClassName={styles.modal}
        dialogClassName={styles.modal}
      >
        <Modal.Header style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Form.Control
              type="text"
              placeholder="Enter folder name..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button
              onClick={handleRename}
              disabled={isRenaming}
              className="btn btn-outline-dark"
            >
              {isRenaming ? "Renaming..." : "Rename"}
            </button>
            <button className="btn btn-outline-danger" onClick={deleteFile}>
              Delete
            </button>
            <Form.Control
              as="select"
              value={newName}
              onChange={(e) => setMoveTo(e.target.value)}
            >
              <option disabled value="" selected>
                Select an option
              </option>
              <option value="root">root</option>
              {folders?.map((folder, index) => (
                <option key={index} value={folder._id}>
                  {folder.folderName}
                </option>
              ))}
            </Form.Control>
            <button className="btn btn-outline-info" onClick={moveFile}>
              Move
            </button>
          </div>
          <Modal.Body style={{ height: "100vh", width: "100%" }}>
            {renderPreview()}
          </Modal.Body>
        </Modal.Header>
      </Modal>
    </>
  );
};

export default Preview;
