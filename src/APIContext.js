import React from 'react';

const APIContext = React.createContext({
    folders: [],
    notes:[],
    deleteNote: () => {}
})

export default APIContext;