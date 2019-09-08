import React, {Component} from 'react'
import APIContext from '../APIContext'
import moment from 'moment'
import './AddNote.css'
import ValidationError from '../ValidationError'
import { BASE_URL } from '../App';

class AddNote extends Component{
    static contextType = APIContext
   
    constructor(props){
        super(props);
        this.state={
            noteName: {
                value: '',
                touched: false
            },
            modified: moment(),
            folderId: this.props.match.params,
            content: {
                value: '', 
                touched: false
            },
            error: null,
        }
    }
    handleChangeName = name => {
        this.setState({
            noteName: {
                value: name, 
                touched: true
            }
            
        })
    }
    handleChangeContent = desc => {
        this.setState({
            content: {
                value: desc,
                touched: true
        }
    })
    }
    //i want the folderid to be prepopulated when click Add Note within a folder
    handleSelectFolder = folder =>{
        this.setState({
            folderId: folder,
            
        })
    }
    handleSubmitNote=e=>{
        e.preventDefault();
        const {addNote} = this.context;
        const note = {
            name: this.state.noteName.value,
            modified: this.state.modified,
            folderId: this.state.folderId,
            content: this.state.content.value
            
        }
        fetch(`${BASE_URL}notes`,{
            method: 'POST',
            body: JSON.stringify(note),
            headers: {'content-type': 'application/json'}
        })
        .then(response => {
            if(!response.ok){throw new Error(response.status)}
            return response.json()
        })
        .then(responseJson => {
            console.log(responseJson)
            addNote(responseJson);
            this.props.history.push('/')
           
            }
        )
        .catch(error => this.setState({error: error}))
        
    }
    handleClickCancel=()=>{
        this.props.history.push('/')
    }
    handleNoteNameError=()=>{
        const {noteName} = this.state;
        if(noteName.value.length < 3 || noteName.value.length > 50){
            return 'Note name must be of length between 3 and 50 characters'
        }
        
    }
    handleContentError=()=>{
        const {content} = this.state;
        if(content.value.length < 100){
            return 'Enter at least 100 characters for content'
        }
    }
    render(){
        const {error}= this.state;
        const nameError = this.handleNoteNameError();
        const contentError = this.handleContentError();
        return(
            <div className='AddNote'>
                <h2>Create a new note</h2>
                <div className='AddNote__error' role='alert'>
                        {error && <p>{error.message}</p>}
                </div>
                
                <form className='AddNote__form' onSubmit={this.handleSubmitNote}>
                    <label htmlFor='addNoteName'>Name</label>
                    <input type='text'
                            id='addNoteName'
                            name='addNoteName'
                            placeholder='Enter note name'
                            onChange={e => this.handleChangeName(e.target.value)}
                            required
                    />
                    {this.state.noteName.touched && <ValidationError message={nameError}/>}
                    <label htmlFor='selectFoldder'>Select a folder</label>
                   
                        <select onChange={e => this.handleSelectFolder(e.target.value)} required>
                        <option defaultValue={this.context.folders[0].id}></option>
                            {this.context.folders.map(folder => 
                                <option value={folder.id} key={folder.id} defaultValue={folder.id}>
                                {folder.name}</option>)
                            }
                            
                           
                        </select>
                        
                    <label htmlFor='description'>Content</label>
                    <textarea 
                            name='description'
                            id='description'
                            placeholder='Enter some cool content for your note...'
                            aria-autocomplete="list"
                            onChange={e => this.handleChangeContent(e.target.value) } 
                            required
                    />
                    {this.state.content.touched && <ValidationError message={contentError}/>}
                    <div className='AddNote__buttons'>
                    <button className='save' 
                            type='submit' 
                            disabled={this.handleNoteNameError()|| this.handleContentError()}>Save</button>
                    <button  className='cancelNote' onClick={this.handleClickCancel}>Cancel</button>
                    </div>
                     
                </form>
                
            </div>
        )
    }
}
export default AddNote;