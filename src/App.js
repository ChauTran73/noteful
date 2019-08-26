import React, {Component} from 'react'
import './App.css'
import { Route, Switch } from "react-router-dom"
import Sidebar from './SideBar'
import Main from './Main'
import Header from './Header/Header'
import FoldersList from './FoldersList/FoldersList'
import NotesList from './NotesList/NotesList'
import NoteDetail from './Note/NoteDetail'
import APIContext from './APIContext';
import AddFolder from './AddFolder/AddFolder'
import AddNote from './AddNote/AddNote'
import FoldersListError from './ErrorHandlers/FoldersListError'
import NotesListError from './ErrorHandlers/NotesListError'

class App extends Component {
  constructor(props){
    super(props);
    this.state =
      {
        folders:[],
        notes :[],
        error: null,
        loading: true
      }
  }

  componentDidMount(){
    console.log('fetching')
    fetch('http://localhost:9090/db/', {
      method: 'GET',
      headers: {'content-type': 'application/json'}
    })
    .then(response => {
      
      console.log('succeed')
      if(!response.ok){throw new Error(response.status)}
      return response.json()})
    .then(responseJson => { 
      this.setState({
        folders: responseJson.folders,
        notes: responseJson.notes,
        loading: false
      })
      
    })
    .catch(error => this.setState({error, loading: false}))
  }
  
  //omit onSelectNote and onSelectFoldere to update selectedNote and selelectedFolder
  deleteFolder = (folderId) => {
    const newFolders = this.state.folders.filter(folder => folder.id !== folderId)
    const newNotes = this.state.notes.filter(note => note.folderId !== folderId)
    this.setState({folders: newFolders, notes: newNotes})
  }
  deleteNote = (noteId) =>{
    const newNotes = this.state.notes.filter(note => note.id !==noteId)
    this.setState({notes: newNotes})
  }
  addFolder = (folder) => {
    this.setState({
      folders: [...this.state.folders,folder]
    })
  }
  addNote = (note) => {
    this.setState({
      notes: [...this.state.notes, note]
    })
  }
 
  render(){
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      deleteFolder: this.deleteFolder,
      addFolder: this.addFolder,
      addNote: this.addNote
    }

    return (
      <>
      { this.state.loading ? <div>Loading...</div>:
       <div>
        <Header/>
        <APIContext.Provider value={contextValue}>
     
        <div className="container">
   
          <Sidebar>
            <FoldersListError>
             
            {['/','/folder/:folderId'].map((path,index) => 
              <div key={index}> 
                <Route exact path={path} 
                component={FoldersList}
                  />
              
              </div>
            )}
            
                <Route path='/add-folder' component={AddFolder}/>
              
                </FoldersListError>
          </Sidebar>
          <Main>
          
            <NotesListError>
           
            {['/','/folder/:folderId'].map((path,index) => 
                <div key={index}>
                  <Route exact path={path} component= {NotesList}/>
                     
                </div>
            )}
            
                  <Route  path='/note/:noteId'  component={NoteDetail} />
                  
                  <Route  path='/add-note' component={AddNote}/>
                  
            
           
          </NotesListError>
      
          </Main>
          
             </div>
        </APIContext.Provider>
          
       </div>
          
          }
        </>
     
    )
  }
  
}

export default App;
