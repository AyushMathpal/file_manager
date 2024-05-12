import React, { useEffect, useState } from 'react'
import { getProfile } from '../../../components/Context/Context'
import Subnav from '../../../components/SubNav/Subnav'
import DisplayFiles from '../../../components/DisplayFiles/DisplayFiles'
import { fetchFilesandFolders } from '../../../lib/fetchFilesAndFolders'


const Dashboard = () => {
  const [isModalOpen,setIsModalOpen]=useState(false)
  const {profile,folders,files,setFolders,setFiles,setProfile}=getProfile()

  useEffect(() => {

    
    const user=JSON.parse(localStorage.getItem('profile'))
    
    if(!profile){
       setProfile(user)
    }
    fetchFilesandFolders(profile,setFolders,setFiles)
    
    
  }, [profile])
  
  return (
    <div>
      <Subnav isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      profile={profile}
        />
        
      <DisplayFiles files={folders} heading="Folders"/>
      <DisplayFiles files={files} heading="Files"/>
      
    </div>
  )
}

export default Dashboard
