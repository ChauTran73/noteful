import React, {Component} from 'react';
import APIContext from '../ApiContext'
import './Folder.css'


class Folder extends Component{
    //read the context property directly from FoldersContext
    //gives a new instance property this.context
    static contextType = APIContext;
    render(){
        const { folders=[], notes=[] } = this.context;   
        
        let selected = "";
        if(this.props.selected === "true") selected = "selectedFolder"
        return(
            
            <div className={`Folder__Header ${selected}`}> 
                <h1>Folder {this.props.index+1}: <i>{this.props.name}</i></h1> 
            </div>
        )
    }
}
export default Folder;