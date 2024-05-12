import React from "react";
import styles from "./Subnav.module.css";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import CreateFolders from "../CreateFolders/CreateFolders";
import CreateFiles from "../CreateFiles/CreateFiles";
import { getProfile } from "../Context/Context";
import Logout from "../Logout";
const Subnav = ({ isModalOpen, setIsModalOpen, profile }) => {
  const {path,setPath,directory,folders}=getProfile()
  return (
    <div>
      <nav
        className={`d-flex justify-content-between navbar navbar-expand-lg mt-2 navbar-light bg-white py-2 px-5`}
      >
        <div>
        <Breadcrumb>
        {path.map((loc,index)=>{
          
          return <Breadcrumb.Item key={index} href={loc==='/'?'/dashboard':`/${loc}`} active={loc===directory}>{loc=="/"?"root":folders.find(folder=>folder._id==loc).folderName}</Breadcrumb.Item>
        })}
    </Breadcrumb>
        </div>
        <ul className="navbar-nav">
          <li style={{ alignSelf: "center", marginRight: "1rem" }}>
            {profile?.username}
          </li>
          <li className="nav-item mx-2">
            <CreateFiles />
          </li>
          <li className="nav-item mx-2">
            <CreateFolders
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </li>
          <li><Logout profile={profile}/></li>
        </ul>
      </nav>
    </div>
  );
};

export default Subnav;
