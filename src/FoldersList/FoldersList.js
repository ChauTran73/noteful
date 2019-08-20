import React, {Component} from 'react';
import './FoldersList.css'
import {NavLink} from 'react-router-dom'
import APIContext from '../APIContext';

class FoldersList extends Component{
    static defaultProps = {
        folders: [],
        notes: [],
        match: {
            params: {}
        }
      };
     
    static contextType = APIContext;
    render(){
        console.log('this context in FolderList', this.context)
        const {folderId} = this.props.match.params;
        const {folders} = this.context;
        const list = folders.map((folder,index)=>
  
        <li key={index} >
           <NavLink to= {`/folder/${folder.id}`}>
           <div className='Folder__Name'> 
               {folder.name}
            </div>
            </NavLink>
        </li>
    
        
    )
        return(
            <div className="Folders">
                <ul>
                   
                    {list }
                    <button className="add-folder">Add a folder</button>
                   
                </ul>
                <button onClick={()=> {this.props.history.goBack()}}className="goBack__button">Go Back</button>
            </div>
        )
    }
}
export default FoldersList;