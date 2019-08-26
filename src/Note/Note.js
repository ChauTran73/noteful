import React, {Component} from 'react'
import moment from 'moment'


class Note extends Component{
    render(){
        const modifiedDate =  moment(this.props.modified).format('MM/DD/YYYY ha z')
        return(
            <>
               
                    <h1>{this.props.name}</h1>
                    <span>Date modified on {modifiedDate}</span>
                     
                       
            </>
        )
    }
}
export default Note;