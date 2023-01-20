import React from 'react';
import { functions } from '../../functions';
import './Sidebar.css';
import Button from '../button/Button'
import {IoAddCircle} from 'react-icons/io5';

export default function Sidebar(props){

    const date =  props.currentNote.dateCreated.date;
    const {hours, minutes, ampm} =  props.currentNote.dateCreated.time;

    const notes = props.notes.map((note)=>{
        return <li 
                    key={note.id}
                    onClick={()=>{props.setCurrentNoteId(note.id)}}
                    className={`grid-1 ${note.id === props.currentNoteId ? 'selected-note' : 'unselected-note'}`}
                    >
                        <span className={`date ${note.id === props.currentNoteId ? 'light' : 'deep'}`}>
                            {date} - {hours}:{minutes} {ampm}
                        </span>
                        
                        <span className='summary-title'>
                            {functions.getTextPortion(note.body, 15)}
                        </span>
                        <span>
                        <Button
                            children="&#9587;"
                            backgroundColor='inherit'
                            fontWeight='bold'
                            color={note.id === props.currentNoteId ? 'white': '#d3d3d3'}
                            border='none'
                            margin='0 0 0 1rem'
                            className='btn-delete'
                            handleClick={(event)=>{props.deleteNote(event, note.id)}}
                        />
                        </span>
                </li>
    })

    return (
        <div className='sidebar'>
            <div className='sidebar-header'>
                <h1>Notes</h1>
                <IoAddCircle
                    onClick={props.createNewNote}
                    color='#1c2a5a'
                    size='38'/>
            </div>


            {/* <div className='note-banner'>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            </div> */}
            <ul className='notes'>
                {notes}
            </ul>
        </div>
    )
}