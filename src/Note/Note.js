import React, {Component} from 'react'
import moment from 'moment'
import './Note.css'

class Note extends Component{
    render(){
        const modifiedDate =  moment(this.props.modified).format('MM/DD/YYYY ha z')
        return(
            <div className="Note" >
                <div className="NoteSummary__Section">
                    <h1>{this.props.name}</h1>
                    <p>Date modified on {modifiedDate}</p>
                    
                </div>     
                       
            </div>
        )
    }
}
export default Note;