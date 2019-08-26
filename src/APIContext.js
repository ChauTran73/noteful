import React from 'react';

const APIContext = React.createContext({
    folders: [],
    notes:[],
    deleteNote: () => {},
    deleteFolder: () => {},
    addFolder: () => {},
    addNote: () => {}
})

export default APIContext;