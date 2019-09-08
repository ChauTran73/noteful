import React from 'react';

export default function ValidationError(props) {
  const style ={
    color: 'red',
    marginTop: '5px',
    padding: '5px'
  }
  if(props.message) {
    return (
      <div className="error" style={style}>{props.message}</div>
    );
  }

  return <></>
}