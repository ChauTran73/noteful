import React, {Component} from 'react'
import moment from 'moment'
import APIContext from '../APIContext'
import {NavLink} from 'react-router-dom'
import './Note.css'
import {deleteNoteRequest} from '../NotesList/NotesList'

class NoteDetail extends Component{
    static defaultProps={
        folders: [],
        notes: [],
        match: {
            params: {}
        }
    }
    
    static contextType = APIContext
    render(){
        const { folders=[], notes=[], deleteNote } = this.context;    
        const {noteId} = this.props.match.params;

        
        //filter out the notes that match the folder via folderid
        const selectedNote = notes.find(note => note.id === noteId) //return a single obj
        
        const modifiedDate =  moment(selectedNote.modified).format('MM/DD/YYYY ha z');
        const folderForNote = folders.find(folder => folder.id === selectedNote.folderId) ;
       
        return(
            <>
            <div className= "Note">
                <NavLink to= {`/note/${noteId}`} >
                    <h1>Folder: {folderForNote.name}</h1>

                    
                        <h1>{selectedNote.name}</h1>
                        
                        <p>Date modified on {modifiedDate}</p>
                        </NavLink>   
                        <button className="delete__button" onClick ={() => {
                        deleteNoteRequest(selectedNote.id, deleteNote)
                        this.props.history.push('/')}}>Delete</button>   
                    </div>
                    <section className="note__content">
                        <p>{selectedNote.content}</p>    
                    </section> 
                   
                
                    <button onClick={()=> {this.props.history.goBack()}} className="goBack__button">Go Back</button>
            </>
        )
    }
}
export default NoteDetail;

