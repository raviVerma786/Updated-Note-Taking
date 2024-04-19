import React from 'react'

export default function List(props) {
  return (
    <>
    <div className='todo_style'>
    <div className="mainContent">
        <i className='fa fa-times' aria-hidden="true" onClick={()=>{
          return props.onSelect(props.id);
        }}/>
        <div id = "note">{props.noteVal}
        <button className='updateButton' onClick={()=>{
          return props.onUpdate(props.id,props.noteVal);
        }}>Update</button>
        </div>
        </div>
        <div className="dateTime">
          
        </div>
    </div>
    </>
  );
}
