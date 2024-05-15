import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { getProfile } from "../Context/Context";
import axios from "axios";
import { fetchFilesandFolders } from "../../lib/fetchFilesAndFolders";
import { useParams } from "react-router-dom";
const CreateFolders = ({ isModalOpen, setIsModalOpen }) => {
  const { folders, setFolders, directory, profile, setFiles,setLoading } = getProfile();
  const { id } = useParams();
  const [newFolder, setNewFolder] = useState({
    folderName: "",
    createdAt: new Date(),
    parentFolderId: id == undefined ? "" : id,
    userId: "",
  });
  const user = JSON.parse(localStorage.getItem("profile"));
  const handleFolderSubmit = async (e) => {
    e.preventDefault();
    if (
      folders.find(
        (folder) =>
          folder.parentFolderId === directory &&
          folder.folderName === newFolder.folderName
      )
    ) {
      alert("Please Enter a unique name");
      return;
    }
    setTimeout(() => {}, 1000);
    if (!newFolder.folderName) {
      alert("Please Enter Folder's Name");
      return;
    }

    setNewFolder({
      ...newFolder,
      createdAt: new Date(),
      userId: user._id,
      parentFolderId: id == undefined ? "" : id,
    });

    try {
      if (newFolder.userId) {
        setLoading(true)
        axios
          .post(
            "https://file-manager-backend-b1yk.onrender.com/api/create-folder",
            newFolder
          )
          .then(() => {
            alert("Folder Created");
            fetchFilesandFolders(profile, setFolders, setFiles);
            setIsModalOpen(false);
          })
          .catch(console.log("Error Creating Folder"));
        // if (res.status == "200") {
        //   alert("Folder Created");
        //   fetchFilesandFolders(profile, setFolders, setFiles);
        //   setIsModalOpen(false);
        // }
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      setIsModalOpen(false);
      alert("Error Creating Folder. Please Try Again");
      console.log("Error Creating Folder", error);
    }
  };

  return (
    <>
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header>
          <Modal.Title>Create Folder</Modal.Title>
          <Modal.Body>
            <Form onSubmit={handleFolderSubmit}>
              <Form.Group controlId="formBasicFolderName" className="my-2">
                <Form.Control
                  type="text"
                  placeholder="Enter folder name..."
                  value={newFolder.folderName}
                  onChange={(e) =>
                    setNewFolder({
                      ...newFolder,
                      folderName: e.target.value,
                      userId: profile?._id,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formBasicFolderSubmit" className="mt-5">
                <Button
                  type="submit"
                  className="form-control"
                  variant="primary"
                >
                  Add Folder
                </Button>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal.Header>
      </Modal>
      <button
        className="btn btn-outline-dark"
        onClick={() => setIsModalOpen(true)}
      >
        Create Folder
      </button>
    </>
  );
};

export default CreateFolders;
