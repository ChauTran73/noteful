import React, {Component} from 'react'
import './App.css'
import { Route } from "react-router-dom"
import Sidebar from './SideBar'
import Main from './Main'
import Header from './Header/Header'
import FoldersList from './FoldersList/FoldersList'
import NotesList from './NotesList/NotesList'
import NoteDetail from './Note/NoteDetail'
import APIContext from './APIContext';

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
  
  deleteNote = (noteId) =>{
    const newNotes = this.state.notes.filter(note => note.id !==noteId)
    this.setState({notes: newNotes})
  }
  
 
  render(){
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote
    }

    return (
      <>
      { this.state.loading ? <div>Loading...</div>:
       <div>
        <Header/>
        <APIContext.Provider value={contextValue}>
       
        <div className="container">
          <Sidebar>
            {['/','/folder/:folderId'].map((path,index) => 
              <div key={index}> 
                <Route exact path={path} 
                component={FoldersList}
                  />
              
              </div>
            )}
            
          </Sidebar>
          <Main>
            {['/','/folder/:folderId'].map((path,index) => 
                <div key={index}>
                  <Route exact path={path} component= {NotesList}/>
                     
                </div>
            )}
              <Route  path='/note/:noteId'  component={NoteDetail} />

          
        
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
