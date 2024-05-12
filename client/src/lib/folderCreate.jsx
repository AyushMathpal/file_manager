export function folderCreate(){

}

const handleFolderNameSubmit = (e) => {
    e.preventDefault();
    if (newFolderName.trim()) {
      const folderExists = folder.some((item) =>item.name === newFolderName);
      if (!folderExists) {
        const newFolder = {
          id: Date.now(),
          name: newFolderName.trim(),
          type: 'folder',
          children: []
        };
        setData([...data, newFolder]);
        setIsCreatingFolder(false);
        setNewFolderName('');
      } else {
        alert('Folder name already exists. Please choose a different name.');
      }
    }
  };