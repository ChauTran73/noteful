import React, {Component} from 'react'
import APIContext from '../APIContext'
import './AddFolder.css'
import { BASE_URL } from '../App';


class AddFolder extends Component{
    static contextType = APIContext;
    constructor(props){
        super(props);
        this.state ={
            folderName: '',
            error: null
        }
    }
   
    handleChangeFolder(folder){
        this.setState({folderName: folder})
    }
    handleSubmitFolder = e =>{
        e.preventDefault()
        const {folderName} = this.state;
        const {addFolder} = this.context;
        const folder = {
            name: folderName
        }
        this.setState({ error: null })
        fetch(`${BASE_URL}folders`, {
            method: 'POST',
            body: JSON.stringify(folder),
            headers: {'content-type': 'application/json'}
        })
        .then(response => {
            if(!response.ok){throw new Error(response.status)}
            return response.json()})
        .then(responseJson => { 
            addFolder(responseJson)
            this.props.history.push('/')

        })
        .catch(error =>  this.setState({error: error}))
  
    }
    handleClickCancel = () => {
        this.props.history.push('/')
    }
    render(){
        const { error } = this.state
        return(
            <>
            <div className='AddFolder'>
                
                <form 
                    className='AddFolder__form'
                    onSubmit={this.handleSubmitFolder}>
                    <div className='AddFolder__error' role='alert'>
                        {error && <p>{error.message}</p>}
                    </div>
                    <label htmlFor='addFolder'>Add a new folder </label>
                    <input 
                        type='text' 
                        name='addFolder' 
                        placeholder='Enter Folder Name'
                        id='addFolder' 
                        onChange={e => this.handleChangeFolder(e.target.value)} required/>
                    <div className='AddFolder_buttons'>
                        <button type='submit' className='submit__FolderButton'>
                            Save
                        </button>
                        <button type='button' onClick={this.handleClickCancel} className='cancel__button'>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
            </>
        )
    }
}
export default AddFolder;