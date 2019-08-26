import React, {Component} from 'react'
import APIContext from '../APIContext'
import moment from 'moment'
import './AddNote.css'

class AddNote extends Component{
    static contextType = APIContext
   
    constructor(props){
        super(props);
        this.state={
            noteName: '',
            modified: moment(),
            folderId: this.props.match.params,
            content: '',
            error: null,
        }
    }
    handleChangeName = name => {
        this.setState({
            noteName: name,
            
        })
    }
    handleChangeContent = desc => {
        this.setState({
            content: desc,
            
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
            name: this.state.noteName,
            modified: this.state.modified,
            folderId: this.state.folderId,
            content: this.state.content
            
        }
        fetch('http://localhost:9090/notes',{
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
    render(){
        const {error}= this.state;
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
                    <div className='AddNote__buttons'>
                    <button className='save' type='submit'>Save</button>
                    <button  className='cancelNote' onClick={this.handleClickCancel}>Cancel</button>
                    </div>
                    
                </form>
                
            </div>
        )
    }
}
export default AddNote;