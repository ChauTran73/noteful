import React, {Component} from 'react'
import './FoldersList.css'
import {NavLink} from 'react-router-dom'
import APIContext from '../APIContext'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrashAlt,
  faFolder
 } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../App';

function deleteFolderRequest(folderId, callback){ 
    fetch(`${BASE_URL}folders/${folderId}`,{
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
        callback(folderId)
      })
      .catch(error => {
        console.error(error)
      })
  
}

class FoldersList extends Component{
    state ={
        shown: false
    }
     handleGoBack = () =>{
         this.props.history.goBack();
     }
     toggleColor = () =>{
        this.setState({
            hidden: true
        });
     }
    static contextType = APIContext;
    render(){
        const {shown} = this.state;
        const {folders, deleteFolder} = this.context;
        const list = folders.map((folder,index)=>
        <NavLink to= {`/folder/${folder.id}`} onClick={this.toggleColor} className={shown ? 'active' : ''} key={index}>
        <li key={index} className='Folder__Name'>
            <div>
            
                <FontAwesomeIcon icon={faFolder} /> {folder.name}    
            
            </div>
            <button type='button' 
                    className='deleteIcon' 
                    onClick={() => {
                        deleteFolderRequest(folder.id,deleteFolder)
                        this.props.history.push('/')}
                    }>
                    <FontAwesomeIcon icon={faTrashAlt} />
            </button>
        </li>
        </NavLink>
    
        
    )
        return(
            <div className="Folders">
                <ul>
                   
                    {list }

                    <Link to='/add-folder'>  
                        <button className="add-folder" >
                        Add a folder  
                        </button>
                    </Link>
                   
                </ul>
                
                <button onClick={this.handleGoBack} 
                        className="goBack__button">
                        Go Back
                </button>
            </div>
        )
    }
}
export default FoldersList;
