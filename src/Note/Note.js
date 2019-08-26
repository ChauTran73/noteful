import React, {Component} from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

class Note extends Component{
    static defaultProps={
        name: '',
        modified: ''
    }
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
Note.propTypes = {
    name: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired
}