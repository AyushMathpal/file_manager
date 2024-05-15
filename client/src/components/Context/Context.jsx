import React, { createContext, useContext, useEffect, useState } from "react";

const Drive = createContext();
const Context = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [folders, setFolders] = useState(null);
  const [files, setFiles] = useState(null);
  const [directory, setDirectory] = useState(null);
  const [path, setPath] = useState(["/"]);
  return (
    <Drive.Provider
      value={{
        profile: profile,
        setProfile,
        folders,
        files,
        setFiles,
        setFolders,
        directory,
        setDirectory,
        path,
        setPath,
        loading,
        setLoading,
      }}
    >
      {children}
    </Drive.Provider>
  );
};

export default Context;

export const getProfile = () => {
  return useContext(Drive);
};
