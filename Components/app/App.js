import React from 'react';
import Split from 'react-split';
import {functions} from '../../functions'
import './App.css';
import Sidebar from '../sidebar/Sidebar';
import Editor from '../editor/Editor';
import AlertBox from '../alert/AlertBox';
import { nanoid } from 'nanoid';
import Button from '../button/Button';

export default function App(){
    const [alert, setAlert] = React.useState(
        {
            state: false,
            type: null,
            message: null
        }
    );

    const [notes, setNotes] = React.useState([]);
    const [currentNoteId, setCurrentNoteId] = React.useState(
          (notes[0] && notes[0].id) || '' );
        
    const placeholderText = 'New note'
    // const [markdown, setMarkdown] = React.useState(placeholderText);

    function createNewNote(){
        // const currentNote = findCurrentNote();
        const newNote = {
                id: nanoid(),
                body: placeholderText,
                dateCreated: functions.getDate()
            }

        setNotes(prevNotes => [newNote, ...prevNotes]);
        setCurrentNoteId(newNote.id);
        // console.log(notes)
        // console.log(currentNoteId)
    }

    function findCurrentNote(){
        return notes.find(note => note.id === currentNoteId) || notes[0];
    }

    function updateNote (text){
        setNotes(oldNotes => oldNotes.map(oldNote => {
            return oldNote.id === currentNoteId
            ? {...oldNote, body: text}
            : oldNote
        }))
    }

    function handleChange(event){
        // setMarkdown(event.target.value);
        updateNote(event.target.value)
        // console.log(notes)
    }
    
    function closeAlertBox(){
        setAlert(prev => {
            return{ ...prev, state: false}
        });
    }


    return (
        <div className='app'>
            { alert.state &&
                <AlertBox
                alert={alert}
                handleClick={closeAlertBox}
                />
            }

            {notes.length !== 0? 
            <Split
                sizes={[25, 75]}
                gutterSize={8}
                minSize={350}
                className='flex'>

                    <Sidebar
                        notes={notes}
                        currentNote={findCurrentNote()}
                        currentNoteId={currentNoteId}
                        setCurrentNoteId={setCurrentNoteId}
                        createNewNote={createNewNote}
                    />
                    { 
                        currentNoteId && 
                        notes.length > 0 &&
                    <Editor
                        // markdown={markdown}
                        currentNote={findCurrentNote()}
                        updateNote={updateNote}
                        handleChange={handleChange}
                        // handleTitleChange={handleTitleChange}
                        // handleNoteChange={handleNoteChange}
                    />
                    }
            </Split>:

            <div className='no-notes'>
                <h1>
                    You have no notes
                </h1>
                <Button
                    children='Create one now'
                    width='fit-content'
                    fontSize='1rem'
                    backgroundColor='#1c2a5a'
                    padding='1rem 2rem'
                    handleClick={createNewNote}
               />
            </div>
}
        </div>
    )
}