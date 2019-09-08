import React, {Component} from 'react'
import APIContext from '../APIContext'
import './AddFolder.css'
import ValidationError from '../ValidationError';
import { BASE_URL } from '../App';

class AddFolder extends Component{
    static contextType = APIContext;
    constructor(props){
        super(props);
        this.state ={
            folderName: {
                value: '',
                touched: false
            },
            error: null
        }
    }
   
    handleChangeFolder(folder){
        this.setState({
            folderName: {
                value: folder, touched: true
            }
        })
    }
    handleSubmitFolder = e =>{
        e.preventDefault();
        const {folderName} = this.state;
        const {addFolder} = this.context;
        const folder = {
            name: folderName.value
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
    handleFormValidation = () =>{
        const { folderName } = this.state;
        if(folderName.value.length < 3 || folderName.value.length > 50){
            return 'Folder name must be of length between 3 and 50 characters'
        }
        // if(folderName.name.match(/[-!$%^&*()_+|~=`{}[:;<>?,.@#\]]/g)){
        //     return 'Folder name can only includes letters and numbers'
        // }
    }
    render(){
        const { error } = this.state;
        const formError = this.handleFormValidation();
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
                        onChange={e => this.handleChangeFolder(e.target.value)}/>
                   {this.state.folderName.touched && <ValidationError message={formError}/>}
                    <div className='AddFolder_buttons'>
                        <button type='submit' 
                            className='submit__FolderButton'
                            disabled={this.handleFormValidation()}
                        >
                            Save
                        </button>
                        <button type='button' onClick={this.handleClickCancel} 
                                className='cancel__button'>
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