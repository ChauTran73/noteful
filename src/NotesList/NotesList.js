import React, {Component} from 'react'
import {NavLink, Link} from 'react-router-dom'
import Note from '../Note/Note'
import './NotesList.css'
import APIContext from '../APIContext'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrashAlt,
  
 } from '@fortawesome/free-solid-svg-icons';

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
        match: {
            params: {}
        },
      
      };
     
   static contextType = APIContext;

 
    render(){
        const { folderId } = this.props.match.params;
        const { notes, deleteNote} = this.context;
        let notesForFolder =[];
   
        //filter out the notes that belong to a specific folder here
      if(!folderId){
        notesForFolder = notes
      } 
      else {
          notesForFolder= notes.filter(note => note.folderId === folderId) 
         }
    
       const list = notesForFolder.map(note=>
        
       <li  key={note.id} className="Note" >
            <NavLink to={`/note/${note.id}`}>
                <Note key={note.id} 
                    name={note.name} 
                    modified={note.modified}
                    />
            </NavLink>
          <button className='delete__button' 
                    type='button'
                    onClick ={() => {
                        deleteNoteRequest(note.id, deleteNote)}}>
                   <FontAwesomeIcon icon={faTrashAlt} />
           
            </button>
        
         </li>)
        return(
            <div>
               
                <ul className="NotesList">
                   {list}
                </ul>
                <div className='AddNote__button'>
                <Link to='/add-note'>
                    <button type='button' >
                        Add a note
                    </button>
                </Link>
                </div>
                
            </div>
        )
    }
}
export default NotesList;
NotesList.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
          folderId: PropTypes.string.isRequired
        })
    })
}