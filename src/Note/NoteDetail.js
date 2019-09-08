import React, {Component} from 'react'
import moment from 'moment'
import APIContext from '../APIContext'
import {NavLink} from 'react-router-dom'
import './Note.css'
import {deleteNoteRequest} from '../NotesList/NotesList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashAlt,
  faFolder,
  faArrowLeft
 } from '@fortawesome/free-solid-svg-icons';

class NoteDetail extends Component{
    static defaultProps={
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
        
        const modifiedDate =  moment(selectedNote.modified).format('MM/DD/YYYY hh:mm a');
        //get the folder name that the note belongs to
        const folderForNote = folders.find(folder => folder.id === selectedNote.folderId) ;
       
        return(
            <>
            <div className= "Note">
                <NavLink to= {`/note/${noteId}`} >
                    <h1><FontAwesomeIcon icon={faFolder} />{' '}
                        {folderForNote.name}
                     </h1>

                    
                        <h2>{selectedNote.name}</h2> 
                        
                        <p>Date modified on {modifiedDate}</p>
                        </NavLink>   
                        <div className='NoteDetail_Buttons'>
                            <button className="delete__button" onClick ={() => {
                                deleteNoteRequest(selectedNote.id, deleteNote)
                                this.props.history.push('/')}}>
                             <FontAwesomeIcon icon={faTrashAlt} />
                            </button>   
                            <button onClick={()=> {this.props.history.goBack()}} 
                                className="goBack__button">
                                <FontAwesomeIcon icon={faArrowLeft}/>
                            </button>
                        </div>
                        
                    </div>
                    
                    <section className="note__content">
                        <p>{selectedNote.content}</p>    
                    </section> 
                    
                
                   
            </>
        )
    }
}
export default NoteDetail;
