import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import Note from '../Note/Note'
import './NotesList.css'
import APIContext from '../APIContext';

export function deleteNoteRequest(noteId, callback){
    fetch(`http://localhost:9090/notes/${noteId}`,{
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        // call the callback when the request is successful
        // this is where the App component can remove it from state
        callback(noteId)
      })
      .catch(error => {
        console.error(error)
      })
  
}

class NotesList extends Component{
    static defaultProps = {
        notes: [],
        match: {
            params: {}
        },
        deleteNote: () =>{}
      };
   static contextType = APIContext;

    render(){
        const { folderId } = this.props.match.params;
        const { notes, deleteNote} = this.context;
        let notesForFolder =[];
   
        //filter out the notes that belong to a specific folder here
      {folderId === undefined ? notesForFolder = notes: notesForFolder = notes.filter(note => note.folderId === folderId)  }
    
       const list = notesForFolder.map((note,index)=>
       <li  key={note.id} >
        <NavLink to={`/note/${note.id}`}>
            <Note key={note.id} 
                    name={note.name} 
                    index={index}
                    modified={note.modified}
                    content ={note.content}/>
                    
          </NavLink>
          <button className='delete__button' onClick ={() => {
                        deleteNoteRequest(note.id, deleteNote)}}>
                    Delete
                </button>
                
                 
        </li>)
        return(
            <div className="NotesList">
               
                <ul>
                   {list}
                </ul>
                
                <div className="AddNoteButton">
                    <button className="add__note">Add a note</button>
                </div>
            </div>
        )
    }
}
export default NotesList;